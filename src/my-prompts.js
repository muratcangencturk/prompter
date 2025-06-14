import { appState, THEMES } from './state.js';

const uiText = {
  en: {
    pageTitle: 'My Prompts',
    saveChanges: 'Save',
    deletePrompt: 'Delete',
    noSaved: 'No saved prompts.',
    light: 'Light Theme',
    dark: 'Dark Theme',
    back: 'Back',
  },
  tr: {
    pageTitle: 'Kayıtlı Promptlarım',
    saveChanges: 'Kaydet',
    deletePrompt: 'Sil',
    noSaved: 'Kayıtlı prompt yok.',
    light: 'Açık Tema',
    dark: 'Koyu Tema',
    back: 'Geri',
  },
  es: {
    pageTitle: 'Mis Prompts',
    saveChanges: 'Guardar',
    deletePrompt: 'Eliminar',
    noSaved: 'No hay prompts guardados.',
    light: 'Tema Claro',
    dark: 'Tema Oscuro',
    back: 'Volver',
  },
};

let themeLightButton;
let themeDarkButton;
let themeLinkElement;
let listContainer;

const setTheme = (theme) => {
  appState.theme = theme;
  if (themeLinkElement) {
    themeLinkElement.href = `css/theme-${theme}.css`;
  }
  localStorage.setItem('theme', theme);
  updateTexts();
};

const setLanguage = (lang) => {
  appState.language = lang;
  document.documentElement.lang = lang;
  document.getElementById('page-title').textContent = uiText[lang].pageTitle;
  localStorage.setItem('language', lang);
  updateTexts();
  renderList();
};

const updateTexts = () => {
  themeLightButton.title = uiText[appState.language].light;
  themeLightButton.setAttribute('aria-label', uiText[appState.language].light);
  themeDarkButton.title = uiText[appState.language].dark;
  themeDarkButton.setAttribute('aria-label', uiText[appState.language].dark);
  const backLink = document.querySelector('a[href="index.html"]');
  if (backLink) {
    backLink.title = uiText[appState.language].back;
    backLink.setAttribute('aria-label', uiText[appState.language].back);
  }
};

const renderList = () => {
  listContainer.innerHTML = '';
  if (appState.savedPrompts.length === 0) {
    const p = document.createElement('p');
    p.textContent = uiText[appState.language].noSaved;
    listContainer.appendChild(p);
    return;
  }
  for (let i = appState.savedPrompts.length - 1; i >= 0; i--) {
    const prompt = appState.savedPrompts[i];
    const wrapper = document.createElement('div');
    wrapper.className = 'bg-white/10 p-3 rounded-lg';
    const textarea = document.createElement('textarea');
    textarea.className = 'w-full p-2 rounded-md bg-black/30';
    textarea.value = prompt;
    textarea.dataset.index = i.toString();
    const actions = document.createElement('div');
    actions.className = 'flex gap-2 mt-2';
    const saveBtn = document.createElement('button');
    saveBtn.textContent = uiText[appState.language].saveChanges;
    saveBtn.className =
      'save-change px-3 py-1 rounded bg-white/20 hover:bg-white/30';
    saveBtn.dataset.index = i.toString();
    const delBtn = document.createElement('button');
    delBtn.className =
      'delete-prompt p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    delBtn.title = uiText[appState.language].deletePrompt;
    delBtn.setAttribute('aria-label', uiText[appState.language].deletePrompt);
    delBtn.dataset.index = i.toString();
    delBtn.innerHTML =
      '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
    actions.appendChild(saveBtn);
    actions.appendChild(delBtn);
    wrapper.appendChild(textarea);
    wrapper.appendChild(actions);
    listContainer.appendChild(wrapper);
  }
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};

const setupEvents = () => {
  themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
  document
    .getElementById('lang-en')
    ?.addEventListener('click', () => setLanguage('en'));
  document
    .getElementById('lang-tr')
    ?.addEventListener('click', () => setLanguage('tr'));
  document
    .getElementById('lang-es')
    ?.addEventListener('click', () => setLanguage('es'));

  listContainer.addEventListener('click', (e) => {
    const save = e.target.closest('.save-change');
    const del = e.target.closest('.delete-prompt');
    const btn = save || del;
    if (!btn) return;
    const idx = parseInt(btn.dataset.index, 10);
    if (Number.isNaN(idx)) return;
    if (save) {
      const textarea = listContainer.querySelector(
        `textarea[data-index="${idx}"]`
      );
      if (textarea) {
        appState.savedPrompts[idx] = textarea.value;
        localStorage.setItem(
          'savedPrompts',
          JSON.stringify(appState.savedPrompts)
        );
      }
    } else if (del) {
      const wrapper = del.closest('div');
      if (wrapper) wrapper.classList.add('fade-out');
      setTimeout(() => {
        appState.savedPrompts.splice(idx, 1);
        localStorage.setItem(
          'savedPrompts',
          JSON.stringify(appState.savedPrompts)
        );
        renderList();
      }, 300);
    }
  });
};

const init = () => {
  themeLightButton = document.getElementById('theme-light');
  themeDarkButton = document.getElementById('theme-dark');
  themeLinkElement = document.getElementById('theme-css');
  listContainer = document.getElementById('saved-list');

  const lang = localStorage.getItem('language') || 'en';
  setLanguage(lang);

  const theme = localStorage.getItem('theme') || THEMES.DARK;
  setTheme(theme);

  renderList();
  setupEvents();
  window.lucide?.createIcons();
};

document.addEventListener('DOMContentLoaded', init);
