"use strict";

var _state = require("./state.js");
var _auth = require("./auth.js");
var _prompt = require("./prompt.js");
var _config = require("./config.js");
var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js");
var _firebase = require("./firebase.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var LANGUAGE_PAGES = {
  en: 'index.html',
  tr: 'tr/',
  es: 'es/',
  fr: 'fr/',
  zh: 'zh/',
  hi: 'hi/'
};
var uiText = {
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
    langZhLabel: 'Switch to Chinese'
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
    langZhLabel: 'Çince\'ye geç'
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
    langZhLabel: 'Cambiar a chino'
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
    langZhLabel: '切换到中文'
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
    langZhLabel: 'चीनी पर स्विच करें'
  }
};
var themeLightButton;
var themeDarkButton;
var themeLinkElement;
var themeVersion = '';
var listContainer;
var savedPromptIds = [];
var unsubscribeSaved = null;
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
  var targetPage = LANGUAGE_PAGES[lang];
  if (targetPage) {
    // Some servers redirect /index.html to / so pathname becomes "".
    // Normalize to avoid endless redirects when the target is index.html.
    var current = window.location.pathname.replace(/^\//, '');
    if (current === '') {
      current = 'index.html';
    }
    if (current !== targetPage) {
      window.location.href = targetPage;
      localStorage.setItem('language', lang);
      return;
    }
  }
  _state.appState.language = lang;
  document.documentElement.lang = lang;
  document.getElementById('page-title').textContent = uiText[lang].pageTitle;
  localStorage.setItem('language', lang);
  updateTexts();
  renderList();
};
var updateTexts = function updateTexts() {
  themeLightButton.title = uiText[_state.appState.language].light;
  themeLightButton.setAttribute('aria-label', uiText[_state.appState.language].light);
  themeDarkButton.title = uiText[_state.appState.language].dark;
  themeDarkButton.setAttribute('aria-label', uiText[_state.appState.language].dark);
  var backLink = document.getElementById('back-link');
  if (backLink) {
    backLink.title = uiText[_state.appState.language].back;
    backLink.setAttribute('aria-label', uiText[_state.appState.language].back);
  }
};
var renderList = function renderList() {
  listContainer.innerHTML = '';
  if (_state.appState.savedPrompts.length === 0) {
    var p = document.createElement('p');
    p.textContent = uiText[_state.appState.language].noSaved;
    listContainer.appendChild(p);
    return;
  }
  for (var i = _state.appState.savedPrompts.length - 1; i >= 0; i--) {
    var prompt = _state.appState.savedPrompts[i];
    var wrapper = document.createElement('div');
    wrapper.className = 'bg-white/10 p-3 rounded-lg';
    var textarea = document.createElement('textarea');
    textarea.className = 'w-full p-2 rounded-md bg-black/30';
    textarea.value = prompt;
    textarea.dataset.index = i.toString();
    var actions = document.createElement('div');
    actions.className = 'flex gap-2 mt-2';
    var saveBtn = document.createElement('button');
    saveBtn.className = 'save-change p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    saveBtn.title = uiText[_state.appState.language].saveChanges;
    saveBtn.setAttribute('aria-label', uiText[_state.appState.language].saveChanges);
    saveBtn.dataset.index = i.toString();
    saveBtn.innerHTML = '<i data-lucide="save" class="w-4 h-4" role="img" aria-label="Save icon"></i>';
    var delBtn = document.createElement('button');
    delBtn.className = 'delete-prompt p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    delBtn.title = uiText[_state.appState.language].deletePrompt;
    delBtn.setAttribute('aria-label', uiText[_state.appState.language].deletePrompt);
    delBtn.dataset.index = i.toString();
    delBtn.innerHTML = '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'history-copy p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[_state.appState.language].copyButtonTitle;
    copyBtn.setAttribute('aria-label', uiText[_state.appState.language].copyButtonTitle);
    copyBtn.dataset.index = i.toString();
    copyBtn.innerHTML = '<i data-lucide="copy" class="w-3 h-3" aria-hidden="true"></i>';
    var downloadBtn = document.createElement('button');
    downloadBtn.className = 'history-download p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    downloadBtn.title = uiText[_state.appState.language].downloadButtonTitle;
    downloadBtn.setAttribute('aria-label', uiText[_state.appState.language].downloadButtonTitle);
    downloadBtn.dataset.index = i.toString();
    downloadBtn.innerHTML = '<i data-lucide="download" class="w-3 h-3" aria-hidden="true"></i>';
    var shareBtn = document.createElement('button');
    shareBtn.className = 'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    shareBtn.title = uiText[_state.appState.language].shareTwitterTitle;
    shareBtn.setAttribute('aria-label', uiText[_state.appState.language].shareTwitterTitle);
    shareBtn.dataset.index = i.toString();
    shareBtn.innerHTML = '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';
    var feedback = document.createElement('span');
    feedback.className = 'save-feedback text-green-400 text-xs ml-1 hidden';
    feedback.textContent = uiText[_state.appState.language].saveFeedback;
    var copyFeedback = document.createElement('span');
    copyFeedback.className = 'copy-feedback text-green-400 text-xs ml-1 hidden';
    copyFeedback.textContent = uiText[_state.appState.language].copyFeedback;
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
var sharePrompt = function sharePrompt(prompt, baseUrl) {
  if (!prompt) return;
  var link = " ".concat(_config.BASE_URL);
  var url = "".concat(baseUrl).concat(encodeURIComponent("".concat(prompt).concat(link)));
  window.open(url, '_blank');
};
var initSavedPromptSync = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(uid) {
    var docs, q, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return (0, _prompt.getUserSavedPrompts)(uid);
        case 1:
          docs = _context.v;
          savedPromptIds = docs.map(function (d) {
            return d.id;
          });
          _state.appState.savedPrompts = docs.map(function (d) {
            return d.text;
          });
          localStorage.setItem('savedPrompts', JSON.stringify(_state.appState.savedPrompts));
          renderList();
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          console.error('Failed to load saved prompts:', _t);
        case 3:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, "users/".concat(uid, "/savedPrompts")), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'));
          unsubscribeSaved = (0, _firebaseFirestore.onSnapshot)(q, function (snap) {
            savedPromptIds = snap.docs.map(function (d) {
              return d.id;
            });
            _state.appState.savedPrompts = snap.docs.map(function (d) {
              return d.data().text;
            });
            localStorage.setItem('savedPrompts', JSON.stringify(_state.appState.savedPrompts));
            renderList();
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function initSavedPromptSync(_x) {
    return _ref.apply(this, arguments);
  };
}();
var setupEvents = function setupEvents() {
  var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4;
  themeLightButton.addEventListener('click', function () {
    return setTheme(_state.THEMES.LIGHT);
  });
  themeDarkButton.addEventListener('click', function () {
    return setTheme(_state.THEMES.DARK);
  });
  (_document$getElementB = document.getElementById('lang-en')) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener('click', function () {
    return setLanguage('en');
  });
  (_document$getElementB2 = document.getElementById('lang-tr')) === null || _document$getElementB2 === void 0 || _document$getElementB2.addEventListener('click', function () {
    return setLanguage('tr');
  });
  (_document$getElementB3 = document.getElementById('lang-es')) === null || _document$getElementB3 === void 0 || _document$getElementB3.addEventListener('click', function () {
    return setLanguage('es');
  });
  (_document$getElementB4 = document.getElementById('lang-hi')) === null || _document$getElementB4 === void 0 || _document$getElementB4.addEventListener('click', function () {
    return setLanguage('hi');
  });
  var buttonPop = function buttonPop(el) {
    el.classList.add('button-pop');
    setTimeout(function () {
      return el.classList.remove('button-pop');
    }, 300);
  };
  var showFeedback = function showFeedback(el) {
    if (!el) return;
    el.classList.remove('hidden');
    setTimeout(function () {
      return el.classList.add('hidden');
    }, 1000);
  };
  listContainer.addEventListener('click', function (e) {
    var saveBtn = e.target.closest('.save-change');
    var delBtn = e.target.closest('.delete-prompt');
    var copyBtn = e.target.closest('.history-copy');
    var downloadBtn = e.target.closest('.history-download');
    var shareBtn = e.target.closest('.history-share');
    var btn = saveBtn || delBtn || copyBtn || downloadBtn || shareBtn;
    if (!btn) return;
    var idx = parseInt(btn.dataset.index, 10);
    if (Number.isNaN(idx)) return;
    var text = _state.appState.savedPrompts[idx];
    if (saveBtn) {
      var textarea = listContainer.querySelector("textarea[data-index=\"".concat(idx, "\"]"));
      if (textarea) {
        _state.appState.savedPrompts[idx] = textarea.value;
        localStorage.setItem('savedPrompts', JSON.stringify(_state.appState.savedPrompts));
        if (_state.appState.currentUser && savedPromptIds[idx]) {
          (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, "users/".concat(_state.appState.currentUser.uid, "/savedPrompts"), savedPromptIds[idx]), {
              text: textarea.value
            });
          })["catch"](function (err) {
            return console.error('Failed to update prompt:', err);
          });
        }
        showFeedback(saveBtn.nextElementSibling);
        buttonPop(saveBtn);
      }
    } else if (delBtn) {
      var wrapper = delBtn.closest('div');
      if (wrapper) wrapper.classList.add('fade-out');
      buttonPop(delBtn);
      setTimeout(function () {
        _state.appState.savedPrompts.splice(idx, 1);
        localStorage.setItem('savedPrompts', JSON.stringify(_state.appState.savedPrompts));
        if (_state.appState.currentUser && savedPromptIds[idx]) {
          (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.deleteDoc)((0, _firebaseFirestore.doc)(_firebase.db, "users/".concat(_state.appState.currentUser.uid, "/savedPrompts"), savedPromptIds[idx]));
          })["catch"](function (err) {
            return console.error('Failed to delete prompt:', err);
          });
        }
        renderList();
      }, 300);
    } else if (copyBtn && text) {
      navigator.clipboard.writeText(text).then(function () {
        showFeedback(copyBtn.nextElementSibling);
        buttonPop(copyBtn);
      })["catch"](function (err) {
        return console.error('Failed to copy text:', err);
      });
    } else if (downloadBtn && text) {
      buttonPop(downloadBtn);
      var blob = new Blob([text], {
        type: 'text/plain'
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = "prompt_".concat(idx, ".txt");
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
var init = function init() {
  var _window$lucide;
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
  listContainer = document.getElementById('saved-list');
  var lang = localStorage.getItem('language') || 'en';
  setLanguage(lang);
  var theme = localStorage.getItem('theme') || _state.THEMES.DARK;
  setTheme(theme);
  renderList();
  setupEvents();
  (_window$lucide = window.lucide) === null || _window$lucide === void 0 || _window$lucide.createIcons();
  if (_state.appState.currentUser) {
    initSavedPromptSync(_state.appState.currentUser.uid);
  }
  (0, _auth.onAuth)(function (user) {
    var _unsubscribeSaved;
    _state.appState.currentUser = user;
    (_unsubscribeSaved = unsubscribeSaved) === null || _unsubscribeSaved === void 0 || _unsubscribeSaved();
    unsubscribeSaved = null;
    if (user) {
      initSavedPromptSync(user.uid);
    } else {
      savedPromptIds = [];
    }
  });
};
document.addEventListener('DOMContentLoaded', function () {
  if (window.firebaseInitPromise) window.firebaseInitPromise.then(init);else init();
});
