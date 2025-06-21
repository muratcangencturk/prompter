import { initFirebase, firebaseConfig } from './firebase.js';
import { onAuth, logout } from './auth.js';
import { getUserPrompts, likePrompt } from './prompt.js';
import { appState, THEMES } from './state.js';

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

const updateCount = (id, count) => {
  const el = document.getElementById(id);
  if (el) el.textContent = count.toString();
};

const renderSavedPrompts = (prompts) => {
  const list = document.getElementById('saved-list');
  list.innerHTML = '';
  updateCount('saved-count', prompts.length);
  if (!prompts || prompts.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No prompts yet.';
    list.appendChild(p);
    return;
  }
  prompts.forEach((text) => {
    const item = document.createElement('div');
    item.className =
      'bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg';
    item.textContent = text;
    list.appendChild(item);
  });
};

const renderSharedPrompts = (prompts) => {
  const list = document.getElementById('shared-list');
  list.innerHTML = '';
  updateCount('shared-count', prompts.length);
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

    const text = document.createElement('p');
    text.textContent = p.text;

    const likeRow = document.createElement('div');
    likeRow.className = 'flex items-center gap-2 mt-2';
    const likeBtn = document.createElement('button');
    likeBtn.className =
      'like-btn p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    likeBtn.innerHTML = '<i data-lucide="heart" class="w-4 h-4" aria-hidden="true"></i>';

    const likeCount = document.createElement('span');
    likeCount.textContent = (p.likes || 0).toString();

    likeBtn.addEventListener('click', async () => {
      await likePrompt(p.id);
      likeCount.textContent = (parseInt(likeCount.textContent, 10) + 1).toString();
    });

    likeRow.appendChild(likeBtn);
    likeRow.appendChild(likeCount);

    item.appendChild(text);
    item.appendChild(likeRow);
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

  const savedLang = localStorage.getItem('language') || 'en';
  document.documentElement.lang = savedLang;

  const currentTheme = localStorage.getItem('theme') || THEMES.DARK;
  setTheme(currentTheme);

  themeLightButton?.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton?.addEventListener('click', () => setTheme(THEMES.DARK));
  document.getElementById('logout')?.addEventListener('click', logout);

  onAuth(async (user) => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    document.getElementById('user-email').textContent = user.email || '';
      const prompts = await getUserPrompts(user.uid);
      renderSharedPrompts(prompts);
      renderSavedPrompts(appState.savedPrompts || []);
      window.lucide?.createIcons();
  });
};

initFirebase(firebaseConfig);
document.addEventListener('DOMContentLoaded', init);
