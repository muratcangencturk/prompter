import { initFirebase, firebaseConfig } from './firebase.js';
import { onAuth, logout } from './auth.js';
import { getUserPrompts } from './prompt.js';

let themeLightButton;
let themeDarkButton;
let themeLinkElement;
let themeVersion = '';

const setTheme = (theme) => {
  if (themeLinkElement) {
    const versionSuffix = themeVersion ? `?${themeVersion}` : '';
    themeLinkElement.href = `css/theme-${theme}.css${versionSuffix}`;
  }
  localStorage.setItem('theme', theme);
};

const renderPrompts = (prompts) => {
  const list = document.getElementById('prompt-list');
  list.innerHTML = '';
  if (!prompts || prompts.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No prompts yet.';
    list.appendChild(p);
    return;
  }
  prompts.forEach((p) => {
    const item = document.createElement('div');
    item.className =
      'bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg';
    item.textContent = p.text;
    list.appendChild(item);
  });
};

const init = () => {
  themeLightButton = document.getElementById('theme-light');
  themeDarkButton = document.getElementById('theme-dark');
  themeLinkElement = document.getElementById('theme-css');
  if (themeLinkElement) {
    const href = themeLinkElement.getAttribute('href') || '';
    const parts = href.split('?');
    if (parts[1]) {
      themeVersion = parts[1];
    }
  }

  const currentTheme = localStorage.getItem('theme') || 'dark';
  setTheme(currentTheme);

  themeLightButton?.addEventListener('click', () => setTheme('light'));
  themeDarkButton?.addEventListener('click', () => setTheme('dark'));
  document.getElementById('logout')?.addEventListener('click', logout);

  onAuth(async (user) => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    document.getElementById('user-email').textContent = user.email || '';
    const prompts = await getUserPrompts(user.uid);
    renderPrompts(prompts);
    window.lucide?.createIcons();
  });
};

initFirebase(firebaseConfig);
document.addEventListener('DOMContentLoaded', init);
