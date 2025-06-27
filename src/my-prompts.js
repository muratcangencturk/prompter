import { appState, THEMES } from './state.js';
import { onAuth } from './auth.js';
import { getUserSavedPrompts } from './prompt.js';

const LANGUAGE_PAGES = {
  en: 'index.html',
  tr: 'tr/',
  es: 'es/',
  fr: 'fr/',
  zh: 'zh/',
  hi: 'hi/',
};
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

const uiText = {
  en: {
    pageTitle: 'My Prompts',
    saveChanges: 'Save',
    deletePrompt: 'Delete',
    noSaved: 'No saved prompts.',
    light: 'Light Theme',
    dark: 'Dark Theme',
    back: 'Back',
    saveFeedback: 'Saved!',
    copyButtonTitle: 'Copy to clipboard',
    downloadButtonTitle: 'Download as .txt',
    shareTwitterTitle: 'Share on Twitter',
    copyFeedback: 'Copied!',
    langZhLabel: 'Switch to Chinese',
  },
  tr: {
    pageTitle: 'Kayıtlı Promptlarım',
    saveChanges: 'Kaydet',
    deletePrompt: 'Sil',
    noSaved: 'Kayıtlı prompt yok.',
    light: 'Açık Tema',
    dark: 'Koyu Tema',
    back: 'Geri',
    saveFeedback: 'Kaydedildi!',
    copyButtonTitle: 'Panoya kopyala',
    downloadButtonTitle: '.txt olarak indir',
    shareTwitterTitle: "Twitter'da paylaş",
    copyFeedback: 'Kopyalandı!',
    langZhLabel: 'Çince\'ye geç',
  },
  es: {
    pageTitle: 'Mis Prompts',
    saveChanges: 'Guardar',
    deletePrompt: 'Eliminar',
    noSaved: 'No hay prompts guardados.',
    light: 'Tema Claro',
    dark: 'Tema Oscuro',
    back: 'Volver',
    saveFeedback: '¡Guardado!',
    copyButtonTitle: 'Copiar al portapapeles',
    downloadButtonTitle: 'Descargar como .txt',
    shareTwitterTitle: 'Compartir en Twitter',
    copyFeedback: '¡Copiado!',
    langZhLabel: 'Cambiar a chino',
  },
  zh: {
    pageTitle: '我的提示',
    saveChanges: '保存',
    deletePrompt: '删除',
    noSaved: '没有保存的提示。',
    light: '浅色主题',
    dark: '深色主题',
    back: '返回',
    saveFeedback: '已保存!',
    copyButtonTitle: '复制到剪贴板',
    downloadButtonTitle: '下载为 .txt',
    shareTwitterTitle: '在 Twitter 上分享',
    copyFeedback: '已复制!',
    langZhLabel: '切换到中文',
  },
  hi: {
    pageTitle: 'मेरे प्रॉम्प्ट',
    saveChanges: 'सहेजें',
    deletePrompt: 'हटाएं',
    noSaved: 'कोई सहेजे गए प्रॉम्प्ट नहीं।',
    light: 'लाइट थीम',
    dark: 'डार्क थीम',
    back: 'वापस',
    saveFeedback: 'सहेजा गया!',
    copyButtonTitle: 'क्लिपबोर्ड पर कॉपी करें',
    downloadButtonTitle: '.txt के रूप में डाउनलोड करें',
    shareTwitterTitle: 'ट्विटर पर साझा करें',
    copyFeedback: 'कॉपी किया गया!',
    langZhLabel: 'चीनी पर स्विच करें',
  },
};

let themeLightButton;
let themeDarkButton;
let themeLinkElement;
let themeVersion = '';
let listContainer;
let savedPromptIds = [];
let unsubscribeSaved = null;

const setTheme = (theme) => {
  appState.theme = theme;
  if (themeLinkElement) {
    const versionSuffix = themeVersion ? `?${themeVersion}` : '';
    themeLinkElement.href = `css/theme-${theme}.css${versionSuffix}`;
  }
  localStorage.setItem('theme', theme);
  updateTexts();
};

