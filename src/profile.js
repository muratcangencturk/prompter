import { onAuth, logout } from './auth.js';
import {
  likePrompt,
  unlikePrompt,
  getUserSavedPrompts,
  updatePromptText,
  unsharePrompt,
  savePrompt,
  incrementShareCount,
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from './prompt.js';
import {
  getUserProfile,
  setUserProfile,
  getFollowingIds,
  getFollowerIds,
} from './user.js';
import { listenNotifications, markNotificationRead } from './notifications.js';
import { appState, THEMES } from './state.js';
import { categories } from './prompts.js';
import { BASE_URL } from './config.js';
import { linkify } from './linkify.js';
import { sanitizeHTML, setSanitizedHTML } from './sanitize.js';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js';
import { db } from './firebase.js';

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
    copyButtonTitle: 'Copy to clipboard',
    copyFeedback: 'Copied!',
    loginRequired: 'Login required',
    loginRequiredShare: 'Login required to share',
    copyFailed: 'Failed to copy prompt. Please try again.',
    shareFailed: 'Failed to share prompt. Please try again.',
    showMore: 'Show more',
    showLess: 'Show less',
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
    copyButtonTitle: 'Panoya kopyala',
    copyFeedback: 'Kopyalandı!',
    loginRequired: 'Giriş gerekli',
    loginRequiredShare: 'Paylaşmak için giriş yapın',
    copyFailed: 'Prompt kopyalanamadı. Lütfen tekrar deneyin.',
    shareFailed: 'Prompt paylaşılamadı. Lütfen tekrar deneyin.',
    showMore: 'Daha fazlası',
    showLess: 'Daha az',
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
    copyButtonTitle: 'Copiar al portapapeles',
    copyFeedback: '¡Copiado!',
    loginRequired: 'Se requiere inicio de sesión',
    loginRequiredShare: 'Debes iniciar sesión para compartir',
    copyFailed: 'No se pudo copiar el prompt. Por favor inténtalo de nuevo.',
    shareFailed:
      'No se pudo compartir el prompt. Por favor inténtalo de nuevo.',
    showMore: 'Show more',
    showLess: 'Show less',
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
    copyButtonTitle: 'Copier dans le presse-papiers',
    copyFeedback: 'Copié !',
    loginRequired: 'Connexion requise',
    loginRequiredShare: 'Connexion requise pour partager',
    copyFailed: 'Échec de la copie du prompt. Veuillez réessayer.',
    shareFailed: 'Échec du partage du prompt. Veuillez réessayer.',
    showMore: 'Show more',
    showLess: 'Show less',
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
    copyButtonTitle: '复制到剪贴板',
    copyFeedback: '已复制!',
    loginRequired: '需要登录',
    loginRequiredShare: '登录后才能分享',
    copyFailed: '复制提示失败。请再试一次。',
    shareFailed: '分享提示失败。请再试一次。',
    showMore: 'Show more',
    showLess: 'Show less',
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
    copyButtonTitle: 'क्लिपबोर्ड पर कॉपी करें',
    copyFeedback: 'कॉपी किया गया!',
    loginRequired: 'लॉगिन आवश्यक है',
    loginRequiredShare: 'शेयर करने के लिए लॉगिन करें',
    copyFailed: 'प्रॉम्प्ट कॉपी करने में विफल। कृपया पुनः प्रयास करें।',
    shareFailed: 'प्रॉम्प्ट साझा करने में विफल। कृपया पुनः प्रयास करें।',
    showMore: 'Show more',
    showLess: 'Show less',
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
let currentLangLabel;
let sharedPromptsData = [];
let unsubscribePrompts = null;
const CACHE_LIMIT = 50;
let currentUserName = '';
let currentUserBio = '';
let nameWrapper;
let nameEditRow;
let nameInput;
let nameUpdateBtn;
let editNameBtn;
let usernameLabel;
let bioWrapper;
let bioEditRow;
let bioInput;
let bioUpdateBtn;
let editBioHint;
let notificationBtn;
let notificationCountEl;
let notificationsPanel;
let notifications = [];
let unsubscribeNotifications;
let followerIds = [];
let followingIds = [];

const profileCache = {};
const fetchName = async (uid) => {
  if (profileCache[uid]) return profileCache[uid];
  const prof = await getUserProfile(uid);
  let display = prof?.name || 'Unknown User';
  if (prof?.email) {
    display += ` (${prof.email})`;
  }
  display = sanitizeHTML(display);
  profileCache[uid] = display;
  return display;
};

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
    themeLightButton.setAttribute(
      'aria-label',
      uiText[appState.language].themeLightTitle,
    );
  }
  if (themeDarkButton) {
    themeDarkButton.title = uiText[appState.language].themeDarkTitle;
    themeDarkButton.setAttribute(
      'aria-label',
      uiText[appState.language].themeDarkTitle,
    );
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
  if (savedTitle)
    savedTitle.textContent = uiText[appState.language].savedPrompts;
  const sharedTitle = document.getElementById('shared-title-text');
  if (sharedTitle)
    sharedTitle.textContent = uiText[appState.language].sharedPrompts;
  if (langEnButton) {
    langEnButton.title = uiText[appState.language].langEnLabel;
    langEnButton.setAttribute(
      'aria-label',
      uiText[appState.language].langEnLabel,
    );
  }
  if (langTrButton) {
    langTrButton.title = uiText[appState.language].langTrLabel;
    langTrButton.setAttribute(
      'aria-label',
      uiText[appState.language].langTrLabel,
    );
  }
  if (langEsButton) {
    langEsButton.title = uiText[appState.language].langEsLabel;
    langEsButton.setAttribute(
      'aria-label',
      uiText[appState.language].langEsLabel,
    );
  }
  if (langFrButton) {
    langFrButton.title = uiText[appState.language].langFrLabel;
    langFrButton.setAttribute(
      'aria-label',
      uiText[appState.language].langFrLabel,
    );
  }
  if (langZhButton) {
    langZhButton.title = uiText[appState.language].langZhLabel;
    langZhButton.setAttribute(
      'aria-label',
      uiText[appState.language].langZhLabel,
    );
  }
  if (langHiButton) {
    langHiButton.title = uiText[appState.language].langHiLabel;
    langHiButton.setAttribute(
      'aria-label',
      uiText[appState.language].langHiLabel,
    );
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

const updateStats = (prompts) => {
  const totals = {
    prompts: prompts.length,
    likes: 0,
    comments: 0,
    saves: 0,
    shares: 0,
  };
  prompts.forEach((p) => {
    totals.likes +=
      p.likes || (Array.isArray(p.likedBy) ? p.likedBy.length : 0);
    totals.comments += p.commentCount || 0;
    totals.saves += p.saveCount || 0;
    totals.shares +=
      p.shareCount || (Array.isArray(p.sharedBy) ? p.sharedBy.length : 0);
  });
  updateCount('stat-prompts', totals.prompts);
  updateCount('stat-likes', totals.likes);
  updateCount('stat-comments', totals.comments);
  updateCount('stat-saves', totals.saves);
  updateCount('stat-shares', totals.shares);
};

const renderNotifications = () => {
  if (!notificationCountEl || !notificationsPanel) return;
  const unread = notifications.filter((n) => !n.read);
  if (unread.length) {
    notificationCountEl.textContent = unread.length.toString();
    notificationCountEl.classList.remove('hidden');
  } else {
    notificationCountEl.classList.add('hidden');
  }
  notificationsPanel.innerHTML = '';
  notifications.forEach((n) => {
    const link = document.createElement('a');
    let msg = '';
    if (n.type === 'like') msg = 'Your prompt received a like.';
    else if (n.type === 'comment') msg = 'New comment on your prompt.';
    else if (n.type === 'share') msg = 'Your prompt was shared.';
    else msg = 'New activity on your prompt.';
    link.textContent = msg;
    link.href = n.promptId ? `social.html#${n.promptId}` : 'social.html';
    link.className =
      'block p-1 border-b border-white/20 last:border-b-0 hover:bg-white/10';
    link.addEventListener('click', async () => {
      if (appState.currentUser) {
        try {
          await markNotificationRead(appState.currentUser.uid, n.id);
        } catch (err) {
          console.error('Failed to mark notification read:', err);
        }
      }
      n.read = true;
      renderNotifications();
    });
    notificationsPanel.appendChild(link);
  });
};

const initNotifications = (uid) => {
  unsubscribeNotifications?.();
  unsubscribeNotifications = listenNotifications(uid, (data) => {
    notifications = data;
    renderNotifications();
  });
};

const markAllNotificationsRead = async () => {
  if (!appState.currentUser) return;
  const unread = notifications.filter((n) => !n.read);
  if (!unread.length) return;
  await Promise.all(
    unread.map((n) =>
      markNotificationRead(appState.currentUser.uid, n.id).catch((err) => {
        console.error('Failed to mark notification read:', err);
      }),
    ),
  );
  unread.forEach((n) => {
    n.read = true;
  });
  renderNotifications();
};

const sharePrompt = (prompt, baseUrl) => {
  if (!prompt) return;
  const link = ` ${BASE_URL}`;
  const url = `${baseUrl}${encodeURIComponent(`${prompt}${link}`)}`;
  window.open(url, '_blank');
};

const LOAD_ERROR_MESSAGE =
  'Could not load prompts. Please check your connection.';

const INDEX_ERROR_MESSAGE =
  'Missing Firestore indexes. See README \u201cUpdating Firestore Indexes\u201d.';

const showLoadError = (listId, retryFn) => {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = '';
  const p = document.createElement('p');
  p.className = 'text-center text-blue-200 text-sm';
  p.textContent = LOAD_ERROR_MESSAGE;
  list.appendChild(p);
  if (retryFn) {
    const btn = document.createElement('button');
    btn.textContent = 'Retry';
    btn.className = 'block mx-auto underline mt-2 text-blue-200';
    btn.addEventListener('click', retryFn);
    list.appendChild(btn);
  }
};

const showSavedLoadError = (retryFn) => showLoadError('saved-list', retryFn);

const showSharedLoadError = (retryFn) => showLoadError('shared-list', retryFn);

const loadPromptsForUser = async (user) => {
  if (!user) return;
  const cacheKey = `profileCache_${user.uid}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      sharedPromptsData = JSON.parse(cached);
      renderSharedPrompts(sharedPromptsData);
    }
  } catch (err) {
    console.warn('Failed to parse profile cache:', err);
  }

  if (unsubscribePrompts) unsubscribePrompts();

  const q = query(
    collection(db, 'prompts'),
    where('userId', '==', user.uid),
    where('sharedBy', 'array-contains', user.uid),
    orderBy('createdAt', 'desc'),
  );

  unsubscribePrompts = onSnapshot(
    q,
    (snap) => {
      const prompts = snap.docs.map((d) => ({
        id: d.id,
        category: d.get('category') || 'random',
        ...d.data(),
      }));
      sharedPromptsData = prompts;
      renderSharedPrompts(sharedPromptsData);
      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify(prompts.slice(0, CACHE_LIMIT)),
        );
      } catch (err) {
        console.warn('Failed to store profile cache:', err);
      }
    },
    (err) => {
      console.error('Failed to load prompts:', err);
      if (err.code === 'failed-precondition') {
        alert(INDEX_ERROR_MESSAGE);
      }
      showSharedLoadError(() => loadPromptsForUser(user));
    },
  );

  try {
    const savedDocs = await getUserSavedPrompts(user.uid);
    const savedTexts = savedDocs.map((p) => p.text);
    const merged = Array.from(
      new Set([...appState.savedPrompts, ...savedTexts]),
    );
    appState.savedPrompts = merged;
    localStorage.setItem('savedPrompts', JSON.stringify(merged));
    renderSavedPrompts(appState.savedPrompts);
  } catch (err) {
    console.error('Failed to load prompts:', err);
    if (err.code === 'failed-precondition') {
      alert(INDEX_ERROR_MESSAGE);
    }
    showSavedLoadError(() => loadPromptsForUser(user));
  }
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
  prompts.forEach((text, idx) => {
    const item = document.createElement('div');
    item.className =
      'col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg relative';

    const textWrap = document.createElement('div');
    textWrap.className = 'relative pr-6';

    const textContainer = document.createElement('div');
    textContainer.className = 'prompt-text-box overflow-hidden max-h-40';

    const pEl = document.createElement('p');
    setSanitizedHTML(pEl, linkify(text));
    textContainer.appendChild(pEl);
    textWrap.appendChild(textContainer);

    const showMore = document.createElement('span');
    showMore.className = 'text-blue-200 text-xs underline cursor-pointer';
    showMore.textContent = uiText[appState.language].showMore;
    const toggleText = () => {
      textContainer.classList.toggle('overflow-hidden');
      textContainer.classList.toggle('max-h-40');
      showMore.textContent = textContainer.classList.contains('overflow-hidden')
        ? uiText[appState.language].showMore
        : uiText[appState.language].showLess;
    };
    showMore.addEventListener('click', toggleText);
    requestAnimationFrame(() => {
      if (textContainer.scrollHeight > textContainer.offsetHeight) {
        textWrap.appendChild(showMore);
      }
    });

    const copyBtn = document.createElement('button');
    copyBtn.className =
      'history-copy absolute top-0 right-0 p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[appState.language].copyButtonTitle;
    copyBtn.setAttribute(
      'aria-label',
      uiText[appState.language].copyButtonTitle,
    );
    copyBtn.innerHTML =
      '<i data-lucide="copy" class="w-2 h-2" aria-hidden="true"></i>';
    textWrap.appendChild(copyBtn);

    const copyFeedback = document.createElement('span');
    copyFeedback.className =
      'absolute -top-3 right-0 text-green-400 text-xs hidden';
    copyFeedback.textContent = uiText[appState.language].copyFeedback;
    textWrap.appendChild(copyFeedback);

    const actions = document.createElement('div');
    actions.className = 'flex items-center gap-2 mt-2';

    const editBtn = document.createElement('button');
    editBtn.className =
      'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    editBtn.innerHTML =
      '<i data-lucide="pencil" class="w-4 h-4" aria-hidden="true"></i>';
    if (!appState.currentUser) {
      editBtn.disabled = true;
    }

    let editing = false;

    const startEdit = () => {
      if (editing) return;
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequired);
        return;
      }
      if (!textWrap.isConnected || !pEl.isConnected || !textWrap.contains(pEl))
        return;
      editing = true;
      const textarea = document.createElement('textarea');
      textarea.className = 'w-full p-2 rounded-md bg-black/30';
      textarea.value = pEl.textContent;
      if (!textWrap.isConnected || !pEl.isConnected || !textWrap.contains(pEl))
        return;
      if (pEl.parentNode) pEl.parentNode.replaceChild(textarea, pEl);

      const editRow = document.createElement('div');
      editRow.className = 'flex items-center gap-2 mt-2';
      const saveEdit = document.createElement('button');
      saveEdit.className =
        'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      saveEdit.innerHTML =
        '<i data-lucide="save" class="w-4 h-4" aria-hidden="true"></i>';
      const cancelEdit = document.createElement('button');
      cancelEdit.className =
        'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      cancelEdit.innerHTML =
        '<i data-lucide="x" class="w-4 h-4" aria-hidden="true"></i>';
      editRow.appendChild(saveEdit);
      editRow.appendChild(cancelEdit);
      if (!item.contains(actions)) return;
      item.replaceChild(editRow, actions);
      // refresh icons for the new buttons
      window.lucide?.createIcons();

      cancelEdit.addEventListener('click', () => {
        if (textarea.parentNode) textarea.parentNode.replaceChild(pEl, textarea);
        if (item.contains(editRow)) item.replaceChild(actions, editRow);
        editing = false;
      });

      saveEdit.addEventListener('click', () => {
        prompts[idx] = textarea.value;
        localStorage.setItem('savedPrompts', JSON.stringify(prompts));
        pEl.textContent = textarea.value;
        cancelEdit.click();
      });
    };

    // allow direct click on the prompt text to start editing
    pEl.addEventListener('click', startEdit);
    editBtn.addEventListener('click', startEdit);

    const shareBtn = document.createElement('button');
    shareBtn.className =
      'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    shareBtn.title = 'Share on Twitter';
    shareBtn.setAttribute('aria-label', 'Share on Twitter');
    shareBtn.innerHTML =
      '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';

    const siteShareBtn = document.createElement('button');
    siteShareBtn.className =
      'history-site-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    siteShareBtn.title = 'Share on Prompter';
    siteShareBtn.setAttribute('aria-label', 'Share on Prompter');
    siteShareBtn.innerHTML =
      '<i data-lucide="share-2" class="w-3 h-3" aria-hidden="true"></i>';

    const delBtn = document.createElement('button');
    delBtn.className =
      'history-delete p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    delBtn.innerHTML =
      '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';

    copyBtn.addEventListener('click', () => {
      navigator.clipboard
        .writeText(pEl.textContent || '')
        .then(() => {
          copyFeedback.classList.remove('hidden');
          setTimeout(() => copyFeedback.classList.add('hidden'), 1000);
        })
        .catch((err) => {
          console.error('Failed to copy text:', err);
        });
    });

    siteShareBtn.addEventListener('click', async () => {
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequiredShare);
        return;
      }
      siteShareBtn.classList.toggle('active');
      const svg = siteShareBtn.querySelector('svg');
      if (svg) {
        svg.setAttribute(
          'fill',
          siteShareBtn.classList.contains('active') ? 'currentColor' : 'none',
        );
        svg.setAttribute('stroke', 'currentColor');
      }
      siteShareBtn.disabled = true;
      try {
        await savePrompt(
          pEl.textContent || '',
          appState.currentUser.uid,
          appState.selectedCategory,
          appState.currentUser.displayName || '',
          appState.currentUser.email || '',
        );
      } catch (err) {
        console.error(err);
        alert(uiText[appState.language].shareFailed);
      } finally {
        siteShareBtn.disabled = false;
      }
    });

    const updateShareIcon = () => {
      const svg = shareBtn.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          shareBtn.classList.contains('active') ? 'currentColor' : 'none',
        );
    };
    updateShareIcon();
    shareBtn.addEventListener('click', () => {
      shareBtn.classList.toggle('active');
      updateShareIcon();
      sharePrompt(
        pEl.textContent || '',
        'https://twitter.com/intent/tweet?text=',
      );
    });

    delBtn.addEventListener('click', () => {
      const wrapper = item;
      wrapper.classList.add('fade-out');
      setTimeout(() => {
        prompts.splice(idx, 1);
        localStorage.setItem('savedPrompts', JSON.stringify(prompts));
        renderSavedPrompts(prompts);
      }, 300);
    });

    actions.appendChild(editBtn);
    actions.appendChild(siteShareBtn);
    actions.appendChild(shareBtn);
    actions.appendChild(delBtn);

    item.appendChild(textWrap);
    item.appendChild(actions);
    list.appendChild(item);
  });
  window.lucide?.createIcons();
};

const renderSharedPrompts = async (prompts) => {
  const list = document.getElementById('shared-list');
  list.innerHTML = '';
  updateCount('shared-count', prompts.length);
  updateStats(prompts);
  if (!prompts || prompts.length === 0) {
    const p = document.createElement('p');
    p.textContent = uiText[appState.language].noPrompts;
    list.appendChild(p);
    return;
  }
  for (const [idx, p] of prompts.entries()) {
    const item = document.createElement('div');
    item.className =
      'col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg relative';

    const textWrap = document.createElement('div');
    textWrap.className = 'relative pr-6';

    const textContainer = document.createElement('div');
    textContainer.className = 'prompt-text-box overflow-hidden max-h-40';

    const text = document.createElement('p');
    setSanitizedHTML(text, linkify(p.text));
    textContainer.appendChild(text);
    textWrap.appendChild(textContainer);

    const showMore = document.createElement('span');
    showMore.className = 'text-blue-200 text-xs underline cursor-pointer';
    showMore.textContent = uiText[appState.language].showMore;
    const toggleText = () => {
      textContainer.classList.toggle('overflow-hidden');
      textContainer.classList.toggle('max-h-40');
      showMore.textContent = textContainer.classList.contains('overflow-hidden')
        ? uiText[appState.language].showMore
        : uiText[appState.language].showLess;
    };
    showMore.addEventListener('click', toggleText);
    requestAnimationFrame(() => {
      if (textContainer.scrollHeight > textContainer.offsetHeight) {
        textWrap.appendChild(showMore);
      }
    });

    const copyBtn = document.createElement('button');
    copyBtn.className =
      'history-copy absolute top-0 right-0 p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[appState.language].copyButtonTitle;
    copyBtn.setAttribute(
      'aria-label',
      uiText[appState.language].copyButtonTitle,
    );
    copyBtn.innerHTML =
      '<i data-lucide="copy" class="w-2 h-2" aria-hidden="true"></i>';
    textWrap.appendChild(copyBtn);

    const copyFeedback = document.createElement('span');
    copyFeedback.className =
      'absolute -top-3 right-0 text-green-400 text-xs hidden';
    copyFeedback.textContent = uiText[appState.language].copyFeedback;
    textWrap.appendChild(copyFeedback);

    const nameEl = document.createElement('p');
    nameEl.className = 'text-blue-200 text-xs mt-1';
    nameEl.textContent = currentUserName;

    const catEl = document.createElement('p');
    catEl.className = 'text-blue-200 text-xs';
    catEl.textContent =
      categories.find((c) => c.id === p.category)?.name[appState.language] ||
      p.category ||
      'random';

    const likeRow = document.createElement('div');
    likeRow.className = 'flex items-center gap-2 mt-2';
    const likeBtn = document.createElement('button');
    likeBtn.className =
      'like-btn p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    likeBtn.innerHTML =
      '<i data-lucide="heart" class="w-4 h-4" aria-hidden="true"></i>';

    let likes = p.likes || 0;
    const likeCount = document.createElement('span');
    likeCount.className = 'text-xs';
    const updateLikeText = () => {
      likeCount.textContent = likes.toString();
    };
    updateLikeText();

    const likeContainer = document.createElement('div');
    likeContainer.className = 'flex items-center gap-1';
    likeContainer.appendChild(likeBtn);
    likeContainer.appendChild(likeCount);

    const liked =
      appState.currentUser &&
      p.likedBy &&
      p.likedBy.includes(appState.currentUser.uid);
    if (liked) {
      likeBtn.classList.add('active');
    }

    const updateLikeIcon = () => {
      const svg = likeBtn.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          likeBtn.classList.contains('active') ? 'currentColor' : 'none',
        );
    };

    likeBtn.addEventListener('click', async () => {
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequired);
        return;
      }
      likeBtn.disabled = true;
      const already = likeBtn.classList.contains('active');
      try {
        if (already) {
          await unlikePrompt(p.id, appState.currentUser.uid);
          likes -= 1;
          updateLikeText();
          appState.likedPrompts = appState.likedPrompts.filter(
            (id) => id !== p.id,
          );
          likeBtn.classList.remove('active');
        } else {
          await likePrompt(p.id, appState.currentUser.uid);
          likes += 1;
          updateLikeText();
          appState.likedPrompts.push(p.id);
          likeBtn.classList.add('active');
        }
        localStorage.setItem(
          'likedPrompts',
          JSON.stringify(appState.likedPrompts),
        );
        updateLikeIcon();
      } catch (err) {
        console.error('Failed to toggle like:', err);
      } finally {
        likeBtn.disabled = false;
      }
    });

    updateLikeIcon();

    const editBtn = document.createElement('button');
    editBtn.className =
      'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    editBtn.innerHTML =
      '<i data-lucide="pencil" class="w-4 h-4" aria-hidden="true"></i>';

    const shareBtn = document.createElement('button');
    shareBtn.className =
      'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    shareBtn.title = 'Share on Twitter';
    shareBtn.setAttribute('aria-label', 'Share on Twitter');
    shareBtn.innerHTML =
      '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';

    const delBtn = document.createElement('button');
    delBtn.className =
      'history-delete p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    delBtn.innerHTML =
      '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';

    let editing = false;

    const showEdit = () => {
      if (editing) return;
      if (!textWrap.isConnected || !text.isConnected || !textWrap.contains(text))
        return;
      editing = true;
      const textarea = document.createElement('textarea');
      textarea.className = 'w-full p-2 rounded-md bg-black/30';
      textarea.value = p.text;
      if (!textWrap.isConnected || !text.isConnected || !textWrap.contains(text))
        return;
      if (text.parentNode) text.parentNode.replaceChild(textarea, text);

      const editRow = document.createElement('div');
      editRow.className = 'flex items-center gap-2 mt-2';
      const saveEdit = document.createElement('button');
      saveEdit.className =
        'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      saveEdit.innerHTML =
        '<i data-lucide="save" class="w-4 h-4" aria-hidden="true"></i>';
      const cancelEdit = document.createElement('button');
      cancelEdit.className =
        'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      cancelEdit.innerHTML =
        '<i data-lucide="x" class="w-4 h-4" aria-hidden="true"></i>';
      editRow.appendChild(saveEdit);
      editRow.appendChild(cancelEdit);

      if (!item.contains(likeRow)) return;
      item.replaceChild(editRow, likeRow);
      // refresh icons for the new buttons
      window.lucide?.createIcons();

      cancelEdit.addEventListener('click', () => {
        if (textarea.parentNode) textarea.parentNode.replaceChild(text, textarea);
        if (item.contains(editRow)) item.replaceChild(likeRow, editRow);
        editing = false;
      });

      saveEdit.addEventListener('click', async () => {
        saveEdit.disabled = true;
        try {
          await updatePromptText(p.id, textarea.value);
          p.text = textarea.value;
          text.textContent = textarea.value;
          cancelEdit.click();
        } catch (err) {
          console.error('Failed to update text:', err);
          saveEdit.disabled = false;
        }
      });
    };

    const startEdit = () => {
      if (editing) return;
      if (appState.currentUser && p.userId === appState.currentUser.uid) {
        showEdit();
      } else {
        alert(uiText[appState.language].loginRequired);
      }
    };

    text.addEventListener('click', startEdit);

    editBtn.addEventListener('click', startEdit);

    copyBtn.addEventListener('click', () => {
      navigator.clipboard
        .writeText(text.textContent || '')
        .then(() => {
          copyFeedback.classList.remove('hidden');
          setTimeout(() => copyFeedback.classList.add('hidden'), 1000);
        })
        .catch((err) => {
          console.error('Failed to copy text:', err);
        });
    });

    const siteShareBtn = document.createElement('button');
    siteShareBtn.className =
      'history-site-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 active';
    siteShareBtn.title = 'Unshare from Prompter';
    siteShareBtn.setAttribute('aria-label', 'Unshare from Prompter');
    siteShareBtn.innerHTML =
      '<i data-lucide="share-2" class="w-3 h-3" aria-hidden="true"></i>';

    const updateSiteShareIcon = () => {
      const svg = siteShareBtn.querySelector('svg');
      if (svg) {
        svg.setAttribute(
          'fill',
          siteShareBtn.classList.contains('active') ? 'currentColor' : 'none',
        );
        svg.setAttribute('stroke', 'currentColor');
      }
    };
    updateSiteShareIcon();

    siteShareBtn.addEventListener('click', async () => {
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequiredShare);
        return;
      }
      siteShareBtn.disabled = true;
      try {
        await unsharePrompt(p.id, appState.currentUser.uid);
        prompts.splice(idx, 1);
        renderSharedPrompts(prompts);
      } catch (err) {
        console.error('Failed to unshare:', err);
      } finally {
        siteShareBtn.disabled = false;
      }
    });

    const updateShareIcon2 = () => {
      const svg = shareBtn.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          shareBtn.classList.contains('active') ? 'currentColor' : 'none',
        );
    };
    updateShareIcon2();
    shareBtn.addEventListener('click', () => {
      shareBtn.classList.toggle('active');
      updateShareIcon2();
      sharePrompt(
        text.textContent || '',
        'https://twitter.com/intent/tweet?text=',
      );
      incrementShareCount(p.id);
    });

    delBtn.addEventListener('click', async () => {
      delBtn.disabled = true;
      try {
        await unsharePrompt(p.id, appState.currentUser.uid);
        prompts.splice(idx, 1);
        await renderSharedPrompts(prompts);
      } catch (err) {
        console.error('Failed to delete:', err);
        delBtn.disabled = false;
      }
    });

    const commentToggleBtn = document.createElement('button');
    commentToggleBtn.className =
      'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    commentToggleBtn.innerHTML =
      '<i data-lucide="message-circle" class="w-4 h-4" aria-hidden="true"></i>';

    const commentsWrap = document.createElement('div');
    commentsWrap.className = 'mt-2 space-y-1 hidden';
    const commentList = document.createElement('div');
    commentsWrap.appendChild(commentList);
    const commentForm = document.createElement('form');
    commentForm.className = 'flex items-center gap-2 mt-1';
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';
    commentInput.className = 'flex-1 p-1 rounded-md bg-black/30';
    const commentBtn = document.createElement('button');
    commentBtn.type = 'submit';
    commentBtn.className =
      'px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200';
    commentBtn.innerHTML =
      '<i data-lucide="send" class="w-4 h-4" aria-hidden="true"></i>';
    commentBtn.setAttribute('aria-label', 'Send comment');
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentBtn);
    commentsWrap.appendChild(commentForm);

    const refreshComments = async () => {
      const all = await getComments(p.id);
      commentList.innerHTML = '';
      commentNum = all.length;
      commentCount.textContent = commentNum.toString();
      for (const c of all) {
        await renderComment(c);
      }
    };

    const renderComment = async (c) => {
      const n = await fetchName(c.userId);
      const d = document.createElement('div');
      d.className =
        'bg-white/5 rounded-md px-2 py-1 text-sm flex items-start justify-between gap-2';

      const span = document.createElement('span');
      span.className = 'flex-1';
      span.innerHTML = sanitizeHTML(
        n
          ? `<a href="user.html?uid=${c.userId}" class="underline">${n}</a>: ${linkify(
              c.text,
            )}`
          : linkify(c.text),
      );
      d.appendChild(span);

      if (appState.currentUser && c.userId === appState.currentUser.uid) {
        const actions = document.createElement('div');
        actions.className = 'flex items-center gap-1';
        const editC = document.createElement('button');
        editC.className =
          'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
        editC.innerHTML =
          '<i data-lucide="pencil" class="w-3 h-3" aria-hidden="true"></i>';
        const delC = document.createElement('button');
        delC.className =
          'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
        delC.innerHTML =
          '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
        actions.appendChild(editC);
        actions.appendChild(delC);
        d.appendChild(actions);

        editC.addEventListener('click', () => {
          const textarea = document.createElement('textarea');
          textarea.className = 'w-full p-1 rounded-md bg-black/30';
          textarea.value = c.text;
          d.insertBefore(textarea, span);
          d.removeChild(span);

          const editRow = document.createElement('div');
          editRow.className = 'flex items-center gap-1';
          const saveBtn = document.createElement('button');
          saveBtn.className =
            'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
          saveBtn.innerHTML =
            '<i data-lucide="save" class="w-3 h-3" aria-hidden="true"></i>';
          const cancelBtn = document.createElement('button');
          cancelBtn.className =
            'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
          cancelBtn.innerHTML =
            '<i data-lucide="x" class="w-3 h-3" aria-hidden="true"></i>';
          editRow.appendChild(saveBtn);
          editRow.appendChild(cancelBtn);
          d.replaceChild(editRow, actions);

          cancelBtn.addEventListener('click', () => {
            d.replaceChild(span, textarea);
            d.replaceChild(actions, editRow);
          });

          saveBtn.addEventListener('click', async () => {
            saveBtn.disabled = true;
            try {
              await updateComment(p.id, c.id, textarea.value);
              await refreshComments();
            } catch (err) {
              console.error('Failed to update comment:', err);
              saveBtn.disabled = false;
            }
          });
        });

        delC.addEventListener('click', async () => {
          delC.disabled = true;
          try {
            await deleteComment(p.id, c.id);
            await refreshComments();
          } catch (err) {
            console.error('Failed to delete comment:', err);
            delC.disabled = false;
          }
        });
      }

      commentList.appendChild(d);
      window.lucide?.createIcons();
    };

    const existingComments = await getComments(p.id);
    let commentNum = existingComments.length;
    const commentCount = document.createElement('span');
    commentCount.className = 'text-xs';
    commentCount.textContent = commentNum.toString();

    const commentContainer = document.createElement('div');
    commentContainer.className = 'flex items-center gap-1';
    commentContainer.appendChild(commentToggleBtn);
    commentContainer.appendChild(commentCount);

    for (const c of existingComments) {
      await renderComment(c);
    }

    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequired);
        return;
      }
      const textVal = commentInput.value.trim();
      if (!textVal) return;
      commentBtn.disabled = true;
      try {
        await addComment(p.id, appState.currentUser.uid, textVal);
        await refreshComments();
        commentInput.value = '';
      } finally {
        commentBtn.disabled = false;
      }
    });

    commentToggleBtn.addEventListener('click', () => {
      commentsWrap.classList.toggle('hidden');
    });

    likeRow.appendChild(editBtn);
    if (appState.currentUser && p.userId === appState.currentUser.uid) {
      likeRow.appendChild(siteShareBtn);
      likeRow.appendChild(delBtn);
    } else {
      editBtn.disabled = true;
    }
    likeRow.appendChild(shareBtn);
    likeRow.appendChild(likeContainer);
    likeRow.appendChild(commentContainer);

    item.appendChild(textWrap);
    item.appendChild(nameEl);
    item.appendChild(catEl);
    item.appendChild(likeRow);
    item.appendChild(commentsWrap);
    list.appendChild(item);
  }
  window.lucide?.createIcons();
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

  nameWrapper = document.getElementById('user-name-wrapper');
  nameEditRow = document.getElementById('name-edit-row');
  nameInput = document.getElementById('name-input');
  nameUpdateBtn = document.getElementById('name-update-btn');
  editNameBtn = document.getElementById('edit-name-btn');
  usernameLabel = document.getElementById('username-label');
  if (usernameLabel) {
    usernameLabel.style.display = currentUserName ? 'none' : '';
  }
  bioWrapper = document.getElementById('bio-wrapper');
  bioEditRow = document.getElementById('bio-edit-row');
  bioInput = document.getElementById('bio-input');
  bioUpdateBtn = document.getElementById('bio-update-btn');
  editBioHint = document.getElementById('edit-bio-hint');
  const followersLink = document.getElementById('stat-followers');
  const followingLink = document.getElementById('stat-following');
  const followersList = document.getElementById('followers-list');
  const followingList = document.getElementById('following-list');

  const showList = async (ids, container) => {
    if (!container) return;
    container.innerHTML = '';
    if (ids.length === 0) {
      container.classList.toggle('hidden', false);
      return;
    }
    const names = await Promise.all(
      ids.map((id) => getUserProfile(id).then((p) => p?.name || id)),
    );
    ids.forEach((id, idx) => {
      const a = document.createElement('a');
      a.href = `user.html?uid=${id}`;
      a.className = 'block underline';
      a.textContent = names[idx];
      container.appendChild(a);
    });
    container.classList.toggle('hidden', false);
  };

  const showNameEdit = () => {
    if (!nameWrapper || !nameEditRow || !nameInput) return;
    nameInput.value = currentUserName;
    nameWrapper.classList.add('hidden');
    nameEditRow.classList.remove('hidden');
    nameInput.focus();
  };

  followersLink?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!followersList) return;
    if (!followersList.classList.contains('hidden')) {
      followersList.classList.add('hidden');
      followingList?.classList.add('hidden');
      return;
    }
    showList(followerIds, followersList);
    followingList?.classList.add('hidden');
  });

  followingLink?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!followingList) return;
    if (!followingList.classList.contains('hidden')) {
      followingList.classList.add('hidden');
      followersList?.classList.add('hidden');
      return;
    }
    showList(followingIds, followingList);
    followersList?.classList.add('hidden');
  });

  nameWrapper?.addEventListener('click', showNameEdit);
  editNameBtn?.addEventListener('click', showNameEdit);

  nameUpdateBtn?.addEventListener('click', async () => {
    if (!nameInput || !appState.currentUser) return;
    const newName = nameInput.value.trim();
    if (!newName) return;
    nameUpdateBtn.disabled = true;
    try {
      await setUserProfile(appState.currentUser.uid, { name: newName });
      currentUserName = newName;
      const nameEl = document.getElementById('user-name');
      if (nameEl) nameEl.textContent = currentUserName;
      if (usernameLabel)
        usernameLabel.style.display = currentUserName ? 'none' : '';
      nameEditRow?.classList.add('hidden');
      nameWrapper?.classList.remove('hidden');
      renderSharedPrompts(sharedPromptsData);
    } catch (err) {
      console.error('Failed to update name:', err);
    } finally {
      nameUpdateBtn.disabled = false;
    }
  });

  bioWrapper?.addEventListener('click', () => {
    if (!bioWrapper || !bioEditRow || !bioInput) return;
    bioInput.value = currentUserBio;
    bioWrapper.classList.add('hidden');
    editBioHint?.classList.add('hidden');
    bioEditRow.classList.remove('hidden');
    bioInput.focus();
    window.lucide?.createIcons();
  });

  bioUpdateBtn?.addEventListener('click', async () => {
    if (!bioInput || !appState.currentUser) return;
    const newBio = bioInput.value.trim();
    bioUpdateBtn.disabled = true;
    try {
      await setUserProfile(appState.currentUser.uid, { bio: newBio });
      currentUserBio = newBio;
      const bioEl = document.getElementById('user-bio');
      if (bioEl) bioEl.textContent = currentUserBio;
      bioEditRow?.classList.add('hidden');
      bioWrapper?.classList.remove('hidden');
      editBioHint?.classList.remove('hidden');
    } catch (err) {
      console.error('Failed to update bio:', err);
    } finally {
      bioUpdateBtn.disabled = false;
    }
  });

  notificationBtn = document.getElementById('notifications-btn');
  notificationCountEl = document.getElementById('notification-count');
  notificationsPanel = document.getElementById('notifications-panel');

  notificationBtn?.addEventListener('click', () => {
    const wasHidden = notificationsPanel?.classList.contains('hidden');
    notificationsPanel?.classList.toggle('hidden');
    if (wasHidden) markAllNotificationsRead();
  });

  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);

  const currentTheme = localStorage.getItem('theme') || THEMES.DARK;
  setTheme(currentTheme);

  themeLightButton?.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton?.addEventListener('click', () => setTheme(THEMES.DARK));
  document.getElementById('logout')?.addEventListener('click', logout);

  window.addEventListener('storage', async (e) => {
    if (e.key === 'savedPrompts') {
      try {
        const saved = e.newValue ? JSON.parse(e.newValue) : [];
        appState.savedPrompts = saved;
        renderSavedPrompts(saved);
        if (appState.currentUser) {
          loadPromptsForUser(appState.currentUser);
        }
      } catch (err) {
        console.error('Failed to parse savedPrompts from storage event:', err);
      }
    }
  });

  onAuth(async (user) => {
    const logoutBtn = document.getElementById('logout');
    const header = logoutBtn?.parentElement;
    let loginBtn = document.getElementById('login-btn');
    if (!user) {
      logoutBtn?.classList.add('hidden');
      if (!loginBtn) {
        loginBtn = document.createElement('a');
        loginBtn.id = 'login-btn';
        loginBtn.href = 'login.html';
        loginBtn.className =
          'mt-2 bg-white/20 hover:bg-white/30 p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center gap-1';
        loginBtn.innerHTML =
          '<i data-lucide="log-in" class="w-4 h-4" aria-hidden="true"></i><span>Login</span>';
        header?.appendChild(loginBtn);
        window.lucide?.createIcons();
      }
      document.getElementById('user-email').textContent = '';
      const nameEl = document.getElementById('user-name');
      if (nameEl) nameEl.textContent = '';
      if (usernameLabel) usernameLabel.style.display = '';
      currentUserName = '';
      if (nameInput) nameInput.value = '';
      const bioEl = document.getElementById('user-bio');
      if (bioEl) bioEl.textContent = '';
      if (bioInput) bioInput.value = '';
      bioEditRow?.classList.add('hidden');
      bioWrapper?.classList.remove('hidden');
      editBioHint?.classList.remove('hidden');
      nameEditRow?.classList.add('hidden');
      nameWrapper?.classList.remove('hidden');
      notifications = [];
      renderNotifications();
      unsubscribeNotifications?.();
      unsubscribePrompts?.();
      return;
    }
    loginBtn?.remove();
    logoutBtn?.classList.remove('hidden');
    document.getElementById('user-email').textContent = user.email || '';
    initNotifications(user.uid);
    try {
      const profile = await getUserProfile(user.uid);
      const name =
        profile && typeof profile.name === 'string' ? profile.name.trim() : '';
      if (!name) {
        console.warn(
          'User profile is missing a name. Check registration logic.',
        );
      }
      currentUserName = name;
      const nameEl = document.getElementById('user-name');
      if (nameEl) nameEl.textContent = currentUserName;
      if (usernameLabel)
        usernameLabel.style.display = currentUserName ? 'none' : '';
      if (nameInput) nameInput.value = currentUserName;
      nameEditRow?.classList.add('hidden');
      nameWrapper?.classList.remove('hidden');
      const bio = profile && typeof profile.bio === 'string' ? profile.bio : '';
      currentUserBio = bio;
      const bioEl = document.getElementById('user-bio');
      if (bioEl) bioEl.textContent = currentUserBio;
      if (bioInput) bioInput.value = currentUserBio;
      bioEditRow?.classList.add('hidden');
      bioWrapper?.classList.remove('hidden');
      editBioHint?.classList.remove('hidden');
      followingIds = await getFollowingIds(user.uid);
      followerIds = await getFollowerIds(user.uid);
      updateCount('stat-following', followingIds.length);
      updateCount('stat-followers', followerIds.length);
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
    await loadPromptsForUser(user);
    window.lucide?.createIcons();
    document.querySelectorAll('#shared-list .like-btn').forEach((b) => {
      const svg = b.querySelector('svg');
      if (svg && b.classList.contains('active')) {
        svg.setAttribute('fill', 'currentColor');
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.firebaseInitPromise) window.firebaseInitPromise.then(init);
  else init();
});
