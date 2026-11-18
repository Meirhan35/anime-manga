const path = require('node:path');
process.chdir(path.resolve(__dirname, '..'));
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

class Element {
    constructor(tag='div') { this.tagName=tag; this.dataset={}; this.children=[]; this.listeners={}; this.attributes={}; this.value=''; this.textContent=''; this.hidden=false; }
    addEventListener(type, fn) { this.listeners[type]=fn; }
    setAttribute(key,value) { this.attributes[key]=value; }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children=[...nodes]; }
}
const ids = {};
for (const id of ['siteNotice','themeToggle','userName','signOut','signInLink','memberWelcome','loginForm','loginStatus','apiForm','apiResults','apiStatus','apiSearchButton','apiQuery','apiType']) ids[id]=new Element();
ids.loginForm.elements={displayName:new Element(),loginEmail:new Element()};
ids.loginForm.elements.displayName.setCustomValidity=()=>{};
ids.loginForm.reportValidity=()=>true; ids.loginForm.reset=()=>{}; ids.apiForm.reportValidity=()=>true;
const storage=new Map();
const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
const document={documentElement:new Element('html'),getElementById:id=>ids[id],createElement:tag=>new Element(tag)};
const fixture=JSON.parse(fs.readFileSync('tests/kitsu-response.json','utf8'));
let mode='success',calls=0;
const ctx={document,localStorage,window:{},URL,URLSearchParams,AbortController,TypeError,setTimeout,clearTimeout,console,
    fetch:async url=> { calls++; assert.match(url,/kitsu.io\/api\/edge\/anime\?/); assert.ok(!url.includes('nsfw')); if(mode==='network') throw new TypeError('offline'); return {ok:mode!=='rate',status:mode==='rate'?429:200,json:async()=> mode==='empty'?{data:[]}:fixture}; }};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('js/theme.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('js/final.js','utf8'),ctx);
const submit=()=>ids.apiForm.listeners.submit({preventDefault(){}});
(async()=>{
    assert.equal(document.documentElement.dataset.theme,'dark');
    ids.themeToggle.listeners.click(); assert.equal(localStorage.getItem('aniverse.theme'),'light');
    ids.loginForm.elements.displayName.value='Test Student'; ids.loginForm.elements.loginEmail.value='demo@example.com';
    ids.loginForm.listeners.submit({preventDefault(){}}); assert.equal(JSON.parse(storage.get('aniverse.user')).name,'Test Student'); assert.equal(ids.signOut.hidden,false);
    ids.signOut.listeners.click(); assert.equal(storage.has('aniverse.user'),false); assert.equal(ids.signInLink.hidden,false);
    ids.apiQuery.value='Naruto'; await submit(); assert.ok(ids.apiResults.children.length>0); assert.match(ids.apiResults.children[0].children[1].children[0].textContent,/Naruto/); assert.equal(ids.apiSearchButton.disabled,false);
    const previous=calls; await submit(); assert.equal(calls,previous,'repeated searches use cache');
    await new Promise(r=>setTimeout(r,1150)); mode='empty';ids.apiQuery.value='missing anime';await submit();assert.match(ids.apiStatus.textContent,/No anime found/);
    await new Promise(r=>setTimeout(r,1150)); mode='rate';ids.apiQuery.value='rate limit';await submit();assert.match(ids.apiStatus.textContent,/Too many requests/);assert.equal(ids.apiSearchButton.disabled,false);
    await new Promise(r=>setTimeout(r,1150)); mode='network';ids.apiQuery.value='network error';await submit();assert.match(ids.apiStatus.textContent,/Check your internet/);
    console.log('PASS: theme, sign-in, sign-out, live fixture rendering, cache, empty results, HTTP 429 and network errors.');
})().catch(e=>{console.error(e);process.exitCode=1;});
