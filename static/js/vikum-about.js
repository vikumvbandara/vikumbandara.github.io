(() => {
  const button = document.querySelector('.theme-toggle');
  if (!button) return;
  const root = document.documentElement;
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : systemPreference.matches;
  const syncButton = () => {
    const dark = isDark();
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  };
  button.hidden = false;
  syncButton();
  button.addEventListener('click', () => {
    const theme = isDark() ? 'light' : 'dark';
    root.dataset.theme = theme;
    try { localStorage.setItem('vikum-color-theme', theme); } catch (error) { /* Optional persistence. */ }
    syncButton();
  });
  systemPreference.addEventListener('change', syncButton);
})();
