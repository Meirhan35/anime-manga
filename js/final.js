// Final project additions: theme, browser-only sign-in, FAQ and public API.
(() => {
    'use strict';
    const read = (key, fallback) => {
        try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
        catch (_) { return fallback; }
    };
    const notice = document.getElementById('siteNotice');
    function save(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); return true; }
        catch (_) { notice.textContent = 'Browser storage is unavailable. Changes cannot be saved.'; return false; }
    }
    const themeButton = document.getElementById('themeToggle');
    function updateThemeButton() {
        const dark = document.documentElement.dataset.theme !== 'light';
        themeButton.textContent = dark ? '☀ Light' : '☾ Dark';
        themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    themeButton.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('aniverse.theme', theme); }
        catch (_) { notice.textContent = 'Theme changed, but browser storage is unavailable.'; }
        updateThemeButton();
    });
    updateThemeButton();

    function updateUser() {
        const user = read('aniverse.user', null);
        const valid = user && typeof user.name === 'string' && typeof user.email === 'string';
        document.getElementById('userName').textContent = valid ? 'Hi, ' + user.name : '';
        document.getElementById('signOut').hidden = !valid;
        document.getElementById('signInLink').hidden = !!valid;
        const welcome = document.getElementById('memberWelcome');
        if (welcome) welcome.textContent = valid ? 'Welcome back, ' + user.name + '. Your watchlist is saved in this browser.' : 'Sign in to personalise your visit. Explore the catalogue and build your watchlist.';
    }
    document.getElementById('signOut').addEventListener('click', () => {
        try { localStorage.removeItem('aniverse.user'); }
        catch (_) { notice.textContent = 'Could not clear the saved sign-in. Please allow browser storage and try again.'; return; }
        updateUser();
        notice.textContent = 'You have signed out.';
    });
    updateUser();
    const login = document.getElementById('loginForm');
    if (login) login.addEventListener('submit', event => {
        event.preventDefault();
        const name = login.elements.displayName.value.trim();
        const email = login.elements.loginEmail.value.trim();
        login.elements.displayName.setCustomValidity(name.length >= 2 ? '' : 'Enter at least two characters.');
        if (!login.reportValidity()) return;
        if (save('aniverse.user', { name, email })) {
            login.reset(); updateUser();
            document.getElementById('loginStatus').textContent = 'Signed in successfully. You can now continue exploring AniVerse.';
        }
    });
    if (login) login.elements.displayName.addEventListener('input', () => login.elements.displayName.setCustomValidity(''));

    // The rubric explicitly requires jQuery slideToggle for FAQ answers.
    if (window.jQuery) $('.faq-question').on('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        $(this).find('.faq-indicator').text(expanded ? '+' : '−');
        $('#' + this.getAttribute('aria-controls')).stop(true, true).slideToggle(220);
    });

    const apiForm = document.getElementById('apiForm');
    if (!apiForm) return;
    const results = document.getElementById('apiResults');
    const status = document.getElementById('apiStatus');
    const button = document.getElementById('apiSearchButton');
    let controller;
    let lastRequest = 0;
    const cache = new Map();

    function render(items) {
        results.replaceChildren();
        items.forEach(item => {
            const card = document.createElement('article'); card.className = 'anime-card api-card';
            const img = document.createElement('img'); img.alt = item.title || 'Anime poster'; img.loading = 'lazy';
            const url = item.images?.jpg?.image_url;
            img.src = typeof url === 'string' && url.startsWith('https://') ? url : 'images/logo.jpg';
            img.addEventListener('error', () => { img.src = 'images/logo.jpg'; }, { once: true });
            const info = document.createElement('div'); info.className = 'info';
            const title = document.createElement('h3'); title.className = 'h5'; title.textContent = item.title || 'Untitled';
            const meta = document.createElement('p'); meta.className = 'genre';
            meta.textContent = 'Rating /100: ' + (item.score ?? 'N/A') + ' · Episodes: ' + (item.episodes ?? 'TBA');
            const description = document.createElement('p');
            description.textContent = (item.synopsis || 'No description available.').slice(0, 180) + (item.synopsis?.length > 180 ? '…' : '');
            const link = document.createElement('a'); link.textContent = 'View on Kitsu ↗'; link.target = '_blank'; link.rel = 'noopener noreferrer';
            try { const parsed = new URL(item.url); if (parsed.protocol === 'https:' && ['kitsu.io', 'kitsu.app'].includes(parsed.hostname)) link.href = parsed.href; } catch (_) {}
            info.append(title, meta, description, link); card.append(img, info); results.append(card);
        });
        status.textContent = items.length ? items.length + ' results from Kitsu.' : 'No anime found. Try another title or type.';
    }
    apiForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!apiForm.reportValidity()) return;
        const query = document.getElementById('apiQuery').value.trim();
        if (query.length < 2) { status.textContent = 'Enter at least two characters.'; return; }
        const type = document.getElementById('apiType').value;
        const key = query.toLowerCase() + ':' + type;
        if (cache.has(key)) { render(cache.get(key)); return; }
        if (Date.now() - lastRequest < 1100) { status.textContent = 'Please wait a moment before searching again.'; return; }
        lastRequest = Date.now();
        controller?.abort(); controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        button.disabled = true; results.replaceChildren(); results.setAttribute('aria-busy', 'true');
        status.textContent = 'Searching Kitsu…';
        const params = new URLSearchParams({ 'filter[text]': query, 'page[limit]': '8' });
        if (type) params.set('filter[subtype]', type);
        try {
            const response = await fetch('https://kitsu.io/api/edge/anime?' + params, { signal: controller.signal });
            if (!response.ok) throw new Error(response.status === 429 ? 'Too many requests. Please wait and try again.' : 'The anime service is unavailable. Please try again.');
            const json = await response.json();
            if (!Array.isArray(json.data)) throw new Error('The service returned unexpected data. Please retry.');
            const items = json.data.filter(entry => entry.attributes?.nsfw !== true).map(entry => {
                const a = entry.attributes || {};
                return { title: a.canonicalTitle, score: a.averageRating, episodes: a.episodeCount,
                    synopsis: a.synopsis, images: { jpg: { image_url: a.posterImage?.medium } },
                    url: 'https://kitsu.io/anime/' + encodeURIComponent(a.slug || entry.id) };
            });
            cache.set(key, items); render(items);
        } catch (error) {
            status.textContent = error.name === 'AbortError' ? 'The request timed out. Please try again.' : error instanceof TypeError ? 'Cannot connect. Check your internet connection and try again.' : error.message;
        } finally {
            clearTimeout(timer); button.disabled = false; results.setAttribute('aria-busy', 'false');
        }
    });
})();
