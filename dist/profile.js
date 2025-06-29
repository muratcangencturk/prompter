"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _auth = require("./auth.js");
var _prompt = require("./prompt.js");
var _user = require("./user.js");
var _notifications = require("./notifications.js");
var _state = require("./state.js");
var _prompts = require("./prompts.js");
var _config = require("./config.js");
var _linkify = require("./linkify.js");
var _sanitize = require("./sanitize.js");
var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js");
var _firebase = require("./firebase.js");
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var uiText = {
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
    showLess: 'Show less'
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
    langHiLabel: "Hint\xE7e'ye ge\xE7",
    appLogoAlt: 'Prompter logosu',
    copyButtonTitle: 'Panoya kopyala',
    copyFeedback: 'Kopyalandı!',
    loginRequired: 'Giriş gerekli',
    loginRequiredShare: 'Paylaşmak için giriş yapın',
    copyFailed: 'Prompt kopyalanamadı. Lütfen tekrar deneyin.',
    shareFailed: 'Prompt paylaşılamadı. Lütfen tekrar deneyin.',
    showMore: 'Daha fazlası',
    showLess: 'Daha az'
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
    shareFailed: 'No se pudo compartir el prompt. Por favor inténtalo de nuevo.',
    showMore: 'Show more',
    showLess: 'Show less'
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
    showLess: 'Show less'
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
    showLess: 'Show less'
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
    showLess: 'Show less'
  }
};
var themeLightButton;
var themeDarkButton;
var themeLinkElement;
var themeVersion = '';
var langEnButton;
var langTrButton;
var langEsButton;
var langFrButton;
var langZhButton;
var langHiButton;
var currentLangLabel;
var sharedPromptsData = [];
var unsubscribePrompts = null;
var CACHE_LIMIT = 50;
var currentUserName = '';
var currentUserBio = '';
var nameWrapper;
var nameEditRow;
var nameInput;
var nameUpdateBtn;
var editNameBtn;
var usernameLabel;
var bioWrapper;
var bioEditRow;
var bioInput;
var bioUpdateBtn;
var editBioHint;
var notificationBtn;
var notificationCountEl;
var notificationsPanel;
var notifications = [];
var unsubscribeNotifications;
var followerIds = [];
var followingIds = [];
var profileCache = {};
var fetchName = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(uid) {
    var prof, display;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!profileCache[uid]) {
            _context.n = 1;
            break;
          }
          return _context.a(2, profileCache[uid]);
        case 1:
          _context.n = 2;
          return (0, _user.getUserProfile)(uid);
        case 2:
          prof = _context.v;
          display = (prof === null || prof === void 0 ? void 0 : prof.name) || 'Unknown User';
          if (prof !== null && prof !== void 0 && prof.email) {
            display += " (".concat(prof.email, ")");
          }
          display = (0, _sanitize.sanitizeHTML)(display);
          profileCache[uid] = display;
          return _context.a(2, display);
      }
    }, _callee);
  }));
  return function fetchName(_x) {
    return _ref.apply(this, arguments);
  };
}();
var setTheme = function setTheme(theme) {
  _state.appState.theme = theme;
  if (themeLinkElement) {
    var versionSuffix = themeVersion ? "?".concat(themeVersion) : '';
    themeLinkElement.href = "css/theme-".concat(theme, ".css").concat(versionSuffix);
  }
  localStorage.setItem('theme', theme);
  updateTexts();
};
var setLanguage = function setLanguage(lang) {
  _state.appState.language = lang;
  document.documentElement.lang = lang;
  updateTexts();
  _renderSavedPrompts(_state.appState.savedPrompts);
  _renderSharedPrompts(sharedPromptsData);
  localStorage.setItem('language', lang);
};
var updateTexts = function updateTexts() {
  if (themeLightButton) {
    themeLightButton.title = uiText[_state.appState.language].themeLightTitle;
    themeLightButton.setAttribute('aria-label', uiText[_state.appState.language].themeLightTitle);
  }
  if (themeDarkButton) {
    themeDarkButton.title = uiText[_state.appState.language].themeDarkTitle;
    themeDarkButton.setAttribute('aria-label', uiText[_state.appState.language].themeDarkTitle);
  }
  var backLink = document.getElementById('back-link');
  if (backLink) {
    backLink.title = uiText[_state.appState.language].back;
    backLink.setAttribute('aria-label', uiText[_state.appState.language].back);
  }
  var pageTitle = document.getElementById('page-title');
  if (pageTitle) pageTitle.textContent = uiText[_state.appState.language].profile;
  var logo = document.getElementById('app-logo');
  if (logo) logo.alt = uiText[_state.appState.language].appLogoAlt;
  var logoutSpan = document.querySelector('#logout span');
  if (logoutSpan) logoutSpan.textContent = uiText[_state.appState.language].logout;
  var savedTitle = document.getElementById('saved-title-text');
  if (savedTitle) savedTitle.textContent = uiText[_state.appState.language].savedPrompts;
  var sharedTitle = document.getElementById('shared-title-text');
  if (sharedTitle) sharedTitle.textContent = uiText[_state.appState.language].sharedPrompts;
  if (langEnButton) {
    langEnButton.title = uiText[_state.appState.language].langEnLabel;
    langEnButton.setAttribute('aria-label', uiText[_state.appState.language].langEnLabel);
  }
  if (langTrButton) {
    langTrButton.title = uiText[_state.appState.language].langTrLabel;
    langTrButton.setAttribute('aria-label', uiText[_state.appState.language].langTrLabel);
  }
  if (langEsButton) {
    langEsButton.title = uiText[_state.appState.language].langEsLabel;
    langEsButton.setAttribute('aria-label', uiText[_state.appState.language].langEsLabel);
  }
  if (langFrButton) {
    langFrButton.title = uiText[_state.appState.language].langFrLabel;
    langFrButton.setAttribute('aria-label', uiText[_state.appState.language].langFrLabel);
  }
  if (langZhButton) {
    langZhButton.title = uiText[_state.appState.language].langZhLabel;
    langZhButton.setAttribute('aria-label', uiText[_state.appState.language].langZhLabel);
  }
  if (langHiButton) {
    langHiButton.title = uiText[_state.appState.language].langHiLabel;
    langHiButton.setAttribute('aria-label', uiText[_state.appState.language].langHiLabel);
  }
  if (currentLangLabel) {
    var arrow = currentLangLabel.querySelector('svg');
    currentLangLabel.textContent = _state.appState.language.toUpperCase();
    if (arrow) currentLangLabel.appendChild(arrow);
  }
};
var updateCount = function updateCount(id, count) {
  var el = document.getElementById(id);
  if (el) el.textContent = count.toString();
};
var updateStats = function updateStats(prompts) {
  var totals = {
    prompts: prompts.length,
    likes: 0,
    comments: 0,
    saves: 0,
    shares: 0
  };
  prompts.forEach(function (p) {
    totals.likes += p.likes || (Array.isArray(p.likedBy) ? p.likedBy.length : 0);
    totals.comments += p.commentCount || 0;
    totals.saves += p.saveCount || 0;
    totals.shares += p.shareCount || (Array.isArray(p.sharedBy) ? p.sharedBy.length : 0);
  });
  updateCount('stat-prompts', totals.prompts);
  updateCount('stat-likes', totals.likes);
  updateCount('stat-comments', totals.comments);
  updateCount('stat-saves', totals.saves);
  updateCount('stat-shares', totals.shares);
};
var _renderNotifications = function renderNotifications() {
  if (!notificationCountEl || !notificationsPanel) return;
  var unread = notifications.filter(function (n) {
    return !n.read;
  });
  if (unread.length) {
    notificationCountEl.textContent = unread.length.toString();
    notificationCountEl.classList.remove('hidden');
  } else {
    notificationCountEl.classList.add('hidden');
  }
  notificationsPanel.innerHTML = '';
  notifications.forEach(function (n) {
    var link = document.createElement('a');
    var msg = '';
    if (n.type === 'like') msg = 'Your prompt received a like.';else if (n.type === 'comment') msg = 'New comment on your prompt.';else if (n.type === 'share') msg = 'Your prompt was shared.';else msg = 'New activity on your prompt.';
    link.textContent = msg;
    link.href = n.promptId ? "social.html#".concat(n.promptId) : 'social.html';
    link.className = 'block p-1 border-b border-white/20 last:border-b-0 hover:bg-white/10';
    link.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (!_state.appState.currentUser) {
              _context2.n = 4;
              break;
            }
            _context2.p = 1;
            _context2.n = 2;
            return (0, _notifications.markNotificationRead)(_state.appState.currentUser.uid, n.id);
          case 2:
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t = _context2.v;
            console.error('Failed to mark notification read:', _t);
          case 4:
            n.read = true;
            _renderNotifications();
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3]]);
    })));
    notificationsPanel.appendChild(link);
  });
};
var initNotifications = function initNotifications(uid) {
  var _unsubscribeNotificat;
  (_unsubscribeNotificat = unsubscribeNotifications) === null || _unsubscribeNotificat === void 0 || _unsubscribeNotificat();
  unsubscribeNotifications = (0, _notifications.listenNotifications)(uid, function (data) {
    notifications = data;
    _renderNotifications();
  });
};
var markAllNotificationsRead = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var unread;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (_state.appState.currentUser) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          unread = notifications.filter(function (n) {
            return !n.read;
          });
          if (unread.length) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2);
        case 2:
          _context3.n = 3;
          return Promise.all(unread.map(function (n) {
            return (0, _notifications.markNotificationRead)(_state.appState.currentUser.uid, n.id)["catch"](function (err) {
              console.error('Failed to mark notification read:', err);
            });
          }));
        case 3:
          unread.forEach(function (n) {
            n.read = true;
          });
          _renderNotifications();
        case 4:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function markAllNotificationsRead() {
    return _ref3.apply(this, arguments);
  };
}();
var sharePrompt = function sharePrompt(prompt, baseUrl) {
  if (!prompt) return;
  var link = " ".concat(_config.BASE_URL);
  var url = "".concat(baseUrl).concat(encodeURIComponent("".concat(prompt).concat(link)));
  window.open(url, '_blank');
};
var LOAD_ERROR_MESSAGE = 'Could not load prompts. Please check your connection.';
var showLoadError = function showLoadError(listId, retryFn) {
  var list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = '';
  var p = document.createElement('p');
  p.className = 'text-center text-blue-200 text-sm';
  p.textContent = LOAD_ERROR_MESSAGE;
  list.appendChild(p);
  if (retryFn) {
    var btn = document.createElement('button');
    btn.textContent = 'Retry';
    btn.className = 'block mx-auto underline mt-2 text-blue-200';
    btn.addEventListener('click', retryFn);
    list.appendChild(btn);
  }
};
var showSavedLoadError = function showSavedLoadError(retryFn) {
  return showLoadError('saved-list', retryFn);
};
var showSharedLoadError = function showSharedLoadError(retryFn) {
  return showLoadError('shared-list', retryFn);
};
var _loadPromptsForUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(user) {
    var cacheKey, cached, q, savedDocs, savedTexts, merged, _t2;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          if (user) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2);
        case 1:
          cacheKey = "profileCache_".concat(user.uid);
          try {
            cached = localStorage.getItem(cacheKey);
            if (cached) {
              sharedPromptsData = JSON.parse(cached);
              _renderSharedPrompts(sharedPromptsData);
            }
          } catch (err) {
            console.warn('Failed to parse profile cache:', err);
          }
          if (unsubscribePrompts) unsubscribePrompts();
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, 'prompts'), (0, _firebaseFirestore.where)('userId', '==', user.uid), (0, _firebaseFirestore.where)('sharedBy', 'array-contains', user.uid), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'));
          unsubscribePrompts = (0, _firebaseFirestore.onSnapshot)(q, function (snap) {
            var prompts = snap.docs.map(function (d) {
              return _objectSpread({
                id: d.id,
                category: d.get('category') || 'random'
              }, d.data());
            });
            sharedPromptsData = prompts;
            _renderSharedPrompts(sharedPromptsData);
            try {
              localStorage.setItem(cacheKey, JSON.stringify(prompts.slice(0, CACHE_LIMIT)));
            } catch (err) {
              console.warn('Failed to store profile cache:', err);
            }
          }, function (err) {
            console.error('Failed to load prompts:', err);
            showSharedLoadError(function () {
              return _loadPromptsForUser(user);
            });
          });
          _context4.p = 2;
          _context4.n = 3;
          return (0, _prompt.getUserSavedPrompts)(user.uid);
        case 3:
          savedDocs = _context4.v;
          savedTexts = savedDocs.map(function (p) {
            return p.text;
          });
          merged = Array.from(new Set([].concat(_toConsumableArray(_state.appState.savedPrompts), _toConsumableArray(savedTexts))));
          _state.appState.savedPrompts = merged;
          localStorage.setItem('savedPrompts', JSON.stringify(merged));
          _renderSavedPrompts(_state.appState.savedPrompts);
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t2 = _context4.v;
          console.error('Failed to load prompts:', _t2);
          showSavedLoadError(function () {
            return _loadPromptsForUser(user);
          });
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[2, 4]]);
  }));
  return function loadPromptsForUser(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
var _renderSavedPrompts = function renderSavedPrompts(prompts) {
  var _window$lucide2;
  var list = document.getElementById('saved-list');
  list.innerHTML = '';
  updateCount('saved-count', prompts.length);
  if (!prompts || prompts.length === 0) {
    var p = document.createElement('p');
    p.textContent = uiText[_state.appState.language].noPrompts;
    list.appendChild(p);
    return;
  }
  prompts.forEach(function (text, idx) {
    var item = document.createElement('div');
    item.className = 'col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg relative';
    var textWrap = document.createElement('div');
    textWrap.className = 'relative pr-6';
    var textContainer = document.createElement('div');
    textContainer.className = 'prompt-text-box overflow-hidden max-h-40';
    var pEl = document.createElement('p');
    (0, _sanitize.setSanitizedHTML)(pEl, (0, _linkify.linkify)(text));
    textContainer.appendChild(pEl);
    textWrap.appendChild(textContainer);
    var showMore = document.createElement('span');
    showMore.className = 'text-blue-200 text-xs underline cursor-pointer';
    showMore.textContent = uiText[_state.appState.language].showMore;
    var toggleText = function toggleText() {
      textContainer.classList.toggle('overflow-hidden');
      textContainer.classList.toggle('max-h-40');
      showMore.textContent = textContainer.classList.contains('overflow-hidden') ? uiText[_state.appState.language].showMore : uiText[_state.appState.language].showLess;
    };
    showMore.addEventListener('click', toggleText);
    requestAnimationFrame(function () {
      if (textContainer.scrollHeight > textContainer.offsetHeight) {
        textWrap.appendChild(showMore);
      }
    });
    var copyBtn = document.createElement('button');
    copyBtn.className = 'history-copy absolute top-0 right-0 p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[_state.appState.language].copyButtonTitle;
    copyBtn.setAttribute('aria-label', uiText[_state.appState.language].copyButtonTitle);
    copyBtn.innerHTML = '<i data-lucide="copy" class="w-2 h-2" aria-hidden="true"></i>';
    textWrap.appendChild(copyBtn);
    var copyFeedback = document.createElement('span');
    copyFeedback.className = 'absolute -top-3 right-0 text-green-400 text-xs hidden';
    copyFeedback.textContent = uiText[_state.appState.language].copyFeedback;
    textWrap.appendChild(copyFeedback);
    var actions = document.createElement('div');
    actions.className = 'flex items-center gap-2 mt-2';
    var editBtn = document.createElement('button');
    editBtn.className = 'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    editBtn.innerHTML = '<i data-lucide="pencil" class="w-4 h-4" aria-hidden="true"></i>';
    if (!_state.appState.currentUser) {
      editBtn.disabled = true;
    }
    var editing = false;
    var startEdit = function startEdit() {
      var _window$lucide;
      if (editing) return;
      if (!_state.appState.currentUser) {
        alert(uiText[_state.appState.language].loginRequired);
        return;
      }
      if (!textWrap.contains(pEl)) return;
      editing = true;
      var textarea = document.createElement('textarea');
      textarea.className = 'w-full p-2 rounded-md bg-black/30';
      textarea.value = pEl.textContent;
      textWrap.replaceChild(textarea, pEl);
      var editRow = document.createElement('div');
      editRow.className = 'flex items-center gap-2 mt-2';
      var saveEdit = document.createElement('button');
      saveEdit.className = 'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      saveEdit.innerHTML = '<i data-lucide="save" class="w-4 h-4" aria-hidden="true"></i>';
      var cancelEdit = document.createElement('button');
      cancelEdit.className = 'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      cancelEdit.innerHTML = '<i data-lucide="x" class="w-4 h-4" aria-hidden="true"></i>';
      editRow.appendChild(saveEdit);
      editRow.appendChild(cancelEdit);
      if (item.contains(actions)) item.replaceChild(editRow, actions);
      // refresh icons for the new buttons
      (_window$lucide = window.lucide) === null || _window$lucide === void 0 || _window$lucide.createIcons();
      cancelEdit.addEventListener('click', function () {
        if (textWrap.contains(textarea)) textWrap.replaceChild(pEl, textarea);
        if (item.contains(editRow)) item.replaceChild(actions, editRow);
        editing = false;
      });
      saveEdit.addEventListener('click', function () {
        prompts[idx] = textarea.value;
        localStorage.setItem('savedPrompts', JSON.stringify(prompts));
        pEl.textContent = textarea.value;
        cancelEdit.click();
      });
    };

    // allow direct click on the prompt text to start editing
    pEl.addEventListener('click', startEdit);
    editBtn.addEventListener('click', startEdit);
    var shareBtn = document.createElement('button');
    shareBtn.className = 'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    shareBtn.title = 'Share on Twitter';
    shareBtn.setAttribute('aria-label', 'Share on Twitter');
    shareBtn.innerHTML = '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';
    var siteShareBtn = document.createElement('button');
    siteShareBtn.className = 'history-site-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    siteShareBtn.title = 'Share on Prompter';
    siteShareBtn.setAttribute('aria-label', 'Share on Prompter');
    siteShareBtn.innerHTML = '<i data-lucide="share-2" class="w-3 h-3" aria-hidden="true"></i>';
    var delBtn = document.createElement('button');
    delBtn.className = 'history-delete p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    delBtn.innerHTML = '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(pEl.textContent || '').then(function () {
        copyFeedback.classList.remove('hidden');
        setTimeout(function () {
          return copyFeedback.classList.add('hidden');
        }, 1000);
      })["catch"](function (err) {
        console.error('Failed to copy text:', err);
      });
    });
    siteShareBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var svg, _t3;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            if (_state.appState.currentUser) {
              _context5.n = 1;
              break;
            }
            alert(uiText[_state.appState.language].loginRequiredShare);
            return _context5.a(2);
          case 1:
            siteShareBtn.classList.toggle('active');
            svg = siteShareBtn.querySelector('svg');
            if (svg) {
              svg.setAttribute('fill', siteShareBtn.classList.contains('active') ? 'currentColor' : 'none');
              svg.setAttribute('stroke', 'currentColor');
            }
            siteShareBtn.disabled = true;
            _context5.p = 2;
            _context5.n = 3;
            return (0, _prompt.savePrompt)(pEl.textContent || '', _state.appState.currentUser.uid, _state.appState.selectedCategory, _state.appState.currentUser.displayName || '', _state.appState.currentUser.email || '');
          case 3:
            _context5.n = 5;
            break;
          case 4:
            _context5.p = 4;
            _t3 = _context5.v;
            console.error(_t3);
            alert(uiText[_state.appState.language].shareFailed);
          case 5:
            _context5.p = 5;
            siteShareBtn.disabled = false;
            return _context5.f(5);
          case 6:
            return _context5.a(2);
        }
      }, _callee5, null, [[2, 4, 5, 6]]);
    })));
    var updateShareIcon = function updateShareIcon() {
      var svg = shareBtn.querySelector('svg');
      if (svg) svg.setAttribute('fill', shareBtn.classList.contains('active') ? 'currentColor' : 'none');
    };
    updateShareIcon();
    shareBtn.addEventListener('click', function () {
      shareBtn.classList.toggle('active');
      updateShareIcon();
      sharePrompt(pEl.textContent || '', 'https://twitter.com/intent/tweet?text=');
    });
    delBtn.addEventListener('click', function () {
      var wrapper = item;
      wrapper.classList.add('fade-out');
      setTimeout(function () {
        prompts.splice(idx, 1);
        localStorage.setItem('savedPrompts', JSON.stringify(prompts));
        _renderSavedPrompts(prompts);
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
  (_window$lucide2 = window.lucide) === null || _window$lucide2 === void 0 || _window$lucide2.createIcons();
};
var _renderSharedPrompts = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(prompts) {
    var _window$lucide3;
    var list, p, _iterator, _step, _loop, _t10;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          list = document.getElementById('shared-list');
          list.innerHTML = '';
          updateCount('shared-count', prompts.length);
          updateStats(prompts);
          if (!(!prompts || prompts.length === 0)) {
            _context14.n = 1;
            break;
          }
          p = document.createElement('p');
          p.textContent = uiText[_state.appState.language].noPrompts;
          list.appendChild(p);
          return _context14.a(2);
        case 1:
          _iterator = _createForOfIteratorHelper(prompts.entries());
          _context14.p = 2;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var _categories$find;
            var _step$value, idx, p, item, textWrap, textContainer, text, showMore, toggleText, copyBtn, copyFeedback, nameEl, catEl, likeRow, likeBtn, likes, likeCount, updateLikeText, likeContainer, liked, updateLikeIcon, editBtn, shareBtn, delBtn, editing, startEdit, showEdit, siteShareBtn, updateSiteShareIcon, updateShareIcon2, commentToggleBtn, commentsWrap, commentList, commentForm, commentInput, commentBtn, refreshComments, renderComment, existingComments, commentNum, commentCount, commentContainer, _iterator3, _step3, c, _t1;
            return _regenerator().w(function (_context13) {
              while (1) switch (_context13.n) {
                case 0:
                  _step$value = _slicedToArray(_step.value, 2), idx = _step$value[0], p = _step$value[1];
                  item = document.createElement('div');
                  item.className = 'col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg relative';
                  textWrap = document.createElement('div');
                  textWrap.className = 'relative pr-6';
                  textContainer = document.createElement('div');
                  textContainer.className = 'prompt-text-box overflow-hidden max-h-40';
                  text = document.createElement('p');
                  (0, _sanitize.setSanitizedHTML)(text, (0, _linkify.linkify)(p.text));
                  textContainer.appendChild(text);
                  textWrap.appendChild(textContainer);
                  showMore = document.createElement('span');
                  showMore.className = 'text-blue-200 text-xs underline cursor-pointer';
                  showMore.textContent = uiText[_state.appState.language].showMore;
                  toggleText = function toggleText() {
                    textContainer.classList.toggle('overflow-hidden');
                    textContainer.classList.toggle('max-h-40');
                    showMore.textContent = textContainer.classList.contains('overflow-hidden') ? uiText[_state.appState.language].showMore : uiText[_state.appState.language].showLess;
                  };
                  showMore.addEventListener('click', toggleText);
                  requestAnimationFrame(function () {
                    if (textContainer.scrollHeight > textContainer.offsetHeight) {
                      textWrap.appendChild(showMore);
                    }
                  });
                  copyBtn = document.createElement('button');
                  copyBtn.className = 'history-copy absolute top-0 right-0 p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                  copyBtn.title = uiText[_state.appState.language].copyButtonTitle;
                  copyBtn.setAttribute('aria-label', uiText[_state.appState.language].copyButtonTitle);
                  copyBtn.innerHTML = '<i data-lucide="copy" class="w-2 h-2" aria-hidden="true"></i>';
                  textWrap.appendChild(copyBtn);
                  copyFeedback = document.createElement('span');
                  copyFeedback.className = 'absolute -top-3 right-0 text-green-400 text-xs hidden';
                  copyFeedback.textContent = uiText[_state.appState.language].copyFeedback;
                  textWrap.appendChild(copyFeedback);
                  nameEl = document.createElement('p');
                  nameEl.className = 'text-blue-200 text-xs mt-1';
                  nameEl.textContent = currentUserName;
                  catEl = document.createElement('p');
                  catEl.className = 'text-blue-200 text-xs';
                  catEl.textContent = ((_categories$find = _prompts.categories.find(function (c) {
                    return c.id === p.category;
                  })) === null || _categories$find === void 0 ? void 0 : _categories$find.name[_state.appState.language]) || p.category || 'random';
                  likeRow = document.createElement('div');
                  likeRow.className = 'flex items-center gap-2 mt-2';
                  likeBtn = document.createElement('button');
                  likeBtn.className = 'like-btn p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                  likeBtn.innerHTML = '<i data-lucide="heart" class="w-4 h-4" aria-hidden="true"></i>';
                  likes = p.likes || 0;
                  likeCount = document.createElement('span');
                  likeCount.className = 'text-xs';
                  updateLikeText = function updateLikeText() {
                    likeCount.textContent = likes.toString();
                  };
                  updateLikeText();
                  likeContainer = document.createElement('div');
                  likeContainer.className = 'flex items-center gap-1';
                  likeContainer.appendChild(likeBtn);
                  likeContainer.appendChild(likeCount);
                  liked = _state.appState.currentUser && p.likedBy && p.likedBy.includes(_state.appState.currentUser.uid);
                  if (liked) {
                    likeBtn.classList.add('active');
                  }
                  updateLikeIcon = function updateLikeIcon() {
                    var svg = likeBtn.querySelector('svg');
                    if (svg) svg.setAttribute('fill', likeBtn.classList.contains('active') ? 'currentColor' : 'none');
                  };
                  likeBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
                    var already, _t4;
                    return _regenerator().w(function (_context6) {
                      while (1) switch (_context6.n) {
                        case 0:
                          if (_state.appState.currentUser) {
                            _context6.n = 1;
                            break;
                          }
                          alert(uiText[_state.appState.language].loginRequired);
                          return _context6.a(2);
                        case 1:
                          likeBtn.disabled = true;
                          already = likeBtn.classList.contains('active');
                          _context6.p = 2;
                          if (!already) {
                            _context6.n = 4;
                            break;
                          }
                          _context6.n = 3;
                          return (0, _prompt.unlikePrompt)(p.id, _state.appState.currentUser.uid);
                        case 3:
                          likes -= 1;
                          updateLikeText();
                          _state.appState.likedPrompts = _state.appState.likedPrompts.filter(function (id) {
                            return id !== p.id;
                          });
                          likeBtn.classList.remove('active');
                          _context6.n = 6;
                          break;
                        case 4:
                          _context6.n = 5;
                          return (0, _prompt.likePrompt)(p.id, _state.appState.currentUser.uid);
                        case 5:
                          likes += 1;
                          updateLikeText();
                          _state.appState.likedPrompts.push(p.id);
                          likeBtn.classList.add('active');
                        case 6:
                          localStorage.setItem('likedPrompts', JSON.stringify(_state.appState.likedPrompts));
                          updateLikeIcon();
                          _context6.n = 8;
                          break;
                        case 7:
                          _context6.p = 7;
                          _t4 = _context6.v;
                          console.error('Failed to toggle like:', _t4);
                        case 8:
                          _context6.p = 8;
                          likeBtn.disabled = false;
                          return _context6.f(8);
                        case 9:
                          return _context6.a(2);
                      }
                    }, _callee6, null, [[2, 7, 8, 9]]);
                  })));
                  updateLikeIcon();
                  editBtn = document.createElement('button');
                  editBtn.className = 'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                  editBtn.innerHTML = '<i data-lucide="pencil" class="w-4 h-4" aria-hidden="true"></i>';
                  // clicking the prompt text also starts editing
                  text.addEventListener('click', startEdit);
                  shareBtn = document.createElement('button');
                  shareBtn.className = 'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                  shareBtn.title = 'Share on Twitter';
                  shareBtn.setAttribute('aria-label', 'Share on Twitter');
                  shareBtn.innerHTML = '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';
                  delBtn = document.createElement('button');
                  delBtn.className = 'history-delete p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                  delBtn.innerHTML = '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
                  editing = false;
                  startEdit = function startEdit() {
                    if (editing) return;
                    if (_state.appState.currentUser && p.userId === _state.appState.currentUser.uid) {
                      showEdit();
                    } else {
                      alert(uiText[_state.appState.language].loginRequired);
                    }
                  };
                  showEdit = function showEdit() {
                    var _window$lucide4;
                    if (editing) return;
                    if (!textWrap.contains(text)) return;
                    editing = true;
                    var textarea = document.createElement('textarea');
                    textarea.className = 'w-full p-2 rounded-md bg-black/30';
                    textarea.value = p.text;
                    textWrap.replaceChild(textarea, text);
                    var editRow = document.createElement('div');
                    editRow.className = 'flex items-center gap-2 mt-2';
                    var saveEdit = document.createElement('button');
                    saveEdit.className = 'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                    saveEdit.innerHTML = '<i data-lucide="save" class="w-4 h-4" aria-hidden="true"></i>';
                    var cancelEdit = document.createElement('button');
                    cancelEdit.className = 'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                    cancelEdit.innerHTML = '<i data-lucide="x" class="w-4 h-4" aria-hidden="true"></i>';
                    editRow.appendChild(saveEdit);
                    editRow.appendChild(cancelEdit);
                    if (item.contains(likeRow)) item.replaceChild(editRow, likeRow);
                    // refresh icons for the new buttons
                    (_window$lucide4 = window.lucide) === null || _window$lucide4 === void 0 || _window$lucide4.createIcons();
                    cancelEdit.addEventListener('click', function () {
                      if (textWrap.contains(textarea)) textWrap.replaceChild(text, textarea);
                      if (item.contains(editRow)) item.replaceChild(likeRow, editRow);
                      editing = false;
                    });
                    saveEdit.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
                      var _t5;
                      return _regenerator().w(function (_context7) {
                        while (1) switch (_context7.n) {
                          case 0:
                            saveEdit.disabled = true;
                            _context7.p = 1;
                            _context7.n = 2;
                            return (0, _prompt.updatePromptText)(p.id, textarea.value);
                          case 2:
                            p.text = textarea.value;
                            text.textContent = textarea.value;
                            cancelEdit.click();
                            _context7.n = 4;
                            break;
                          case 3:
                            _context7.p = 3;
                            _t5 = _context7.v;
                            console.error('Failed to update text:', _t5);
                            saveEdit.disabled = false;
                          case 4:
                            return _context7.a(2);
                        }
                      }, _callee7, null, [[1, 3]]);
                    })));
                  };
                  editBtn.addEventListener('click', startEdit);
                  copyBtn.addEventListener('click', function () {
                    navigator.clipboard.writeText(text.textContent || '').then(function () {
                      copyFeedback.classList.remove('hidden');
                      setTimeout(function () {
                        return copyFeedback.classList.add('hidden');
                      }, 1000);
                    })["catch"](function (err) {
                      console.error('Failed to copy text:', err);
                    });
                  });
                  siteShareBtn = document.createElement('button');
                  siteShareBtn.className = 'history-site-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 active';
                  siteShareBtn.title = 'Unshare from Prompter';
                  siteShareBtn.setAttribute('aria-label', 'Unshare from Prompter');
                  siteShareBtn.innerHTML = '<i data-lucide="share-2" class="w-3 h-3" aria-hidden="true"></i>';
                  updateSiteShareIcon = function updateSiteShareIcon() {
                    var svg = siteShareBtn.querySelector('svg');
                    if (svg) {
                      svg.setAttribute('fill', siteShareBtn.classList.contains('active') ? 'currentColor' : 'none');
                      svg.setAttribute('stroke', 'currentColor');
                    }
                  };
                  updateSiteShareIcon();
                  siteShareBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
                    var _t6;
                    return _regenerator().w(function (_context8) {
                      while (1) switch (_context8.n) {
                        case 0:
                          if (_state.appState.currentUser) {
                            _context8.n = 1;
                            break;
                          }
                          alert(uiText[_state.appState.language].loginRequiredShare);
                          return _context8.a(2);
                        case 1:
                          siteShareBtn.disabled = true;
                          _context8.p = 2;
                          _context8.n = 3;
                          return (0, _prompt.unsharePrompt)(p.id, _state.appState.currentUser.uid);
                        case 3:
                          prompts.splice(idx, 1);
                          _renderSharedPrompts(prompts);
                          _context8.n = 5;
                          break;
                        case 4:
                          _context8.p = 4;
                          _t6 = _context8.v;
                          console.error('Failed to unshare:', _t6);
                        case 5:
                          _context8.p = 5;
                          siteShareBtn.disabled = false;
                          return _context8.f(5);
                        case 6:
                          return _context8.a(2);
                      }
                    }, _callee8, null, [[2, 4, 5, 6]]);
                  })));
                  updateShareIcon2 = function updateShareIcon2() {
                    var svg = shareBtn.querySelector('svg');
                    if (svg) svg.setAttribute('fill', shareBtn.classList.contains('active') ? 'currentColor' : 'none');
                  };
                  updateShareIcon2();
                  shareBtn.addEventListener('click', function () {
                    shareBtn.classList.toggle('active');
                    updateShareIcon2();
                    sharePrompt(text.textContent || '', 'https://twitter.com/intent/tweet?text=');
                    (0, _prompt.incrementShareCount)(p.id);
                  });
                  delBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
                    var _t7;
                    return _regenerator().w(function (_context9) {
                      while (1) switch (_context9.n) {
                        case 0:
                          delBtn.disabled = true;
                          _context9.p = 1;
                          _context9.n = 2;
                          return (0, _prompt.unsharePrompt)(p.id, _state.appState.currentUser.uid);
                        case 2:
                          prompts.splice(idx, 1);
                          _context9.n = 3;
                          return _renderSharedPrompts(prompts);
                        case 3:
                          _context9.n = 5;
                          break;
                        case 4:
                          _context9.p = 4;
                          _t7 = _context9.v;
                          console.error('Failed to delete:', _t7);
                          delBtn.disabled = false;
                        case 5:
                          return _context9.a(2);
                      }
                    }, _callee9, null, [[1, 4]]);
                  })));
                  commentToggleBtn = document.createElement('button');
                  commentToggleBtn.className = 'p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                  commentToggleBtn.innerHTML = '<i data-lucide="message-circle" class="w-4 h-4" aria-hidden="true"></i>';
                  commentsWrap = document.createElement('div');
                  commentsWrap.className = 'mt-2 space-y-1 hidden';
                  commentList = document.createElement('div');
                  commentsWrap.appendChild(commentList);
                  commentForm = document.createElement('form');
                  commentForm.className = 'flex items-center gap-2 mt-1';
                  commentInput = document.createElement('input');
                  commentInput.type = 'text';
                  commentInput.placeholder = 'Add a comment...';
                  commentInput.className = 'flex-1 p-1 rounded-md bg-black/30';
                  commentBtn = document.createElement('button');
                  commentBtn.type = 'submit';
                  commentBtn.className = 'px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200';
                  commentBtn.innerHTML = '<i data-lucide="send" class="w-4 h-4" aria-hidden="true"></i>';
                  commentBtn.setAttribute('aria-label', 'Send comment');
                  commentForm.appendChild(commentInput);
                  commentForm.appendChild(commentBtn);
                  commentsWrap.appendChild(commentForm);
                  refreshComments = /*#__PURE__*/function () {
                    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
                      var all, _iterator2, _step2, c, _t8;
                      return _regenerator().w(function (_context0) {
                        while (1) switch (_context0.n) {
                          case 0:
                            _context0.n = 1;
                            return (0, _prompt.getComments)(p.id);
                          case 1:
                            all = _context0.v;
                            commentList.innerHTML = '';
                            commentNum = all.length;
                            commentCount.textContent = commentNum.toString();
                            _iterator2 = _createForOfIteratorHelper(all);
                            _context0.p = 2;
                            _iterator2.s();
                          case 3:
                            if ((_step2 = _iterator2.n()).done) {
                              _context0.n = 5;
                              break;
                            }
                            c = _step2.value;
                            _context0.n = 4;
                            return renderComment(c);
                          case 4:
                            _context0.n = 3;
                            break;
                          case 5:
                            _context0.n = 7;
                            break;
                          case 6:
                            _context0.p = 6;
                            _t8 = _context0.v;
                            _iterator2.e(_t8);
                          case 7:
                            _context0.p = 7;
                            _iterator2.f();
                            return _context0.f(7);
                          case 8:
                            return _context0.a(2);
                        }
                      }, _callee0, null, [[2, 6, 7, 8]]);
                    }));
                    return function refreshComments() {
                      return _ref1.apply(this, arguments);
                    };
                  }();
                  renderComment = /*#__PURE__*/function () {
                    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(c) {
                      var _window$lucide5;
                      var n, d, span, actions, editC, delC;
                      return _regenerator().w(function (_context11) {
                        while (1) switch (_context11.n) {
                          case 0:
                            _context11.n = 1;
                            return fetchName(c.userId);
                          case 1:
                            n = _context11.v;
                            d = document.createElement('div');
                            d.className = 'bg-white/5 rounded-md px-2 py-1 text-sm flex items-start justify-between gap-2';
                            span = document.createElement('span');
                            span.className = 'flex-1';
                            span.innerHTML = (0, _sanitize.sanitizeHTML)(n ? "<a href=\"user.html?uid=".concat(c.userId, "\" class=\"underline\">").concat(n, "</a>: ").concat((0, _linkify.linkify)(c.text)) : (0, _linkify.linkify)(c.text));
                            d.appendChild(span);
                            if (_state.appState.currentUser && c.userId === _state.appState.currentUser.uid) {
                              actions = document.createElement('div');
                              actions.className = 'flex items-center gap-1';
                              editC = document.createElement('button');
                              editC.className = 'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                              editC.innerHTML = '<i data-lucide="pencil" class="w-3 h-3" aria-hidden="true"></i>';
                              delC = document.createElement('button');
                              delC.className = 'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                              delC.innerHTML = '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
                              actions.appendChild(editC);
                              actions.appendChild(delC);
                              d.appendChild(actions);
                              editC.addEventListener('click', function () {
                                var textarea = document.createElement('textarea');
                                textarea.className = 'w-full p-1 rounded-md bg-black/30';
                                textarea.value = c.text;
                                d.insertBefore(textarea, span);
                                d.removeChild(span);
                                var editRow = document.createElement('div');
                                editRow.className = 'flex items-center gap-1';
                                var saveBtn = document.createElement('button');
                                saveBtn.className = 'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                                saveBtn.innerHTML = '<i data-lucide="save" class="w-3 h-3" aria-hidden="true"></i>';
                                var cancelBtn = document.createElement('button');
                                cancelBtn.className = 'p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
                                cancelBtn.innerHTML = '<i data-lucide="x" class="w-3 h-3" aria-hidden="true"></i>';
                                editRow.appendChild(saveBtn);
                                editRow.appendChild(cancelBtn);
                                d.replaceChild(editRow, actions);
                                cancelBtn.addEventListener('click', function () {
                                  d.replaceChild(span, textarea);
                                  d.replaceChild(actions, editRow);
                                });
                                saveBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
                                  var _t9;
                                  return _regenerator().w(function (_context1) {
                                    while (1) switch (_context1.n) {
                                      case 0:
                                        saveBtn.disabled = true;
                                        _context1.p = 1;
                                        _context1.n = 2;
                                        return (0, _prompt.updateComment)(p.id, c.id, textarea.value);
                                      case 2:
                                        _context1.n = 3;
                                        return refreshComments();
                                      case 3:
                                        _context1.n = 5;
                                        break;
                                      case 4:
                                        _context1.p = 4;
                                        _t9 = _context1.v;
                                        console.error('Failed to update comment:', _t9);
                                        saveBtn.disabled = false;
                                      case 5:
                                        return _context1.a(2);
                                    }
                                  }, _callee1, null, [[1, 4]]);
                                })));
                              });
                              delC.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
                                var _t0;
                                return _regenerator().w(function (_context10) {
                                  while (1) switch (_context10.n) {
                                    case 0:
                                      delC.disabled = true;
                                      _context10.p = 1;
                                      _context10.n = 2;
                                      return (0, _prompt.deleteComment)(p.id, c.id);
                                    case 2:
                                      _context10.n = 3;
                                      return refreshComments();
                                    case 3:
                                      _context10.n = 5;
                                      break;
                                    case 4:
                                      _context10.p = 4;
                                      _t0 = _context10.v;
                                      console.error('Failed to delete comment:', _t0);
                                      delC.disabled = false;
                                    case 5:
                                      return _context10.a(2);
                                  }
                                }, _callee10, null, [[1, 4]]);
                              })));
                            }
                            commentList.appendChild(d);
                            (_window$lucide5 = window.lucide) === null || _window$lucide5 === void 0 || _window$lucide5.createIcons();
                          case 2:
                            return _context11.a(2);
                        }
                      }, _callee11);
                    }));
                    return function renderComment(_x4) {
                      return _ref10.apply(this, arguments);
                    };
                  }();
                  _context13.n = 1;
                  return (0, _prompt.getComments)(p.id);
                case 1:
                  existingComments = _context13.v;
                  commentNum = existingComments.length;
                  commentCount = document.createElement('span');
                  commentCount.className = 'text-xs';
                  commentCount.textContent = commentNum.toString();
                  commentContainer = document.createElement('div');
                  commentContainer.className = 'flex items-center gap-1';
                  commentContainer.appendChild(commentToggleBtn);
                  commentContainer.appendChild(commentCount);
                  _iterator3 = _createForOfIteratorHelper(existingComments);
                  _context13.p = 2;
                  _iterator3.s();
                case 3:
                  if ((_step3 = _iterator3.n()).done) {
                    _context13.n = 5;
                    break;
                  }
                  c = _step3.value;
                  _context13.n = 4;
                  return renderComment(c);
                case 4:
                  _context13.n = 3;
                  break;
                case 5:
                  _context13.n = 7;
                  break;
                case 6:
                  _context13.p = 6;
                  _t1 = _context13.v;
                  _iterator3.e(_t1);
                case 7:
                  _context13.p = 7;
                  _iterator3.f();
                  return _context13.f(7);
                case 8:
                  commentForm.addEventListener('submit', /*#__PURE__*/function () {
                    var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(e) {
                      var textVal;
                      return _regenerator().w(function (_context12) {
                        while (1) switch (_context12.n) {
                          case 0:
                            e.preventDefault();
                            if (_state.appState.currentUser) {
                              _context12.n = 1;
                              break;
                            }
                            alert(uiText[_state.appState.language].loginRequired);
                            return _context12.a(2);
                          case 1:
                            textVal = commentInput.value.trim();
                            if (textVal) {
                              _context12.n = 2;
                              break;
                            }
                            return _context12.a(2);
                          case 2:
                            commentBtn.disabled = true;
                            _context12.p = 3;
                            _context12.n = 4;
                            return (0, _prompt.addComment)(p.id, _state.appState.currentUser.uid, textVal);
                          case 4:
                            _context12.n = 5;
                            return refreshComments();
                          case 5:
                            commentInput.value = '';
                          case 6:
                            _context12.p = 6;
                            commentBtn.disabled = false;
                            return _context12.f(6);
                          case 7:
                            return _context12.a(2);
                        }
                      }, _callee12, null, [[3,, 6, 7]]);
                    }));
                    return function (_x5) {
                      return _ref13.apply(this, arguments);
                    };
                  }());
                  commentToggleBtn.addEventListener('click', function () {
                    commentsWrap.classList.toggle('hidden');
                  });
                  likeRow.appendChild(editBtn);
                  if (_state.appState.currentUser && p.userId === _state.appState.currentUser.uid) {
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
                case 9:
                  return _context13.a(2);
              }
            }, _loop, null, [[2, 6, 7, 8]]);
          });
          _iterator.s();
        case 3:
          if ((_step = _iterator.n()).done) {
            _context14.n = 5;
            break;
          }
          return _context14.d(_regeneratorValues(_loop()), 4);
        case 4:
          _context14.n = 3;
          break;
        case 5:
          _context14.n = 7;
          break;
        case 6:
          _context14.p = 6;
          _t10 = _context14.v;
          _iterator.e(_t10);
        case 7:
          _context14.p = 7;
          _iterator.f();
          return _context14.f(7);
        case 8:
          (_window$lucide3 = window.lucide) === null || _window$lucide3 === void 0 || _window$lucide3.createIcons();
        case 9:
          return _context14.a(2);
      }
    }, _callee13, null, [[2, 6, 7, 8]]);
  }));
  return function renderSharedPrompts(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
var init = function init() {
  var _nameWrapper, _editNameBtn, _nameUpdateBtn, _bioWrapper, _bioUpdateBtn, _notificationBtn, _themeLightButton, _themeDarkButton, _document$getElementB;
  themeLightButton = document.getElementById('theme-light');
  themeDarkButton = document.getElementById('theme-dark');
  themeLinkElement = document.getElementById('theme-css');
  if (themeLinkElement) {
    var href = themeLinkElement.getAttribute('href') || '';
    var parts = href.split('?');
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
  var followersLink = document.getElementById('stat-followers');
  var followingLink = document.getElementById('stat-following');
  var followersList = document.getElementById('followers-list');
  var followingList = document.getElementById('following-list');
  var showList = /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(ids, container) {
      var names;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            if (container) {
              _context15.n = 1;
              break;
            }
            return _context15.a(2);
          case 1:
            container.innerHTML = '';
            if (!(ids.length === 0)) {
              _context15.n = 2;
              break;
            }
            container.classList.toggle('hidden', false);
            return _context15.a(2);
          case 2:
            _context15.n = 3;
            return Promise.all(ids.map(function (id) {
              return (0, _user.getUserProfile)(id).then(function (p) {
                return (p === null || p === void 0 ? void 0 : p.name) || id;
              });
            }));
          case 3:
            names = _context15.v;
            ids.forEach(function (id, idx) {
              var a = document.createElement('a');
              a.href = "user.html?uid=".concat(id);
              a.className = 'block underline';
              a.textContent = names[idx];
              container.appendChild(a);
            });
            container.classList.toggle('hidden', false);
          case 4:
            return _context15.a(2);
        }
      }, _callee14);
    }));
    return function showList(_x6, _x7) {
      return _ref14.apply(this, arguments);
    };
  }();
  var showNameEdit = function showNameEdit() {
    if (!nameWrapper || !nameEditRow || !nameInput) return;
    nameInput.value = currentUserName;
    nameWrapper.classList.add('hidden');
    nameEditRow.classList.remove('hidden');
    nameInput.focus();
  };
  followersLink === null || followersLink === void 0 || followersLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (!followersList) return;
    if (!followersList.classList.contains('hidden')) {
      followersList.classList.add('hidden');
      followingList === null || followingList === void 0 || followingList.classList.add('hidden');
      return;
    }
    showList(followerIds, followersList);
    followingList === null || followingList === void 0 || followingList.classList.add('hidden');
  });
  followingLink === null || followingLink === void 0 || followingLink.addEventListener('click', function (e) {
    e.preventDefault();
    if (!followingList) return;
    if (!followingList.classList.contains('hidden')) {
      followingList.classList.add('hidden');
      followersList === null || followersList === void 0 || followersList.classList.add('hidden');
      return;
    }
    showList(followingIds, followingList);
    followersList === null || followersList === void 0 || followersList.classList.add('hidden');
  });
  (_nameWrapper = nameWrapper) === null || _nameWrapper === void 0 || _nameWrapper.addEventListener('click', showNameEdit);
  (_editNameBtn = editNameBtn) === null || _editNameBtn === void 0 || _editNameBtn.addEventListener('click', showNameEdit);
  (_nameUpdateBtn = nameUpdateBtn) === null || _nameUpdateBtn === void 0 || _nameUpdateBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
    var newName, _nameEditRow, _nameWrapper2, nameEl, _t11;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          if (!(!nameInput || !_state.appState.currentUser)) {
            _context16.n = 1;
            break;
          }
          return _context16.a(2);
        case 1:
          newName = nameInput.value.trim();
          if (newName) {
            _context16.n = 2;
            break;
          }
          return _context16.a(2);
        case 2:
          nameUpdateBtn.disabled = true;
          _context16.p = 3;
          _context16.n = 4;
          return (0, _user.setUserProfile)(_state.appState.currentUser.uid, {
            name: newName
          });
        case 4:
          currentUserName = newName;
          nameEl = document.getElementById('user-name');
          if (nameEl) nameEl.textContent = currentUserName;
          if (usernameLabel) usernameLabel.style.display = currentUserName ? 'none' : '';
          (_nameEditRow = nameEditRow) === null || _nameEditRow === void 0 || _nameEditRow.classList.add('hidden');
          (_nameWrapper2 = nameWrapper) === null || _nameWrapper2 === void 0 || _nameWrapper2.classList.remove('hidden');
          _renderSharedPrompts(sharedPromptsData);
          _context16.n = 6;
          break;
        case 5:
          _context16.p = 5;
          _t11 = _context16.v;
          console.error('Failed to update name:', _t11);
        case 6:
          _context16.p = 6;
          nameUpdateBtn.disabled = false;
          return _context16.f(6);
        case 7:
          return _context16.a(2);
      }
    }, _callee15, null, [[3, 5, 6, 7]]);
  })));
  (_bioWrapper = bioWrapper) === null || _bioWrapper === void 0 || _bioWrapper.addEventListener('click', function () {
    var _editBioHint, _window$lucide6;
    if (!bioWrapper || !bioEditRow || !bioInput) return;
    bioInput.value = currentUserBio;
    bioWrapper.classList.add('hidden');
    (_editBioHint = editBioHint) === null || _editBioHint === void 0 || _editBioHint.classList.add('hidden');
    bioEditRow.classList.remove('hidden');
    bioInput.focus();
    (_window$lucide6 = window.lucide) === null || _window$lucide6 === void 0 || _window$lucide6.createIcons();
  });
  (_bioUpdateBtn = bioUpdateBtn) === null || _bioUpdateBtn === void 0 || _bioUpdateBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
    var newBio, _bioEditRow, _bioWrapper2, _editBioHint2, bioEl, _t12;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          if (!(!bioInput || !_state.appState.currentUser)) {
            _context17.n = 1;
            break;
          }
          return _context17.a(2);
        case 1:
          newBio = bioInput.value.trim();
          bioUpdateBtn.disabled = true;
          _context17.p = 2;
          _context17.n = 3;
          return (0, _user.setUserProfile)(_state.appState.currentUser.uid, {
            bio: newBio
          });
        case 3:
          currentUserBio = newBio;
          bioEl = document.getElementById('user-bio');
          if (bioEl) bioEl.textContent = currentUserBio;
          (_bioEditRow = bioEditRow) === null || _bioEditRow === void 0 || _bioEditRow.classList.add('hidden');
          (_bioWrapper2 = bioWrapper) === null || _bioWrapper2 === void 0 || _bioWrapper2.classList.remove('hidden');
          (_editBioHint2 = editBioHint) === null || _editBioHint2 === void 0 || _editBioHint2.classList.remove('hidden');
          _context17.n = 5;
          break;
        case 4:
          _context17.p = 4;
          _t12 = _context17.v;
          console.error('Failed to update bio:', _t12);
        case 5:
          _context17.p = 5;
          bioUpdateBtn.disabled = false;
          return _context17.f(5);
        case 6:
          return _context17.a(2);
      }
    }, _callee16, null, [[2, 4, 5, 6]]);
  })));
  notificationBtn = document.getElementById('notifications-btn');
  notificationCountEl = document.getElementById('notification-count');
  notificationsPanel = document.getElementById('notifications-panel');
  (_notificationBtn = notificationBtn) === null || _notificationBtn === void 0 || _notificationBtn.addEventListener('click', function () {
    var _notificationsPanel, _notificationsPanel2;
    var wasHidden = (_notificationsPanel = notificationsPanel) === null || _notificationsPanel === void 0 ? void 0 : _notificationsPanel.classList.contains('hidden');
    (_notificationsPanel2 = notificationsPanel) === null || _notificationsPanel2 === void 0 || _notificationsPanel2.classList.toggle('hidden');
    if (wasHidden) markAllNotificationsRead();
  });
  var savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);
  var currentTheme = localStorage.getItem('theme') || _state.THEMES.DARK;
  setTheme(currentTheme);
  (_themeLightButton = themeLightButton) === null || _themeLightButton === void 0 || _themeLightButton.addEventListener('click', function () {
    return setTheme(_state.THEMES.LIGHT);
  });
  (_themeDarkButton = themeDarkButton) === null || _themeDarkButton === void 0 || _themeDarkButton.addEventListener('click', function () {
    return setTheme(_state.THEMES.DARK);
  });
  (_document$getElementB = document.getElementById('logout')) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener('click', _auth.logout);
  window.addEventListener('storage', /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(e) {
      var saved;
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.n) {
          case 0:
            if (e.key === 'savedPrompts') {
              try {
                saved = e.newValue ? JSON.parse(e.newValue) : [];
                _state.appState.savedPrompts = saved;
                _renderSavedPrompts(saved);
                if (_state.appState.currentUser) {
                  _loadPromptsForUser(_state.appState.currentUser);
                }
              } catch (err) {
                console.error('Failed to parse savedPrompts from storage event:', err);
              }
            }
          case 1:
            return _context18.a(2);
        }
      }, _callee17);
    }));
    return function (_x8) {
      return _ref17.apply(this, arguments);
    };
  }());
  (0, _auth.onAuth)(/*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(user) {
      var _loginBtn, _window$lucide8;
      var logoutBtn, header, loginBtn, _bioEditRow2, _bioWrapper3, _editBioHint3, _nameEditRow2, _nameWrapper3, _unsubscribeNotificat2, _unsubscribePrompts, _window$lucide7, nameEl, bioEl, _nameEditRow3, _nameWrapper4, _bioEditRow3, _bioWrapper4, _editBioHint4, profile, name, _nameEl, bio, _bioEl, _t13;
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.n) {
          case 0:
            logoutBtn = document.getElementById('logout');
            header = logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.parentElement;
            loginBtn = document.getElementById('login-btn');
            if (user) {
              _context19.n = 1;
              break;
            }
            logoutBtn === null || logoutBtn === void 0 || logoutBtn.classList.add('hidden');
            if (!loginBtn) {
              loginBtn = document.createElement('a');
              loginBtn.id = 'login-btn';
              loginBtn.href = 'login.html';
              loginBtn.className = 'mt-2 bg-white/20 hover:bg-white/30 p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center gap-1';
              loginBtn.innerHTML = '<i data-lucide="log-in" class="w-4 h-4" aria-hidden="true"></i><span>Login</span>';
              header === null || header === void 0 || header.appendChild(loginBtn);
              (_window$lucide7 = window.lucide) === null || _window$lucide7 === void 0 || _window$lucide7.createIcons();
            }
            document.getElementById('user-email').textContent = '';
            nameEl = document.getElementById('user-name');
            if (nameEl) nameEl.textContent = '';
            if (usernameLabel) usernameLabel.style.display = '';
            currentUserName = '';
            if (nameInput) nameInput.value = '';
            bioEl = document.getElementById('user-bio');
            if (bioEl) bioEl.textContent = '';
            if (bioInput) bioInput.value = '';
            (_bioEditRow2 = bioEditRow) === null || _bioEditRow2 === void 0 || _bioEditRow2.classList.add('hidden');
            (_bioWrapper3 = bioWrapper) === null || _bioWrapper3 === void 0 || _bioWrapper3.classList.remove('hidden');
            (_editBioHint3 = editBioHint) === null || _editBioHint3 === void 0 || _editBioHint3.classList.remove('hidden');
            (_nameEditRow2 = nameEditRow) === null || _nameEditRow2 === void 0 || _nameEditRow2.classList.add('hidden');
            (_nameWrapper3 = nameWrapper) === null || _nameWrapper3 === void 0 || _nameWrapper3.classList.remove('hidden');
            notifications = [];
            _renderNotifications();
            (_unsubscribeNotificat2 = unsubscribeNotifications) === null || _unsubscribeNotificat2 === void 0 || _unsubscribeNotificat2();
            (_unsubscribePrompts = unsubscribePrompts) === null || _unsubscribePrompts === void 0 || _unsubscribePrompts();
            return _context19.a(2);
          case 1:
            (_loginBtn = loginBtn) === null || _loginBtn === void 0 || _loginBtn.remove();
            logoutBtn === null || logoutBtn === void 0 || logoutBtn.classList.remove('hidden');
            document.getElementById('user-email').textContent = user.email || '';
            initNotifications(user.uid);
            _context19.p = 2;
            _context19.n = 3;
            return (0, _user.getUserProfile)(user.uid);
          case 3:
            profile = _context19.v;
            name = profile && typeof profile.name === 'string' ? profile.name.trim() : '';
            if (!name) {
              console.warn('User profile is missing a name. Check registration logic.');
            }
            currentUserName = name;
            _nameEl = document.getElementById('user-name');
            if (_nameEl) _nameEl.textContent = currentUserName;
            if (usernameLabel) usernameLabel.style.display = currentUserName ? 'none' : '';
            if (nameInput) nameInput.value = currentUserName;
            (_nameEditRow3 = nameEditRow) === null || _nameEditRow3 === void 0 || _nameEditRow3.classList.add('hidden');
            (_nameWrapper4 = nameWrapper) === null || _nameWrapper4 === void 0 || _nameWrapper4.classList.remove('hidden');
            bio = profile && typeof profile.bio === 'string' ? profile.bio : '';
            currentUserBio = bio;
            _bioEl = document.getElementById('user-bio');
            if (_bioEl) _bioEl.textContent = currentUserBio;
            if (bioInput) bioInput.value = currentUserBio;
            (_bioEditRow3 = bioEditRow) === null || _bioEditRow3 === void 0 || _bioEditRow3.classList.add('hidden');
            (_bioWrapper4 = bioWrapper) === null || _bioWrapper4 === void 0 || _bioWrapper4.classList.remove('hidden');
            (_editBioHint4 = editBioHint) === null || _editBioHint4 === void 0 || _editBioHint4.classList.remove('hidden');
            _context19.n = 4;
            return (0, _user.getFollowingIds)(user.uid);
          case 4:
            followingIds = _context19.v;
            _context19.n = 5;
            return (0, _user.getFollowerIds)(user.uid);
          case 5:
            followerIds = _context19.v;
            updateCount('stat-following', followingIds.length);
            updateCount('stat-followers', followerIds.length);
            _context19.n = 7;
            break;
          case 6:
            _context19.p = 6;
            _t13 = _context19.v;
            console.error('Failed to load profile:', _t13);
          case 7:
            _context19.n = 8;
            return _loadPromptsForUser(user);
          case 8:
            (_window$lucide8 = window.lucide) === null || _window$lucide8 === void 0 || _window$lucide8.createIcons();
            document.querySelectorAll('#shared-list .like-btn').forEach(function (b) {
              var svg = b.querySelector('svg');
              if (svg && b.classList.contains('active')) {
                svg.setAttribute('fill', 'currentColor');
              }
            });
          case 9:
            return _context19.a(2);
        }
      }, _callee18, null, [[2, 6]]);
    }));
    return function (_x9) {
      return _ref18.apply(this, arguments);
    };
  }());
};
document.addEventListener('DOMContentLoaded', function () {
  if (window.firebaseInitPromise) window.firebaseInitPromise.then(init);else init();
});
