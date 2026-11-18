# AniVerse — Anime & Manga Fan Website

**Topic:** Anime / Manga fan website

**Group members:**
- Zhumagaliyev Aktilek
- Babassov Alibek
- Meiirkhan Abilda

**Repository:** https://github.com/Meirhan35/anime-manga

**Original Endterm repository:** https://github.com/Tilya1/Midterm-WEB

**GitHub Pages:** enable main/root in repository Settings → Pages to publish at https://meirhan35.github.io/anime-manga/

## Description

AniVerse is a multi-page responsive website for anime and manga fans. Users can see popular anime, read about manga, check the top rating and look at the gallery. The website has a black and purple theme.

For the endterm we added JavaScript and jQuery: a registration form with validation, search and filter on the anime catalog, a watchlist table with add / edit / delete, and a lightbox for the gallery.

## Pages

1. **Home** (`index.html`) — welcome block and popular anime cards
2. **Anime** (`anime.html`) — catalog of 11 anime with search and genre filter
3. **Manga** (`manga.html`) — manga list with authors and genres
4. **Top** (`top.html`) — rating table of the best anime and the Watchlist table (CRUD)
5. **Gallery** (`gallery.html`) — posters with caption on hover and a lightbox
6. **Register** (`register.html`) — registration form with validation

## Features implemented

### Midterm (HTML, CSS, Bootstrap)

- Navigation bar on all pages (`<header>` with logo and menu, made with **Flexbox**)
- Semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Headings, paragraphs, lists (`ul`, `ol`), links and images
- **Table** — top anime rating (`top.html`)
- **External CSS** — `css/style.css`, class selectors
- **Box model** — margin, padding, border
- **Flexbox** — header, navigation, manga items
- **Grid** — anime catalog and gallery
- **Positioning** — `position: relative` + `absolute` for gallery captions
- `:hover` effects on links, buttons, cards and gallery
- **Media queries** for tablet (992px) and mobile (576px)
- **Bootstrap** grid (`container`, `row`, `col-12 col-md-6 col-lg-4`)

### Endterm (JavaScript and jQuery, `js/script.js`)

**1. Form validation** (`register.html`)
- Required checks for name, email, password and confirm password
- Email is checked with a RegEx: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Password strength bar: **Weak** (red), **Medium** (yellow), **Strong** (green)
- Confirm password must be the same as the password
- Real-time feedback while typing: Bootstrap `is-valid` / `is-invalid` (green check or red text)
- On submit with errors the form is not sent and a red Bootstrap alert appears; with correct data a green alert appears

**2. Search and filter** (`anime.html`)
- Search bar filters anime cards while typing (`.on("keyup")`)
- Buttons **All / Action / Adventure / Sports** filter by genre
- Search and genre buttons work together, search is case-insensitive
- If nothing is found, the text "No anime found." is shown

**3. Watchlist table — CRUD** (`top.html`)
- **Create:** fill the form and press Add
- **Read:** the table is built from a JavaScript array
- **Update:** press Edit, the data goes to the form, change it and press Save
- **Delete:** press Delete and confirm in the `confirm()` window

**4. Gallery lightbox** (`gallery.html`)
- Pictures appear one by one with `.fadeIn()`
- Click on a picture opens it big in a dark lightbox
- Arrows ❮ ❯ go to the previous / next picture with `.fadeOut()` and `.fadeIn()`
- The caption appears with `.animate()`
- Close with × or by clicking on the dark background

## Technologies used

- HTML5
- CSS3 (external file `css/style.css`)
- Bootstrap 5.3
- JavaScript
- jQuery 3.7.1
- GitHub Pages

## Individual contribution

| Member | Midterm | Endterm |
|---|---|---|
| Zhumagaliyev Aktilek | Home page, Top page (table), header and footer, GitHub Pages | Registration form validation, Watchlist CRUD table, README |
| Babassov Alibek | Anime page (Grid catalog), Manga page (lists) | Search bar and genre filter on the Anime page |
| Meiirkhan Abilda | Gallery page (positioning, hover captions), media queries | Gallery lightbox with arrows and fade effects |

## Project structure

```
index.html
anime.html
manga.html
top.html
gallery.html
register.html
css/style.css
js/script.js
images/
README.md
```



## Final project additions

- Seven HTML pages, shared navigation, responsive desktop/tablet/mobile layouts.
- Light/Dark theme saved in localStorage and applied before page paint.
- `signin.html`: validated browser-only name/email sign-in, persistent interface and sign-out. No passwords or server accounts.
- Six FAQ questions on Home, jQuery `.slideToggle()`, plus/minus indicators and expanded state.
- Real Kitsu API search on Anime, optional format filter, JSON parsing, dynamic cards, loading, empty, timeout, HTTP 429 and network error states. Results are cached in memory for the current page visit. Ratings are out of 100. Jikan was unavailable during local development, so Kitsu is used.
- Original Endterm search, registration validation, gallery and Watchlist are retained. Watchlist now survives refresh and uses escaped text when rendering saved entries.
- Keyboard support in the gallery and skip links.
- Local Bootstrap 5.3.3 and jQuery 3.7.1 files in `vendor/`.

### Run locally in VS Code

Open this folder, choose Terminal → New Terminal and run:

```sh
python3 -m http.server 5500 --bind 127.0.0.1
```

Open http://127.0.0.1:5500/ . Stop with Ctrl+C. You can also use the Run AniVerse task in Terminal → Run Task. No npm installation, database, API key or backend is required. Live API search and remote API posters require internet access.

### Storage

- `aniverse.theme`: `light` or `dark`.
- `aniverse.user`: JSON object with demo name and email.
- `aniverse.watchlist`: shared browser Watchlist array. Sign-out does not erase it.

Localhost and GitHub Pages have separate browser storage. Clearing browser data resets saved settings. Static ranking values are editorial picks, not live ratings.

### Final submission

Use the same topic and team as the Endterm. Publish this folder's contents to the existing repository root and enable GitHub Pages from main/root. Check all navigation, sign-in, theme, FAQ and API on the deployed site. Submit links individually in LMS before its deadline. Do not commit after the deadline. This repository contains the final source. GitHub Pages must be enabled separately in Settings → Pages.

The original contribution table above describes Midterm/Endterm work. The final additions were prepared with AI assistance for group review. Suggested defence roles and simple technical questions are in `docs/DEFENSE_RU_EN.md`; the team should confirm its actual final responsibilities before submission.

### AI acknowledgement

ChatGPT assisted with final code, documentation and testing. Team members must review, understand and explain the submitted work. This acknowledgement is also displayed in every page footer and included in the report.

### Credits

Kitsu API: https://kitsu.docs.apiary.io/ . Bootstrap: https://getbootstrap.com/ . jQuery: https://jquery.com/ . Original fan artwork is retained from the Endterm repository and belongs to the respective rights holders. AniVerse does not host episodes or manga chapters.
