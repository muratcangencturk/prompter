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
  appState.savedPrompts.forEach((prompt, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'bg-white/10 p-3 rounded-lg';
    const textarea = document.createElement('textarea');
    textarea.className = 'w-full p-2 rounded-md bg-black/30';
    textarea.value = prompt;
    textarea.dataset.index = idx;
    const actions = document.createElement('div');
    actions.className = 'flex gap-2 mt-2';
    const saveBtn = document.createElement('button');
    saveBtn.textContent = uiText[appState.language].saveChanges;
    saveBtn.className = 'save-change px-3 py-1 rounded bg-white/20 hover:bg-white/30';
    saveBtn.dataset.index = idx;
    const delBtn = document.createElement('button');
    delBtn.textContent = uiText[appState.language].deletePrompt;
    delBtn.className = 'delete-prompt px-3 py-1 rounded bg-red-500/80 hover:bg-red-600';
    delBtn.dataset.index = idx;
    actions.appendChild(saveBtn);
    actions.appendChild(delBtn);
    wrapper.appendChild(textarea);
    wrapper.appendChild(actions);
    listContainer.appendChild(wrapper);
  });
};

const setupEvents = () => {
  themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
  document.getElementById('lang-en')?.addEventListener('click', () => setLanguage('en'));
  document.getElementById('lang-tr')?.addEventListener('click', () => setLanguage('tr'));
  document.getElementById('lang-es')?.addEventListener('click', () => setLanguage('es'));

  listContainer.addEventListener('click', (e) => {
    const save = e.target.closest('.save-change');
    const del = e.target.closest('.delete-prompt');
    if (save) {
      const idx = Number(save.dataset.index);
      const textarea = listContainer.querySelector(`textarea[data-index="${idx}"]`);
      if (textarea) {
        appState.savedPrompts[idx] = textarea.value;
        localStorage.setItem('savedPrompts', JSON.stringify(appState.savedPrompts));
      }
    }
    if (del) {
      const idx = Number(del.dataset.index);
      appState.savedPrompts.splice(idx, 1);
      localStorage.setItem('savedPrompts', JSON.stringify(appState.savedPrompts));
      renderList();
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
};

document.addEventListener('DOMContentLoaded', init);