const setLanguage = (lang) => {
  const targetPage = LANGUAGE_PAGES[lang];
  if (targetPage) {
    // Some servers redirect /index.html to / so pathname becomes "".
    // Normalize to avoid endless redirects when the target is index.html.
    let current = window.location.pathname.replace(/^\//, '');
    if (current === '') {
      current = 'index.html';
    }
    if (current !== targetPage) {
      window.location.href = targetPage;
      localStorage.setItem('language', lang);
      return;
    }
  }
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
  const backLink = document.getElementById('back-link');
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
    saveBtn.className =
      'save-change p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    saveBtn.title = uiText[appState.language].saveChanges;
    saveBtn.setAttribute('aria-label', uiText[appState.language].saveChanges);
    saveBtn.dataset.index = i.toString();
    saveBtn.innerHTML =
      '<i data-lucide="save" class="w-4 h-4" role="img" aria-label="Save icon"></i>';
    const delBtn = document.createElement('button');
    delBtn.className =
      'delete-prompt p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    delBtn.title = uiText[appState.language].deletePrompt;
    delBtn.setAttribute('aria-label', uiText[appState.language].deletePrompt);
    delBtn.dataset.index = i.toString();
    delBtn.innerHTML =
      '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';

    const copyBtn = document.createElement('button');
    copyBtn.className =
      'history-copy p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[appState.language].copyButtonTitle;
    copyBtn.setAttribute('aria-label', uiText[appState.language].copyButtonTitle);
    copyBtn.dataset.index = i.toString();
    copyBtn.innerHTML =
      '<i data-lucide="copy" class="w-3 h-3" aria-hidden="true"></i>';

    const downloadBtn = document.createElement('button');
    downloadBtn.className =
      'history-download p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    downloadBtn.title = uiText[appState.language].downloadButtonTitle;
    downloadBtn.setAttribute(
      'aria-label',
      uiText[appState.language].downloadButtonTitle
    );
    downloadBtn.dataset.index = i.toString();
    downloadBtn.innerHTML =
      '<i data-lucide="download" class="w-3 h-3" aria-hidden="true"></i>';

    const shareBtn = document.createElement('button');
    shareBtn.className =
      'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    shareBtn.title = uiText[appState.language].shareTwitterTitle;
    shareBtn.setAttribute(
      'aria-label',
      uiText[appState.language].shareTwitterTitle
    );
    shareBtn.dataset.index = i.toString();
    shareBtn.innerHTML =
      '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';

    const feedback = document.createElement('span');
    feedback.className = 'save-feedback text-green-400 text-xs ml-1 hidden';
    feedback.textContent = uiText[appState.language].saveFeedback;

    const copyFeedback = document.createElement('span');
    copyFeedback.className = 'copy-feedback text-green-400 text-xs ml-1 hidden';
    copyFeedback.textContent = uiText[appState.language].copyFeedback;

    actions.appendChild(saveBtn);
    actions.appendChild(feedback);
    actions.appendChild(copyBtn);
    actions.appendChild(copyFeedback);
    actions.appendChild(downloadBtn);
    actions.appendChild(shareBtn);
    actions.appendChild(delBtn);
    wrapper.appendChild(textarea);
    wrapper.appendChild(actions);
    listContainer.appendChild(wrapper);
  }
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};

const sharePrompt = (prompt, baseUrl) => {
  if (!prompt) return;
  const link = ' https://prompterai.space';
  const url = `${baseUrl}${encodeURIComponent(`${prompt}${link}`)}`;
  window.open(url, '_blank');
};

