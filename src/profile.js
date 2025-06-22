import { onAuth, logout } from './auth.js';
import { getUserPrompts, likePrompt, getUserSavedPrompts } from './prompt.js';
import { appState, THEMES } from './state.js';

const uiText = {
  en: {
    profile: 'Profile',
    savedPrompts: 'Saved Prompts',
    sharedPrompts: 'Shared Prompts',
    noPrompts: 'No prompts yet.',
    logout: 'Logout',
    back: 'Back',
    themeLightTitle: 'Light Theme',
    themeDarkTitle: 'Dark Theme',
    langEnLabel: 'Switch to English',
    langTrLabel: 'Switch to Turkish',
    langEsLabel: 'Switch to Spanish',
    langFrLabel: 'Switch to French',
    langZhLabel: 'Switch to Chinese',
    langHiLabel: 'Switch to Hindi',
    appLogoAlt: 'Prompter logo',
  },
  tr: {
    profile: 'Profil',
    savedPrompts: 'Kaydedilen Promptlar',
    sharedPrompts: 'Paylaşılan Promptlar',
    noPrompts: 'Henüz prompt yok.',
    logout: 'Çıkış Yap',
    back: 'Geri',
    themeLightTitle: 'Açık Tema',
    themeDarkTitle: 'Koyu Tema',
    langEnLabel: "İngilizce'ye geç",
    langTrLabel: "Türkçe'ye geç",
    langEsLabel: "İspanyolca'ya geç",
    langFrLabel: "Fransızca'ya geç",
    langZhLabel: "Çince'ye geç",
    langHiLabel: 'Hintçe\u0027ye geç',
    appLogoAlt: 'Prompter logosu',
  },
  es: {
    profile: 'Perfil',
    savedPrompts: 'Prompts Guardados',
    sharedPrompts: 'Prompts Compartidos',
    noPrompts: 'Aún no hay prompts.',
    logout: 'Cerrar sesión',
    back: 'Atrás',
    themeLightTitle: 'Tema Claro',
    themeDarkTitle: 'Tema Oscuro',
    langEnLabel: 'Cambiar a inglés',
    langTrLabel: 'Cambiar a turco',
    langEsLabel: 'Cambiar a español',
    langFrLabel: 'Cambiar a francés',
    langZhLabel: 'Cambiar a chino',
    langHiLabel: 'Cambiar a hindi',
    appLogoAlt: 'Logo de Prompter',
  },
  fr: {
    profile: 'Profil',
    savedPrompts: 'Prompts Enregistrés',
    sharedPrompts: 'Prompts Partagés',
    noPrompts: 'Pas encore de prompts.',
    logout: 'Se déconnecter',
    back: 'Retour',
    themeLightTitle: 'Thème clair',
    themeDarkTitle: 'Thème sombre',
    langEnLabel: "Passer à l'anglais",
    langTrLabel: 'Passer au turc',
    langEsLabel: "Passer à l'espagnol",
    langFrLabel: 'Passer au français',
    langZhLabel: 'Passer au chinois',
    langHiLabel: 'Passer au hindi',
    appLogoAlt: 'Logo de Prompter',
  },
  zh: {
    profile: '个人资料',
    savedPrompts: '已保存的提示',
    sharedPrompts: '分享的提示',
    noPrompts: '暂无提示。',
    logout: '登出',
    back: '返回',
    themeLightTitle: '浅色主题',
    themeDarkTitle: '深色主题',
    langEnLabel: '切换到英文',
    langTrLabel: '切换到土耳其语',
    langEsLabel: '切换到西班牙语',
    langFrLabel: '切换到法语',
    langZhLabel: '切换到中文',
    langHiLabel: '切换到印地语',
    appLogoAlt: 'Prompter 标志',
  },
  hi: {
    profile: 'प्रोफ़ाइल',
    savedPrompts: 'सहेजे गए प्रॉम्प्ट',
    sharedPrompts: 'साझा किए गए प्रॉम्प्ट',
    noPrompts: 'अभी कोई प्रॉम्प्ट नहीं।',
    logout: 'लॉग आउट',
    back: 'वापस',
    themeLightTitle: 'लाइट थीम',
    themeDarkTitle: 'डार्क थीम',
    langEnLabel: 'अंग्रेजी पर स्विच करें',
    langTrLabel: 'तुर्की पर स्विच करें',
    langEsLabel: 'स्पेनिश पर स्विच करें',
    langFrLabel: 'फ्रेंच पर स्विच करें',
    langZhLabel: 'चीनी पर स्विच करें',
    langHiLabel: 'हिंदी पर स्विच करें',
    appLogoAlt: 'Prompter लोगो',
  },
};

let themeLightButton;
let themeDarkButton;
let themeLinkElement;
let themeVersion = '';
let langEnButton;
let langTrButton;
let langEsButton;
let langFrButton;
let langZhButton;
let langHiButton;
let langToggleButton;
let langMenu;
let currentLangLabel;
let sharedPromptsData = [];

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
  appState.language = lang;
  document.documentElement.lang = lang;
  updateTexts();
  renderSavedPrompts(appState.savedPrompts);
  renderSharedPrompts(sharedPromptsData);
  localStorage.setItem('language', lang);
};

