# AniVerse Final defence

## Three minute demonstration

The order below is a suggested speaking allocation. Each member should review the actual code and agree on responsibilities before presenting.

### Aktilek 0 to 60 seconds

Hello. Our project is AniVerse, a website for anime and manga fans. We continued our Endterm topic and kept the same team. Our goal is to help users discover anime, browse manga and keep a watchlist. There are seven pages with the same navigation and visual style. We used HTML, CSS, Bootstrap, JavaScript and jQuery. Here I switch from dark to light mode. When I refresh the page, the selected theme stays because we save it in localStorage. Our sign-in is a browser-only classroom demonstration. It stores a display name and email, never a password. After refresh the user stays signed in. Sign out removes the saved login state.

### Alibek 60 to 120 seconds

The Anime page has two ways to find anime. The curated catalogue uses local search and genre filters. Discover uses a real public API called Kitsu. I enter Naruto and choose TV series. JavaScript builds the URL with URLSearchParams and sends a GET request with fetch. We check response.ok, parse the JSON and create cards with titles, posters, ratings and descriptions. The rating is out of 100. We show loading, empty results and error messages. The request has a timeout and repeated searches use a temporary cache. The API needs an internet connection. It returns titles, posters, ratings and descriptions.

### Meiirkhan 120 to 180 seconds

The gallery opens posters in a lightbox. We can move between images with buttons or arrow keys and close it with Escape. The Home page has six FAQ questions. When a question is clicked, jQuery slideToggle opens or closes the answer. The plus and minus indicators change too. Our watchlist supports adding, reading, editing and deleting records. We now save it in localStorage, so entries remain after refresh. The layout uses Grid, Flexbox and media queries. Thank you.

## Questions and simple answers

1. **What is an API?** An interface that lets our website request data from another service.
2. **What does fetch do?** It sends an HTTP request and returns a Promise for the response.
3. **What is JSON?** A text format for exchanging structured data, using objects and arrays.
4. **Why use await?** It waits for a Promise inside an async function without blocking the whole page.
5. **What is response.ok?** It tells us whether the HTTP status is successful, in the 200–299 range.
6. **What happens when the request fails?** The catch block shows an error; finally enables the search button again.
7. **What is localStorage?** Browser storage for strings that normally remains after refresh and reopening the browser.
8. **Why JSON.stringify and JSON.parse?** We convert objects to strings for storage, then convert strings back to objects.
9. **Is this real authentication?** No. It is the required localStorage demo. A real account system needs a server and secure authentication.
10. **Do you store passwords?** No. Only the non-sensitive demo name, email, theme and watchlist are saved.
11. **What does slideToggle do?** It smoothly shows or hides an element using a sliding animation.
12. **What is CRUD?** Create, Read, Update and Delete.
13. **Why textContent for API data?** It displays returned text without interpreting it as HTML.
14. **Grid versus Flexbox?** Grid helps arrange rows and columns. Flexbox helps align items along a main axis.
15. **What is a media query?** A CSS rule that applies styles under a condition such as screen width.
16. **Why does the watchlist remain after sign out?** It is a shared list for this browser, explained on the page. Sign-out clears the demo user state.
17. **What is HTTP 429?** Too many requests. We ask the user to wait and retry.
18. **Where is the final code?** js/theme.js restores the theme early; js/final.js contains theme switching, demo sign-in, FAQ and API; js/script.js keeps the original Endterm features.

## Объяснение по-русски

- **Тема:** меняем data-theme у HTML; CSS-переменные меняют цвета. Значение сохраняется в localStorage.
- **Вход:** проверяем имя и email; сохраняем объект через JSON.stringify. После обновления читаем JSON.parse. Выход удаляет aniverse.user.
- **FAQ:** обработчик click меняет aria-expanded, знак +/− и вызывает slideToggle.
- **API:** пользователь вводит название → формируем URL → fetch → проверяем HTTP → response.json → создаём карточки. При ошибке показываем сообщение.
- **Watchlist:** массив хранит записи; push добавляет, замена элемента редактирует, splice удаляет. После изменения сохраняем массив.
- **Галерея:** меняем src и alt у большой картинки, индекс определяет текущий постер.

## Before LMS submission

Review your own code, confirm the actual division of work, publish the final files to the existing GitHub Pages repository before the LMS deadline, and check the live API there. Each member must submit the repository and website links individually. Do not make commits after the deadline.
