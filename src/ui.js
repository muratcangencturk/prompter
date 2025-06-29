import { appState, THEMES } from './state.js';
import { categories, ICON_FALLBACKS, generatePrompt } from './prompts.js';
import { BASE_URL, AD_LINK } from './config.js';

const LANGUAGE_PAGES = {
  en: 'index.html',
  tr: 'tr/',
  es: 'es/',
  fr: 'fr/',
  zh: 'zh/',
  hi: 'hi/',
};

const uiText = {};

const loadUiText = async (lang) => {
  if (uiText[lang]) return uiText[lang];
  try {
    const res = await fetch(`/translations/ui/${lang}.json`);
    if (!res.ok) throw new Error('Failed to load');
    const data = await res.json();
    uiText[lang] = data;
    return data;
  } catch (err) {
    console.error('Failed to load UI translations for', lang, err);
    if (lang !== 'en') return loadUiText('en');
    return {};
  }
};

let categoryButtonsContainer;
let generateButton;
let promptDisplayArea;
let generatedPromptText;
let copyButton;
let shareButton;
let saveButton;
let shareTwitterButton;
let copySuccessMessage;
let saveSuccessMessage;
let saveErrorMessage;
let shareMessage;
let langEnButton;
let langTrButton;
let langEsButton;
let langFrButton;
let langZhButton;
let langHiButton;
let langToggleButton;
let langMenu;
let currentLangLabel;
let themeLightButton;
let themeDarkButton;
let themeLinkElement;
let themeVersion = '';
let appLogo;
let historyPanel;
let historyList;
let clearHistoryButton;