const updateTexts = () => {
  if (themeLightButton) {
    themeLightButton.title = uiText[appState.language].themeLightTitle;
    themeLightButton.setAttribute('aria-label', uiText[appState.language].themeLightTitle);
  }
  if (themeDarkButton) {
    themeDarkButton.title = uiText[appState.language].themeDarkTitle;
    themeDarkButton.setAttribute('aria-label', uiText[appState.language].themeDarkTitle);
  }
  const backLink = document.getElementById('back-link');
  if (backLink) {
    backLink.title = uiText[appState.language].back;
    backLink.setAttribute('aria-label', uiText[appState.language].back);
  }
  const pageTitle = document.getElementById('page-title');
  if (pageTitle) pageTitle.textContent = uiText[appState.language].profile;
  const logo = document.getElementById('app-logo');
  if (logo) logo.alt = uiText[appState.language].appLogoAlt;
  const logoutSpan = document.querySelector('#logout span');
  if (logoutSpan) logoutSpan.textContent = uiText[appState.language].logout;
  const savedTitle = document.getElementById('saved-title-text');
  if (savedTitle) savedTitle.textContent = uiText[appState.language].savedPrompts;
  const sharedTitle = document.getElementById('shared-title-text');
  if (sharedTitle) sharedTitle.textContent = uiText[appState.language].sharedPrompts;
  if (langEnButton) {
    langEnButton.title = uiText[appState.language].langEnLabel;
    langEnButton.setAttribute('aria-label', uiText[appState.language].langEnLabel);
  }
  if (langTrButton) {
    langTrButton.title = uiText[appState.language].langTrLabel;
    langTrButton.setAttribute('aria-label', uiText[appState.language].langTrLabel);
  }
  if (langEsButton) {
    langEsButton.title = uiText[appState.language].langEsLabel;
    langEsButton.setAttribute('aria-label', uiText[appState.language].langEsLabel);
  }
  if (langFrButton) {
    langFrButton.title = uiText[appState.language].langFrLabel;
    langFrButton.setAttribute('aria-label', uiText[appState.language].langFrLabel);
  }
  if (langZhButton) {
    langZhButton.title = uiText[appState.language].langZhLabel;
    langZhButton.setAttribute('aria-label', uiText[appState.language].langZhLabel);
  }
  if (langHiButton) {
    langHiButton.title = uiText[appState.language].langHiLabel;
    langHiButton.setAttribute('aria-label', uiText[appState.language].langHiLabel);
  }
  if (currentLangLabel) {
    const arrow = currentLangLabel.querySelector('svg');
    currentLangLabel.textContent = appState.language.toUpperCase();
    if (arrow) currentLangLabel.appendChild(arrow);
  }
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
    p.textContent = uiText[appState.language].noPrompts;
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
    p.textContent = uiText[appState.language].noPrompts;
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

    if (appState.likedPrompts.includes(p.id)) {
      likeBtn.disabled = true;
    }
    likeBtn.addEventListener('click', async () => {
      if (appState.likedPrompts.includes(p.id)) return;
      await likePrompt(p.id);
      appState.likedPrompts.push(p.id);
      localStorage.setItem('likedPrompts', JSON.stringify(appState.likedPrompts));
      likeCount.textContent = (parseInt(likeCount.textContent, 10) + 1).toString();
      likeBtn.disabled = true;
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

  langEnButton = document.getElementById('lang-en');
  langTrButton = document.getElementById('lang-tr');
  langEsButton = document.getElementById('lang-es');
  langFrButton = document.getElementById('lang-fr');
  langZhButton = document.getElementById('lang-zh');
  langHiButton = document.getElementById('lang-hi');
  langToggleButton = document.getElementById('lang-toggle');
  langMenu = document.getElementById('lang-menu');
  currentLangLabel = document.getElementById('current-lang');

  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);

  const currentTheme = localStorage.getItem('theme') || THEMES.DARK;
  setTheme(currentTheme);

  themeLightButton?.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton?.addEventListener('click', () => setTheme(THEMES.DARK));
  document.getElementById('logout')?.addEventListener('click', logout);
  langEnButton?.addEventListener('click', () => setLanguage('en'));
  langTrButton?.addEventListener('click', () => setLanguage('tr'));
  langEsButton?.addEventListener('click', () => setLanguage('es'));
  langFrButton?.addEventListener('click', () => setLanguage('fr'));
  langZhButton?.addEventListener('click', () => setLanguage('zh'));
  langHiButton?.addEventListener('click', () => setLanguage('hi'));

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

  window.addEventListener('storage', async (e) => {
    if (e.key === 'savedPrompts') {
      try {
        const saved = e.newValue ? JSON.parse(e.newValue) : [];
        appState.savedPrompts = saved;
        renderSavedPrompts(saved);
        if (appState.currentUser) {
          try {
            const prompts = await getUserPrompts(appState.currentUser.uid);
            sharedPromptsData = prompts;
            renderSharedPrompts(sharedPromptsData);
          } catch (err) {
            console.error('Failed to load prompts:', err);
          }
        }
      } catch (err) {
        console.error('Failed to parse savedPrompts from storage event:', err);
      }
    }
  });

  onAuth(async (user) => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    document.getElementById('user-email').textContent = user.email || '';
    try {
      const prompts = await getUserPrompts(user.uid);
      sharedPromptsData = prompts;
      renderSharedPrompts(sharedPromptsData);

      const savedDocs = await getUserSavedPrompts(user.uid);
      const savedTexts = savedDocs.map((p) => p.text);
      const merged = Array.from(
        new Set([...appState.savedPrompts, ...savedTexts])
      );
      appState.savedPrompts = merged;
      localStorage.setItem('savedPrompts', JSON.stringify(merged));
      renderSavedPrompts(appState.savedPrompts);
    } catch (err) {
      console.error('Failed to load prompts:', err);
    }
    window.lucide?.createIcons();
  });
};

document.addEventListener('DOMContentLoaded', init);
