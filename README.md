# AniVerse — Anime & Manga Fan Website

**Topic:** Anime / Manga fan website

**Group members:**
- Zhumagaliyev Aktilek
- Babassov Alibek
- Meiirkhan Abilda

**Website:** https://meirhan35.github.io/anime-manga/

## Description

AniVerse is a responsive website for anime and manga fans. Users can explore anime, read about manga, view posters and manage a watchlist. The website has a purple colour scheme with light and dark themes.

The final project includes saved theme preferences, sign-in and sign-out, an animated FAQ and anime search using the Kitsu API.

## Pages

1. **Home** (`index.html`) — welcome section, popular anime and FAQ.
2. **Anime** (`anime.html`) — live API search, curated anime cards and genre filters.
3. **Manga** (`manga.html`) — manga descriptions, authors and genres.
4. **Top** (`top.html`) — anime ranking and Watchlist table.
5. **Gallery** (`gallery.html`) — posters with captions and a lightbox.
6. **Register** (`register.html`) — registration form validation.
7. **Sign in** (`signin.html`) — demo sign-in with a personalised interface.

## Features implemented

### HTML and CSS

- Semantic HTML5 elements: `header`, `nav`, `main`, `section` and `footer`.
- Shared navigation and consistent styling across all pages.
- External CSS files, Flexbox and Grid layouts.
- Bootstrap grid and form styling.
- Responsive layouts for desktop, tablet and mobile.
- Hover effects, visible keyboard focus and a skip-to-content link.

### Light and Dark Theme

- A theme button switches between light and dark colours.
- The selected theme is saved in `localStorage`.
- The theme remains active after refreshing or moving between pages.

### Sign-in and Sign-out

- The sign-in form validates a display name and email.
- Demo user details are saved in `localStorage`.
- The header displays the saved name after refresh.
- Sign-out clears the saved login state.
- This is a browser-only demonstration; no server account or password is stored.

### Registration Form Validation

- Required checks for name, email, password and password confirmation.
- Email format validation and matching password checks.
- Password strength indicator and feedback while typing.
- Success and error messages.

### Anime Search and API

- The Discover section uses `fetch()` to request JSON data from the Kitsu API.
- Users can search by title and select an anime format.
- Results display posters, titles, descriptions, episode counts and ratings out of 100.
- Loading, empty-result and error messages provide feedback.
- Repeated searches use a temporary cache.
- The curated catalogue also supports local search and genre filtering.

### Watchlist CRUD

- **Create:** add an anime title, genre and episode count.
- **Read:** display saved entries in a table.
- **Update:** edit an existing entry.
- **Delete:** remove an entry after confirmation.
- Watchlist entries are saved in `localStorage` and remain after refresh.

### FAQ

- Six questions about the website and anime.
- Answers open and close with jQuery `.slideToggle()`.
- Plus and minus indicators show the expanded state.

### Gallery Lightbox

- Clicking a poster opens a larger image.
- Buttons and arrow keys move between posters.
- Escape closes the lightbox.
- jQuery animations display images and captions.

## Technologies used

- HTML5
- CSS3
- Bootstrap 5.3.3
- JavaScript
- jQuery 3.7.1
- Kitsu API
- localStorage

## Individual contribution

| Member | Contribution |
|---|---|
| Zhumagaliyev Aktilek | Home and Top pages, shared header and footer, registration validation, Watchlist CRUD and README. |
| Babassov Alibek | Anime and Manga pages, catalogue search and genre filtering. |
| Meiirkhan Abilda | Gallery page, responsive media queries, lightbox navigation and animations. |

## Project structure

```text
index.html
anime.html
manga.html
top.html
gallery.html
register.html
signin.html
css/
  style.css
  final.css
js/
  script.js
  theme.js
  final.js
images/
vendor/
docs/
tests/
README.md
```
