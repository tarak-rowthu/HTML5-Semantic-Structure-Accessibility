/* Theme toggle script */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) {
    console.error('Theme toggle button not found');
    return;
  }

  const setIcon = (theme) => {
    // Sun icon for dark mode, moon for light mode
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setIcon(theme);
  };

  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
});