const setTheme = (theme) => {
  appState.theme = theme;
  if (themeLinkElement) {
    const versionSuffix = themeVersion ? `?${themeVersion}` : '';
    themeLinkElement.href = `css/theme-${theme}.css${versionSuffix}`;
  }
  if (theme === THEMES.LIGHT) {
    themeLightButton.classList.add(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    themeLightButton.classList.remove(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    themeDarkButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    themeDarkButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
  } else {
    themeDarkButton.classList.add(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    themeDarkButton.classList.remove(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    themeLightButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    themeLightButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
  }
  localStorage.setItem('theme', theme);
  updateButtonTitles();
};

// When loading the page we want to respect the stored language preference. The
// optional `fromSaved` flag signals that the value came from `localStorage` on
// startup. In this mode we still redirect if the stored language doesn't match
// the current page, as long as a target path exists. Any explicit override via
// the `lang` query parameter (or by following a link from another language
// version detected through `document.referrer` when `fromSaved` is `false`)
// continues to take precedence.
const setLanguage = async (lang, fromSaved = false) => {
  await loadUiText(lang);
  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get('lang');
  const refLangEntry = Object.entries(LANGUAGE_PAGES).find(([, page]) =>
    document.referrer.includes(page)
  );
  let overrideLang = null;
  if (paramLang && LANGUAGE_PAGES[paramLang]) {
    overrideLang = paramLang;
  } else if (!fromSaved && refLangEntry) {
    overrideLang = refLangEntry[0];
  }
  let current = window.location.pathname.replace(/^\//, '');
  if (current === '') current = 'index.html';
  if (overrideLang) {
    lang = overrideLang;
  }
  const targetPage = LANGUAGE_PAGES[lang];
  if (targetPage) {
    // Some servers redirect /index.html to / which results in
    // window.location.pathname being "". Normalize to avoid loops.
    current = window.location.pathname.replace(/^\//, '');
    if (current === '') {
      current = 'index.html';
    }
    const shouldRedirect = current !== targetPage;
    if (shouldRedirect) {
      window.location.href = targetPage;
      localStorage.setItem('language', lang);
      return;
    }
  }
  appState.language = lang;
  document.documentElement.lang = lang;
  document.getElementById('app-title').textContent = uiText[lang].appTitle;
  document.getElementById('app-subtitle').textContent =
    uiText[lang].appSubtitle;
  document.getElementById('choose-style-title').textContent =
    uiText[lang].chooseStyleTitle;
  document.getElementById('generate-button-text').textContent =
    uiText[lang].generateButtonText;
  generateButton.setAttribute('aria-label', uiText[lang].generateButtonText);
  const promptTitleEl = document.getElementById('your-prompt-title');
  promptTitleEl.textContent = `${uiText[lang].yourPromptTitle} \u2193`;
  if (appLogo) {
    appLogo.alt = uiText[lang].appLogoAlt;
  }
  copyButton.title = uiText[lang].copyButtonTitle;
  copyButton.setAttribute('aria-label', uiText[lang].copyButtonTitle);
  if (shareButton) {
    shareButton.title = uiText[lang].shareButtonTitle;
    shareButton.setAttribute('aria-label', uiText[lang].shareButtonTitle);
  }
  if (saveButton) {
    saveButton.title = uiText[lang].saveButtonTitle;
    saveButton.setAttribute('aria-label', uiText[lang].saveButtonTitle);
  }
  if (shareTwitterButton) {
    shareTwitterButton.title = uiText[lang].shareTwitterTitle;
    shareTwitterButton.setAttribute(
      'aria-label',
      uiText[lang].shareTwitterTitle
    );
  }
  copySuccessMessage.textContent = uiText[lang].copySuccessMessage;
  saveSuccessMessage.textContent = uiText[lang].saveSuccessMessage;
  if (saveErrorMessage) {
    saveErrorMessage.textContent = uiText[lang].saveErrorMessage;
  }
  if (shareMessage) {
    shareMessage.textContent = uiText[lang].shareMessage;
  }
  document.getElementById('history-title').textContent =
    uiText[lang].historyTitle;
  clearHistoryButton.title = uiText[lang].clearHistoryTitle;
  clearHistoryButton.setAttribute('aria-label', uiText[lang].clearHistoryTitle);
  document.getElementById('app-stats').textContent = uiText[lang].appStats;
  document.getElementById('footer-prompter').textContent =
    uiText[lang].footerPrompter;
  const loginLink = document.getElementById('login-link');
  if (loginLink) {
    loginLink.textContent = uiText[lang].loginText;
  }
  langEnButton.title = uiText[lang].langEnLabel;
  langEnButton.setAttribute('aria-label', uiText[lang].langEnLabel);
  langTrButton.title = uiText[lang].langTrLabel;
  langTrButton.setAttribute('aria-label', uiText[lang].langTrLabel);
  if (langEsButton) {
    langEsButton.title = uiText[lang].langEsLabel;
    langEsButton.setAttribute('aria-label', uiText[lang].langEsLabel);
  }
  if (langFrButton) {
    langFrButton.title = uiText[lang].langFrLabel;
    langFrButton.setAttribute('aria-label', uiText[lang].langFrLabel);
  }
  if (langZhButton) {
    langZhButton.title = uiText[lang].langZhLabel;
    langZhButton.setAttribute('aria-label', uiText[lang].langZhLabel);
  }
  if (currentLangLabel) {
    const arrow = currentLangLabel.querySelector('svg');
    currentLangLabel.textContent = lang.toUpperCase();
    if (arrow) {
      currentLangLabel.appendChild(arrow);
    }
  }

  categories.forEach((category) => {
    const button = document.getElementById(`category-${category.id}`);
    if (button) {
      const labelSpan = button.querySelector('.category-label');
      if (labelSpan) {
        labelSpan.textContent = category.name[lang];
      }
      button.setAttribute('aria-label', `${category.name[lang]} category`);
    }
  });

  if (lang === 'en') {
    langEnButton.classList.add(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langEnButton.classList.remove(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    langTrButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langTrButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'tr') {
    langTrButton.classList.add(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langTrButton.classList.remove(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    langEnButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langEnButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'es') {
    if (langEsButton) {
      langEsButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    langEnButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langEnButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    langTrButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langTrButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'fr') {
    if (langFrButton) {
      langFrButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langFrButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    langEnButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langEnButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    langTrButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langTrButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'zh') {
    if (langZhButton) {
      langZhButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    langEnButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langEnButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    langTrButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langTrButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else {
    if (langHiButton) {
      langHiButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langHiButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    langEnButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langEnButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    langTrButton.classList.remove(
      'active',
      'bg-white/30',
      'text-white',
      'shadow-md'
    );
    langTrButton.classList.add(
      'bg-transparent',
      'text-blue-200',
      'hover:bg-white/10'
    );
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  }
  if (!fromSaved) {
    localStorage.setItem('language', lang);
  }
  updateButtonTitles();
  renderHistory();
};

const updateButtonTitles = () => {
  themeLightButton.title = uiText[appState.language].themeLightTitle;
  themeLightButton.setAttribute(
    'aria-label',
    uiText[appState.language].themeLightTitle
  );
  themeDarkButton.title = uiText[appState.language].themeDarkTitle;
  themeDarkButton.setAttribute(
    'aria-label',
    uiText[appState.language].themeDarkTitle
  );
  if (saveButton) {
    saveButton.title = uiText[appState.language].saveButtonTitle;
    saveButton.setAttribute(
      'aria-label',
      uiText[appState.language].saveButtonTitle
    );
  }
  if (shareTwitterButton) {
    shareTwitterButton.title = uiText[appState.language].shareTwitterTitle;
    shareTwitterButton.setAttribute(
      'aria-label',
      uiText[appState.language].shareTwitterTitle
    );
  }
};

const renderHistory = () => {
  if (!historyPanel || !historyList) return;
  historyList.innerHTML = '';
  const reversed = appState.history.slice().reverse();
  reversed.forEach((prompt, revIdx) => {
    const idx = appState.history.length - 1 - revIdx;
    const li = document.createElement('li');
    li.className = 'flex justify-between items-start gap-2';
    const textarea = document.createElement('textarea');
    textarea.className =
      'history-edit flex-1 whitespace-pre-wrap font-mono bg-transparent p-1 rounded-md';
    textarea.value = prompt;
    textarea.setAttribute('data-index', idx);
    const actions = document.createElement('div');
    actions.className = 'flex gap-2';

    const copyBtn = document.createElement('button');
    copyBtn.className =
      'history-copy p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[appState.language].copyButtonTitle;
    copyBtn.setAttribute(
      'aria-label',
      uiText[appState.language].copyButtonTitle
    );
    copyBtn.setAttribute('data-index', idx);
    copyBtn.innerHTML =
      '<i data-lucide="copy" class="w-3 h-3" aria-hidden="true"></i>';
    actions.appendChild(copyBtn);

    const copyFeedback = document.createElement('span');
    copyFeedback.className =
      'history-copy-feedback text-green-400 text-xs ml-1 hidden';
    copyFeedback.textContent = uiText[appState.language].copySuccessMessage;
    actions.appendChild(copyFeedback);

    if (saveButton) {
      const saveBtn = document.createElement('button');
      saveBtn.className =
        'history-save p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      saveBtn.title = uiText[appState.language].saveButtonTitle;
      saveBtn.setAttribute(
        'aria-label',
        uiText[appState.language].saveButtonTitle
      );
      saveBtn.setAttribute('data-index', idx);
      saveBtn.innerHTML =
        '<i data-lucide="save" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(saveBtn);
    }

    if (shareTwitterButton) {
      const shareBtn = document.createElement('button');
      shareBtn.className =
        'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      shareBtn.title = uiText[appState.language].shareTwitterTitle;
      shareBtn.setAttribute(
        'aria-label',
        uiText[appState.language].shareTwitterTitle
      );
      shareBtn.setAttribute('data-index', idx);
      shareBtn.innerHTML =
        '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(shareBtn);
    }

    if (shareButton) {
      const siteShareBtn = document.createElement('button');
      siteShareBtn.className =
        'history-site-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      siteShareBtn.title = uiText[appState.language].shareButtonTitle;
      siteShareBtn.setAttribute(
        'aria-label',
        uiText[appState.language].shareButtonTitle
      );
      siteShareBtn.setAttribute('data-index', idx);
      siteShareBtn.innerHTML =
        '<i data-lucide="share-2" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(siteShareBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className =
      'history-delete p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    deleteBtn.title = uiText[appState.language].deleteButtonTitle;
    deleteBtn.setAttribute(
      'aria-label',
      uiText[appState.language].deleteButtonTitle
    );
    deleteBtn.setAttribute('data-index', idx);
    deleteBtn.innerHTML =
      '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
    actions.appendChild(deleteBtn);

    const feedback = document.createElement('span');
    feedback.className = 'save-feedback text-green-400 text-xs ml-1 hidden';
    feedback.textContent = uiText[appState.language].saveFeedback;
    actions.appendChild(feedback);

    li.appendChild(textarea);
    li.appendChild(actions);
    historyList.appendChild(li);
  });
  historyPanel.classList.toggle('hidden', appState.history.length === 0);
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};

const handleGenerate = async () => {
  generatedPromptText.innerHTML =
    '<div class="flex justify-center items-center h-20"><i data-lucide="loader-2" class="w-6 h-6 animate-spin" aria-hidden="true"></i></div>';
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  promptDisplayArea.classList.remove('hidden');
  promptDisplayArea.classList.add('animate-fadeIn');
  try {
    const { prompt } = await generatePrompt();
    generatedPromptText.textContent = prompt;
    appState.history.push(prompt);
    if (appState.history.length > appState.HISTORY_SIZE) {
      appState.history.shift();
    }
    localStorage.setItem('promptHistory', JSON.stringify(appState.history));
    renderHistory();
  } catch (err) {
    console.error(err);
    if (err && err.message === 'offline') {
      generatedPromptText.textContent =
        uiText[appState.language].internetRequired;
    } else {
      generatedPromptText.textContent =
        uiText[appState.language].errorGenerating;
    }
  } finally {
    appState.isGenerating = false;
    generateButton.disabled = false;
  }
};

const sharePrompt = (prompt, baseUrl) => {
  if (!prompt) return;
  const link = ` ${BASE_URL}`;
  const url = `${baseUrl}${encodeURIComponent(`${prompt}${link}`)}`;
  window.open(url, '_blank');
};

const setupEventListeners = () => {
  categories.forEach((category) => {
    const button = document.getElementById(`category-${category.id}`);
    if (button) {
      button.addEventListener('click', () => {
        appState.selectedCategory = category.id;
        document
          .querySelectorAll('.category-button')
          .forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
        if (category.id === 'random' && AD_LINK) {
          window.open(AD_LINK, '_blank');
        }
      });
    }
  });

  generateButton.addEventListener('click', () => {
    generateButton.disabled = true;
    handleGenerate();
  });

  generatedPromptText.addEventListener('input', () => {
    const val =
      'value' in generatedPromptText
        ? generatedPromptText.value
        : generatedPromptText.textContent;
    appState.generatedPrompt = val;
  });

  copyButton.addEventListener('click', () => {
    if (!appState.generatedPrompt) return;
    navigator.clipboard
      .writeText(appState.generatedPrompt)
      .then(() => {
        appState.copySuccess = true;
        copySuccessMessage.classList.remove('hidden');
        copyButton.classList.add('button-pop');
        setTimeout(() => {
          copySuccessMessage.classList.add('hidden');
          appState.copySuccess = false;
          copyButton.classList.remove('button-pop');
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        alert(uiText[appState.language].copyFailed);
      });
  });

  if (shareButton) {
    const updateShareIcon = () => {
      const svg = shareButton.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          shareButton.classList.contains('active') ? 'currentColor' : 'none'
        );
    };
    updateShareIcon();
    shareButton.addEventListener('click', async () => {
      if (!appState.generatedPrompt) return;
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequiredShare);
        return;
      }
      shareButton.classList.add('button-pop');
      shareButton.classList.toggle('active');
      updateShareIcon();
      shareMessage?.classList.remove('hidden');
      setTimeout(() => {
        shareMessage?.classList.add('hidden');
        shareButton.classList.remove('button-pop');
      }, 2000);
      try {
        const { savePrompt } = await import('./prompt.js');
        await savePrompt(
          appState.generatedPrompt,
          appState.currentUser.uid,
          appState.selectedCategory,
          appState.currentUser.displayName || '',
          appState.currentUser.email || ''
        );
      } catch (err) {
        console.error(err);
        alert(uiText[appState.language].shareFailed);
      }
    });
  }

  if (saveButton) {
    const updateSaveIcon = () => {
      const svg = saveButton.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          saveButton.classList.contains('active') ? 'currentColor' : 'none'
        );
    };
    updateSaveIcon();
    saveButton.addEventListener('click', async () => {
      if (!appState.generatedPrompt) return;
      saveButton.classList.toggle('active');
      updateSaveIcon();
      appState.savedPrompts.push(appState.generatedPrompt);
      localStorage.setItem(
        'savedPrompts',
        JSON.stringify(appState.savedPrompts)
      );
      if (appState.currentUser) {
        try {
          const { saveUserPrompt } = await import('./prompt.js');
          await saveUserPrompt(
            appState.generatedPrompt,
            appState.currentUser.uid
          );
        } catch (err) {
          console.error('Failed to sync prompt:', err);
        }
      }
      saveSuccessMessage.classList.remove('hidden');
      setTimeout(() => {
        saveSuccessMessage.classList.add('hidden');
      }, 2000);
      saveButton.classList.add('button-pop');
      setTimeout(() => {
        saveButton.classList.remove('button-pop');
      }, 300);
      saveButton.disabled = true;
      setTimeout(() => {
        saveButton.disabled = false;
      }, 500);
    });
  }

  if (shareTwitterButton) {
    const updateShareTwitterIcon = () => {
      const svg = shareTwitterButton.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          shareTwitterButton.classList.contains('active')
            ? 'currentColor'
            : 'none'
        );
    };
    updateShareTwitterIcon();
    shareTwitterButton.addEventListener('click', () => {
      shareTwitterButton.classList.add('button-pop');
      shareTwitterButton.classList.toggle('active');
      updateShareTwitterIcon();
      if (shareMessage) {
        shareMessage.classList.remove('hidden');
        setTimeout(() => {
          shareMessage.classList.add('hidden');
        }, 2000);
      }
      setTimeout(() => {
        shareTwitterButton.classList.remove('button-pop');
      }, 300);
      sharePrompt(
        appState.generatedPrompt,
        'https://twitter.com/intent/tweet?text='
      );
    });
  }

  clearHistoryButton.addEventListener('click', () => {
    appState.history = [];
    localStorage.setItem('promptHistory', JSON.stringify(appState.history));
    renderHistory();
  });

  historyList.addEventListener('click', async (e) => {
    const copyBtn = e.target.closest('.history-copy');
    const saveBtn = e.target.closest('.history-save');
    const shareBtn = e.target.closest('.history-share');
    const siteShareBtn = e.target.closest('.history-site-share');
    const deleteBtn = e.target.closest('.history-delete');
    const btn = copyBtn || saveBtn || shareBtn || siteShareBtn || deleteBtn;
    if (!btn) return;
    const index = parseInt(btn.getAttribute('data-index'), 10);
    if (Number.isNaN(index)) return;
    const text = appState.history[index];
    if (deleteBtn) {
      const li = deleteBtn.closest('li');
      if (li) li.classList.add('fade-out');
      deleteBtn.classList.add('button-pop');
      setTimeout(() => {
        deleteBtn.classList.remove('button-pop');
      }, 300);
      setTimeout(() => {
        appState.history.splice(index, 1);
        localStorage.setItem('promptHistory', JSON.stringify(appState.history));
        renderHistory();
      }, 300);
    } else if (!text) {
      return;
    } else if (copyBtn) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          const feedback = copyBtn.parentElement.querySelector(
            '.history-copy-feedback'
          );
          if (feedback) {
            feedback.classList.remove('hidden');
            setTimeout(() => feedback.classList.add('hidden'), 1000);
          }
          copyBtn.classList.add('button-pop');
          setTimeout(() => {
            copyBtn.classList.remove('button-pop');
          }, 300);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    } else if (saveBtn) {
      saveBtn.classList.toggle('active');
      const saveIcon = saveBtn.querySelector('svg');
      if (saveIcon)
        saveIcon.setAttribute(
          'fill',
          saveBtn.classList.contains('active') ? 'currentColor' : 'none'
        );
      appState.savedPrompts.push(text);
      localStorage.setItem(
        'savedPrompts',
        JSON.stringify(appState.savedPrompts)
      );
      let saved = true;
      if (appState.currentUser) {
        try {
          const { savePrompt } = await import('./prompt.js');
          await savePrompt(
            text,
            appState.currentUser.uid,
            appState.selectedCategory,
            appState.currentUser.displayName || '',
            appState.currentUser.email || ''
          );
        } catch (err) {
          console.error(err);
          saved = false;
          if (saveErrorMessage) {
            saveErrorMessage.classList.remove('hidden');
          }
          const retry = confirm(
            `${uiText[appState.language].saveErrorMessage} Retry?`
          );
          if (retry) {
            try {
              const { savePrompt: retrySavePrompt } = await import(
                './prompt.js'
              );
              await retrySavePrompt(
                text,
                appState.currentUser.uid,
                undefined,
                appState.currentUser.displayName || '',
                appState.currentUser.email || ''
              );
              saved = true;
            } catch (err2) {
              console.error(err2);
              saved = false;
            }
          }
          setTimeout(() => {
            if (saveErrorMessage) saveErrorMessage.classList.add('hidden');
          }, 2000);
        }
      }
      if (saved) {
        const feedback = saveBtn.parentElement.querySelector('.save-feedback');
        if (feedback) {
          feedback.classList.remove('hidden');
          setTimeout(() => {
            feedback.classList.add('hidden');
          }, 1000);
        }
      }
      saveBtn.classList.add('button-pop');
      setTimeout(() => {
        saveBtn.classList.remove('button-pop');
      }, 300);
    } else if (siteShareBtn) {
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequiredShare);
        return;
      }
      siteShareBtn.classList.toggle('active');
      const siteShareIcon = siteShareBtn.querySelector('svg');
      if (siteShareIcon)
        siteShareIcon.setAttribute(
          'fill',
          siteShareBtn.classList.contains('active') ? 'currentColor' : 'none'
        );
      siteShareBtn.classList.add('button-pop');
      if (shareMessage) {
        shareMessage.classList.remove('hidden');
        setTimeout(() => {
          shareMessage.classList.add('hidden');
        }, 2000);
      }
      setTimeout(() => {
        siteShareBtn.classList.remove('button-pop');
      }, 300);
      try {
        const { savePrompt } = await import('./prompt.js');
        await savePrompt(
          text,
          appState.currentUser.uid,
          appState.selectedCategory,
          appState.currentUser.displayName || '',
          appState.currentUser.email || ''
        );
      } catch (err) {
        console.error(err);
        alert(uiText[appState.language].shareFailed);
      }
    } else if (shareBtn) {
      shareBtn.classList.toggle('active');
      const shareIcon = shareBtn.querySelector('svg');
      if (shareIcon)
        shareIcon.setAttribute(
          'fill',
          shareBtn.classList.contains('active') ? 'currentColor' : 'none'
        );
      shareBtn.classList.add('button-pop');
      if (shareMessage) {
        shareMessage.classList.remove('hidden');
        setTimeout(() => {
          shareMessage.classList.add('hidden');
        }, 2000);
      }
      setTimeout(() => {
        shareBtn.classList.remove('button-pop');
      }, 300);
      sharePrompt(text, 'https://twitter.com/intent/tweet?text=');
    }
  });

  historyList.addEventListener('input', (e) => {
    const target = e.target.closest('.history-edit');
    if (!target) return;
    const idx = Number(target.getAttribute('data-index'));
    const value = 'value' in target ? target.value : target.textContent;
    if (!Number.isNaN(idx)) {
      appState.history[idx] = value;
      localStorage.setItem('promptHistory', JSON.stringify(appState.history));
    }
  });

  if (langToggleButton && langMenu) {
    langToggleButton.addEventListener('click', () => {
      langMenu.classList.toggle('hidden');
    });
  }

  if (currentLangLabel && langMenu) {
    currentLangLabel.addEventListener('click', () => {
      langMenu.classList.toggle('hidden');
    });
  }

  langEnButton.addEventListener('click', () => setLanguage('en'));
  langTrButton.addEventListener('click', () => setLanguage('tr'));
  if (langEsButton) {
    langEsButton.addEventListener('click', () => setLanguage('es'));
  }
  if (langFrButton) {
    langFrButton.addEventListener('click', () => setLanguage('fr'));
  }
  if (langZhButton) {
    langZhButton.addEventListener('click', () => setLanguage('zh'));
  }
  if (langHiButton) {
    langHiButton.addEventListener('click', () => setLanguage('hi'));
  }

  [
    langEnButton,
    langTrButton,
    langEsButton,
    langFrButton,
    langZhButton,
    langHiButton,
  ].forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => {
        langMenu && langMenu.classList.add('hidden');
      });
    }
  });

  themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
};

export const initializeApp = async () => {
  categoryButtonsContainer = document.getElementById('category-buttons');
  generateButton = document.getElementById('generate-button');
  promptDisplayArea = document.getElementById('prompt-display-area');
  generatedPromptText = document.getElementById('generated-prompt-text');
  copyButton = document.getElementById('copy-button');
  shareButton = document.getElementById('share-button');
  saveButton = document.getElementById('save-button');
  shareTwitterButton = document.getElementById('share-twitter');
  copySuccessMessage = document.getElementById('copy-success-message');
  saveSuccessMessage = document.getElementById('save-success-message');
  saveErrorMessage = document.getElementById('save-error-message');
  shareMessage = document.getElementById('share-message');
  langEnButton = document.getElementById('lang-en');
  langTrButton = document.getElementById('lang-tr');
  langEsButton = document.getElementById('lang-es');
  langFrButton = document.getElementById('lang-fr');
  langZhButton = document.getElementById('lang-zh');
  langHiButton = document.getElementById('lang-hi');
  langToggleButton = document.getElementById('lang-toggle');
  langMenu = document.getElementById('lang-menu');
  currentLangLabel = document.getElementById('current-lang');
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
  appLogo = document.getElementById('app-logo');
  historyPanel = document.getElementById('history-panel');
  historyList = document.getElementById('history-list');
  clearHistoryButton = document.getElementById('clear-history');

  const runLucide = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();

      document
        .querySelectorAll('#category-buttons .category-button')
        .forEach((button) => {
          const iconEl = button.querySelector('i[data-lucide]');
          const emojiEl = button.querySelector('.emoji-icon');
          if (!iconEl) return;

          let iconName = iconEl.getAttribute('data-lucide');
          const pascal = iconName.replace(/(^.|-.)/g, (s) =>
            s.replace('-', '').toUpperCase()
          );
          if (!window.lucide.icons || !window.lucide.icons[pascal]) {
            const fallback = ICON_FALLBACKS[iconName];
            if (fallback) {
              iconName = fallback;
              iconEl.setAttribute('data-lucide', iconName);
            }
          }

          const hasSvg = iconEl.querySelector('svg');
          if (!hasSvg) {
            emojiEl && emojiEl.classList.remove('hidden');
            iconEl.style.display = 'none';
          } else {
            iconEl.style.display = 'block';
            emojiEl && emojiEl.classList.add('hidden');
          }
        });

      window.lucide.createIcons();
      return true;
    }
    return false;
  };

  const savedLanguage = localStorage.getItem('language') || 'en';
  // Apply the stored language preference. The call may redirect to the matching
  // language page unless a query parameter specifies a different one.
  await setLanguage(savedLanguage, true);

  const savedTheme = localStorage.getItem('theme') || THEMES.DARK;
  setTheme(savedTheme);

  categoryButtonsContainer.innerHTML = '';
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.id = `category-${category.id}`;
    button.className =
      'category-button focus:outline-none focus:ring-2 focus:ring-white/50';
    button.setAttribute(
      'aria-label',
      `${category.name[appState.language]} category`
    );
    if (category.id === appState.selectedCategory) {
      button.classList.add('selected');
    }
    button.innerHTML = `
                    <span class="emoji-icon mr-1" aria-hidden="true">${
                      category.emoji
                    }</span>
                    <i data-lucide="${
                      category.icon
                    }" class="lucide" aria-hidden="true"></i>
                    <span class="category-label">${
                      category.name[appState.language]
                    }</span>`;
    categoryButtonsContainer.appendChild(button);
  });
  if (window.lucideScripts && window.lucideScripts.loadPromise) {
    window.lucideScripts.loadPromise.then(runLucide);
  }

  renderHistory();

  setupEventListeners();
};