const initSavedPromptSync = async (uid) => {
  try {
    const docs = await getUserSavedPrompts(uid);
    savedPromptIds = docs.map((d) => d.id);
    appState.savedPrompts = docs.map((d) => d.text);
    localStorage.setItem('savedPrompts', JSON.stringify(appState.savedPrompts));
    renderList();
  } catch (err) {
    console.error('Failed to load saved prompts:', err);
  }

  const q = query(
    collection(db, `users/${uid}/savedPrompts`),
    orderBy('createdAt', 'desc')
  );
  unsubscribeSaved = onSnapshot(q, (snap) => {
    savedPromptIds = snap.docs.map((d) => d.id);
    appState.savedPrompts = snap.docs.map((d) => d.data().text);
    localStorage.setItem('savedPrompts', JSON.stringify(appState.savedPrompts));
    renderList();
  });
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
  document
    .getElementById('lang-hi')
    ?.addEventListener('click', () => setLanguage('hi'));

  const buttonPop = (el) => {
    el.classList.add('button-pop');
    setTimeout(() => el.classList.remove('button-pop'), 300);
  };

  const showFeedback = (el) => {
    if (!el) return;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 1000);
  };

  listContainer.addEventListener('click', (e) => {
    const saveBtn = e.target.closest('.save-change');
    const delBtn = e.target.closest('.delete-prompt');
    const copyBtn = e.target.closest('.history-copy');
    const downloadBtn = e.target.closest('.history-download');
    const shareBtn = e.target.closest('.history-share');
    const btn = saveBtn || delBtn || copyBtn || downloadBtn || shareBtn;
    if (!btn) return;

    const idx = parseInt(btn.dataset.index, 10);
    if (Number.isNaN(idx)) return;
    const text = appState.savedPrompts[idx];

    if (saveBtn) {
      const textarea = listContainer.querySelector(
        `textarea[data-index="${idx}"]`
      );
      if (textarea) {
        appState.savedPrompts[idx] = textarea.value;
        localStorage.setItem(
          'savedPrompts',
          JSON.stringify(appState.savedPrompts)
        );
        if (appState.currentUser && savedPromptIds[idx]) {
          updateDoc(
            doc(db, `users/${appState.currentUser.uid}/savedPrompts`, savedPromptIds[idx]),
            { text: textarea.value }
          ).catch((err) => console.error('Failed to update prompt:', err));
        }
        showFeedback(saveBtn.nextElementSibling);
        buttonPop(saveBtn);
      }
    } else if (delBtn) {
      const wrapper = delBtn.closest('div');
      if (wrapper) wrapper.classList.add('fade-out');
      buttonPop(delBtn);
      setTimeout(() => {
        appState.savedPrompts.splice(idx, 1);
        localStorage.setItem(
          'savedPrompts',
          JSON.stringify(appState.savedPrompts)
        );
        if (appState.currentUser && savedPromptIds[idx]) {
          deleteDoc(
            doc(db, `users/${appState.currentUser.uid}/savedPrompts`, savedPromptIds[idx])
          ).catch((err) => console.error('Failed to delete prompt:', err));
        }
        renderList();
      }, 300);
    } else if (copyBtn && text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showFeedback(copyBtn.nextElementSibling);
          buttonPop(copyBtn);
        })
        .catch((err) => console.error('Failed to copy text:', err));
    } else if (downloadBtn && text) {
      buttonPop(downloadBtn);
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt_${idx}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (shareBtn && text) {
      buttonPop(shareBtn);
      sharePrompt(text, 'https://twitter.com/intent/tweet?text=');
    }
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
  listContainer = document.getElementById('saved-list');

  const lang = localStorage.getItem('language') || 'en';
  setLanguage(lang);

  const theme = localStorage.getItem('theme') || THEMES.DARK;
  setTheme(theme);

  renderList();
  setupEvents();
  window.lucide?.createIcons();

  if (appState.currentUser) {
    initSavedPromptSync(appState.currentUser.uid);
  }

  onAuth((user) => {
    appState.currentUser = user;
    unsubscribeSaved?.();
    unsubscribeSaved = null;
    if (user) {
      initSavedPromptSync(user.uid);
    } else {
      savedPromptIds = [];
    }
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => {
        for (const reg of regs) {
          reg.unregister().catch(() => {});
        }
      })
      .catch(() => {});
  }
};

document.addEventListener('DOMContentLoaded', init);
