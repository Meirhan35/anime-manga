// Run before painting the page to avoid flashing the wrong theme.
try {
    document.documentElement.dataset.theme = localStorage.getItem('aniverse.theme') === 'light' ? 'light' : 'dark';
} catch (_) {
    document.documentElement.dataset.theme = 'dark';
}
