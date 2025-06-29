"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeApp = void 0;
var _state = require("./state.js");
var _prompts = require("./prompts.js");
var _config = require("./config.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t8 in e) "default" !== _t8 && {}.hasOwnProperty.call(e, _t8) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t8)) && (i.get || i.set) ? o(f, _t8, i) : f[_t8] = e[_t8]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var uiText = {};
var _loadUiText = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(lang) {
    var res, data, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!uiText[lang]) {
            _context.n = 1;
            break;
          }
          return _context.a(2, uiText[lang]);
        case 1:
          _context.p = 1;
          _context.n = 2;
          return fetch("/translations/ui/".concat(lang, ".json"));
        case 2:
          res = _context.v;
          if (res.ok) {
            _context.n = 3;
            break;
          }
          throw new Error('Failed to load');
        case 3:
          _context.n = 4;
          return res.json();
        case 4:
          data = _context.v;
          uiText[lang] = data;
          return _context.a(2, data);
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error('Failed to load UI translations for', lang, _t);
          if (!(lang !== 'en')) {
            _context.n = 6;
            break;
          }
          return _context.a(2, _loadUiText('en'));
        case 6:
          return _context.a(2, {});
      }
    }, _callee, null, [[1, 5]]);
  }));
  return function loadUiText(_x) {
    return _ref.apply(this, arguments);
  };
}();
var categoryButtonsContainer;
var generateButton;
var promptDisplayArea;
var generatedPromptText;
var copyButton;
var shareButton;
var saveButton;
var shareTwitterButton;
var copySuccessMessage;
var saveSuccessMessage;
var saveErrorMessage;
var shareMessage;
var langEnButton;
var langTrButton;
var langEsButton;
var langFrButton;
var langZhButton;
var langHiButton;
var langToggleButton;
var langMenu;
var currentLangLabel;
var themeLightButton;
var themeDarkButton;
var themeLinkElement;
var themeVersion = '';
var appLogo;
var historyPanel;
var historyList;
var clearHistoryButton;
var setTheme = function setTheme(theme) {
  _state.appState.theme = theme;
  if (themeLinkElement) {
    var versionSuffix = themeVersion ? "?".concat(themeVersion) : '';
    themeLinkElement.href = "css/theme-".concat(theme, ".css").concat(versionSuffix);
  }
  if (theme === _state.THEMES.LIGHT) {
    themeLightButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeLightButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
    themeDarkButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeDarkButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
  } else {
    themeDarkButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeDarkButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
    themeLightButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeLightButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
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
var setLanguage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(lang) {
    var fromSaved,
      params,
      paramLang,
      refLangEntry,
      overrideLang,
      current,
      targetPage,
      shouldRedirect,
      promptTitleEl,
      loginLink,
      arrow,
      _args2 = arguments;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          fromSaved = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
          _context2.n = 1;
          return _loadUiText(lang);
        case 1:
          params = new URLSearchParams(window.location.search);
          paramLang = params.get('lang');
          refLangEntry = Object.entries(LANGUAGE_PAGES).find(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
              page = _ref4[1];
            return document.referrer.includes(page);
          });
          overrideLang = null;
          if (paramLang && LANGUAGE_PAGES[paramLang]) {
            overrideLang = paramLang;
          } else if (!fromSaved && refLangEntry) {
            overrideLang = refLangEntry[0];
          }
          current = window.location.pathname.replace(/^\//, '');
          if (current === '') current = 'index.html';
          if (overrideLang) {
            lang = overrideLang;
          }
          targetPage = LANGUAGE_PAGES[lang];
          if (!targetPage) {
            _context2.n = 2;
            break;
          }
          // Some servers redirect /index.html to / which results in
          // window.location.pathname being "". Normalize to avoid loops.
          current = window.location.pathname.replace(/^\//, '');
          if (current === '') {
            current = 'index.html';
          }
          shouldRedirect = current !== targetPage;
          if (!shouldRedirect) {
            _context2.n = 2;
            break;
          }
          window.location.href = targetPage;
          localStorage.setItem('language', lang);
          return _context2.a(2);
        case 2:
          _state.appState.language = lang;
          document.documentElement.lang = lang;
          document.getElementById('app-title').textContent = uiText[lang].appTitle;
          document.getElementById('app-subtitle').textContent = uiText[lang].appSubtitle;
          document.getElementById('choose-style-title').textContent = uiText[lang].chooseStyleTitle;
          document.getElementById('generate-button-text').textContent = uiText[lang].generateButtonText;
          generateButton.setAttribute('aria-label', uiText[lang].generateButtonText);
          promptTitleEl = document.getElementById('your-prompt-title');
          promptTitleEl.textContent = "".concat(uiText[lang].yourPromptTitle, " \u2193");
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
            shareTwitterButton.setAttribute('aria-label', uiText[lang].shareTwitterTitle);
          }
          copySuccessMessage.textContent = uiText[lang].copySuccessMessage;
          saveSuccessMessage.textContent = uiText[lang].saveSuccessMessage;
          if (saveErrorMessage) {
            saveErrorMessage.textContent = uiText[lang].saveErrorMessage;
          }
          if (shareMessage) {
            shareMessage.textContent = uiText[lang].shareMessage;
          }
          document.getElementById('history-title').textContent = uiText[lang].historyTitle;
          clearHistoryButton.title = uiText[lang].clearHistoryTitle;
          clearHistoryButton.setAttribute('aria-label', uiText[lang].clearHistoryTitle);
          document.getElementById('app-stats').textContent = uiText[lang].appStats;
          document.getElementById('footer-prompter').textContent = uiText[lang].footerPrompter;
          loginLink = document.getElementById('login-link');
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
            arrow = currentLangLabel.querySelector('svg');
            currentLangLabel.textContent = lang.toUpperCase();
            if (arrow) {
              currentLangLabel.appendChild(arrow);
            }
          }
          _prompts.categories.forEach(function (category) {
            var button = document.getElementById("category-".concat(category.id));
            if (button) {
              var labelSpan = button.querySelector('.category-label');
              if (labelSpan) {
                labelSpan.textContent = category.name[lang];
              }
              button.setAttribute('aria-label', "".concat(category.name[lang], " category"));
            }
          });
          if (lang === 'en') {
            langEnButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
            langEnButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            langTrButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langTrButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            if (langEsButton) {
              langEsButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langEsButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            if (langZhButton) {
              langZhButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langZhButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
          } else if (lang === 'tr') {
            langTrButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
            langTrButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            langEnButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langEnButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            if (langEsButton) {
              langEsButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langEsButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            if (langZhButton) {
              langZhButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langZhButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
          } else if (lang === 'es') {
            if (langEsButton) {
              langEsButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
              langEsButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            langEnButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langEnButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            langTrButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langTrButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            if (langZhButton) {
              langZhButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langZhButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
          } else if (lang === 'fr') {
            if (langFrButton) {
              langFrButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
              langFrButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            langEnButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langEnButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            langTrButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langTrButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            if (langEsButton) {
              langEsButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langEsButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            if (langZhButton) {
              langZhButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langZhButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
          } else if (lang === 'zh') {
            if (langZhButton) {
              langZhButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
              langZhButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            langEnButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langEnButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            langTrButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langTrButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            if (langEsButton) {
              langEsButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langEsButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
          } else {
            if (langHiButton) {
              langHiButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
              langHiButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            if (langZhButton) {
              langZhButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langZhButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
            langEnButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langEnButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            langTrButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
            langTrButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            if (langEsButton) {
              langEsButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
              langEsButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
            }
          }
          if (!fromSaved) {
            localStorage.setItem('language', lang);
          }
          updateButtonTitles();
          renderHistory();
        case 3:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function setLanguage(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var updateButtonTitles = function updateButtonTitles() {
  themeLightButton.title = uiText[_state.appState.language].themeLightTitle;
  themeLightButton.setAttribute('aria-label', uiText[_state.appState.language].themeLightTitle);
  themeDarkButton.title = uiText[_state.appState.language].themeDarkTitle;
  themeDarkButton.setAttribute('aria-label', uiText[_state.appState.language].themeDarkTitle);
  if (saveButton) {
    saveButton.title = uiText[_state.appState.language].saveButtonTitle;
    saveButton.setAttribute('aria-label', uiText[_state.appState.language].saveButtonTitle);
  }
  if (shareTwitterButton) {
    shareTwitterButton.title = uiText[_state.appState.language].shareTwitterTitle;
    shareTwitterButton.setAttribute('aria-label', uiText[_state.appState.language].shareTwitterTitle);
  }
};
var renderHistory = function renderHistory() {
  if (!historyPanel || !historyList) return;
  historyList.innerHTML = '';
  var reversed = _state.appState.history.slice().reverse();
  reversed.forEach(function (prompt, revIdx) {
    var idx = _state.appState.history.length - 1 - revIdx;
    var li = document.createElement('li');
    li.className = 'flex justify-between items-start gap-2';
    var textarea = document.createElement('textarea');
    textarea.className = 'history-edit flex-1 whitespace-pre-wrap font-mono bg-transparent p-1 rounded-md';
    textarea.value = prompt;
    textarea.setAttribute('data-index', idx);
    var actions = document.createElement('div');
    actions.className = 'flex gap-2';
    var copyBtn = document.createElement('button');
    copyBtn.className = 'history-copy p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[_state.appState.language].copyButtonTitle;
    copyBtn.setAttribute('aria-label', uiText[_state.appState.language].copyButtonTitle);
    copyBtn.setAttribute('data-index', idx);
    copyBtn.innerHTML = '<i data-lucide="copy" class="w-3 h-3" aria-hidden="true"></i>';
    actions.appendChild(copyBtn);
    var copyFeedback = document.createElement('span');
    copyFeedback.className = 'history-copy-feedback text-green-400 text-xs ml-1 hidden';
    copyFeedback.textContent = uiText[_state.appState.language].copySuccessMessage;
    actions.appendChild(copyFeedback);
    if (saveButton) {
      var saveBtn = document.createElement('button');
      saveBtn.className = 'history-save p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      saveBtn.title = uiText[_state.appState.language].saveButtonTitle;
      saveBtn.setAttribute('aria-label', uiText[_state.appState.language].saveButtonTitle);
      saveBtn.setAttribute('data-index', idx);
      saveBtn.innerHTML = '<i data-lucide="save" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(saveBtn);
    }
    if (shareTwitterButton) {
      var shareBtn = document.createElement('button');
      shareBtn.className = 'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      shareBtn.title = uiText[_state.appState.language].shareTwitterTitle;
      shareBtn.setAttribute('aria-label', uiText[_state.appState.language].shareTwitterTitle);
      shareBtn.setAttribute('data-index', idx);
      shareBtn.innerHTML = '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(shareBtn);
    }
    if (shareButton) {
      var siteShareBtn = document.createElement('button');
      siteShareBtn.className = 'history-site-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      siteShareBtn.title = uiText[_state.appState.language].shareButtonTitle;
      siteShareBtn.setAttribute('aria-label', uiText[_state.appState.language].shareButtonTitle);
      siteShareBtn.setAttribute('data-index', idx);
      siteShareBtn.innerHTML = '<i data-lucide="share-2" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(siteShareBtn);
    }
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'history-delete p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    deleteBtn.title = uiText[_state.appState.language].deleteButtonTitle;
    deleteBtn.setAttribute('aria-label', uiText[_state.appState.language].deleteButtonTitle);
    deleteBtn.setAttribute('data-index', idx);
    deleteBtn.innerHTML = '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
    actions.appendChild(deleteBtn);
    var feedback = document.createElement('span');
    feedback.className = 'save-feedback text-green-400 text-xs ml-1 hidden';
    feedback.textContent = uiText[_state.appState.language].saveFeedback;
    actions.appendChild(feedback);
    li.appendChild(textarea);
    li.appendChild(actions);
    historyList.appendChild(li);
  });
  historyPanel.classList.toggle('hidden', _state.appState.history.length === 0);
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
};
var handleGenerate = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var _yield$generatePrompt, prompt, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          generatedPromptText.innerHTML = '<div class="flex justify-center items-center h-20"><i data-lucide="loader-2" class="w-6 h-6 animate-spin" aria-hidden="true"></i></div>';
          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }
          promptDisplayArea.classList.remove('hidden');
          promptDisplayArea.classList.add('animate-fadeIn');
          _context3.p = 1;
          _context3.n = 2;
          return (0, _prompts.generatePrompt)();
        case 2:
          _yield$generatePrompt = _context3.v;
          prompt = _yield$generatePrompt.prompt;
          generatedPromptText.textContent = prompt;
          _state.appState.history.push(prompt);
          if (_state.appState.history.length > _state.appState.HISTORY_SIZE) {
            _state.appState.history.shift();
          }
          localStorage.setItem('promptHistory', JSON.stringify(_state.appState.history));
          renderHistory();
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t2 = _context3.v;
          console.error(_t2);
          if (_t2 && _t2.message === 'offline') {
            generatedPromptText.textContent = uiText[_state.appState.language].internetRequired;
          } else {
            generatedPromptText.textContent = uiText[_state.appState.language].errorGenerating;
          }
        case 4:
          _context3.p = 4;
          _state.appState.isGenerating = false;
          generateButton.disabled = false;
          return _context3.f(4);
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3, 4, 5]]);
  }));
  return function handleGenerate() {
    return _ref5.apply(this, arguments);
  };
}();
var sharePrompt = function sharePrompt(prompt, baseUrl) {
  if (!prompt) return;
  var link = " ".concat(_config.BASE_URL);
  var url = "".concat(baseUrl).concat(encodeURIComponent("".concat(prompt).concat(link)));
  window.open(url, '_blank');
};
var setupEventListeners = function setupEventListeners() {
  _prompts.categories.forEach(function (category) {
    var button = document.getElementById("category-".concat(category.id));
    if (button) {
      button.addEventListener('click', function () {
        _state.appState.selectedCategory = category.id;
        document.querySelectorAll('.category-button').forEach(function (btn) {
          return btn.classList.remove('selected');
        });
        button.classList.add('selected');
        if ((category.id === 'random' || category.id === 'ideas') && _config.AD_LINK) {
          window.open(_config.AD_LINK, '_blank');
        }
      });
    }
  });
  generateButton.addEventListener('click', function () {
    generateButton.disabled = true;
    handleGenerate();
  });
  generatedPromptText.addEventListener('input', function () {
    var val = 'value' in generatedPromptText ? generatedPromptText.value : generatedPromptText.textContent;
    _state.appState.generatedPrompt = val;
  });
  copyButton.addEventListener('click', function () {
    if (!_state.appState.generatedPrompt) return;
    navigator.clipboard.writeText(_state.appState.generatedPrompt).then(function () {
      _state.appState.copySuccess = true;
      copySuccessMessage.classList.remove('hidden');
      copyButton.classList.add('button-pop');
      setTimeout(function () {
        copySuccessMessage.classList.add('hidden');
        _state.appState.copySuccess = false;
        copyButton.classList.remove('button-pop');
      }, 2000);
    })["catch"](function (err) {
      console.error('Failed to copy text: ', err);
      alert(uiText[_state.appState.language].copyFailed);
    });
  });
  if (shareButton) {
    var updateShareIcon = function updateShareIcon() {
      var svg = shareButton.querySelector('svg');
      if (svg) svg.setAttribute('fill', shareButton.classList.contains('active') ? 'currentColor' : 'none');
    };
    updateShareIcon();
    shareButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _shareMessage;
      var _yield$import, savePrompt, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            if (_state.appState.generatedPrompt) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            if (_state.appState.currentUser) {
              _context4.n = 2;
              break;
            }
            alert(uiText[_state.appState.language].loginRequiredShare);
            return _context4.a(2);
          case 2:
            shareButton.classList.add('button-pop');
            shareButton.classList.toggle('active');
            updateShareIcon();
            (_shareMessage = shareMessage) === null || _shareMessage === void 0 || _shareMessage.classList.remove('hidden');
            setTimeout(function () {
              var _shareMessage2;
              (_shareMessage2 = shareMessage) === null || _shareMessage2 === void 0 || _shareMessage2.classList.add('hidden');
              shareButton.classList.remove('button-pop');
            }, 2000);
            _context4.p = 3;
            _context4.n = 4;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('./prompt.js'));
            });
          case 4:
            _yield$import = _context4.v;
            savePrompt = _yield$import.savePrompt;
            _context4.n = 5;
            return savePrompt(_state.appState.generatedPrompt, _state.appState.currentUser.uid, _state.appState.selectedCategory, _state.appState.currentUser.displayName || '', _state.appState.currentUser.email || '');
          case 5:
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t3 = _context4.v;
            console.error(_t3);
            alert(uiText[_state.appState.language].shareFailed);
          case 7:
            return _context4.a(2);
        }
      }, _callee4, null, [[3, 6]]);
    })));
  }
  if (saveButton) {
    var updateSaveIcon = function updateSaveIcon() {
      var svg = saveButton.querySelector('svg');
      if (svg) svg.setAttribute('fill', saveButton.classList.contains('active') ? 'currentColor' : 'none');
    };
    updateSaveIcon();
    saveButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var _yield$import2, saveUserPrompt, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            if (_state.appState.generatedPrompt) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            saveButton.classList.toggle('active');
            updateSaveIcon();
            _state.appState.savedPrompts.push(_state.appState.generatedPrompt);
            localStorage.setItem('savedPrompts', JSON.stringify(_state.appState.savedPrompts));
            if (!_state.appState.currentUser) {
              _context5.n = 6;
              break;
            }
            _context5.p = 2;
            _context5.n = 3;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('./prompt.js'));
            });
          case 3:
            _yield$import2 = _context5.v;
            saveUserPrompt = _yield$import2.saveUserPrompt;
            _context5.n = 4;
            return saveUserPrompt(_state.appState.generatedPrompt, _state.appState.currentUser.uid);
          case 4:
            _context5.n = 6;
            break;
          case 5:
            _context5.p = 5;
            _t4 = _context5.v;
            console.error('Failed to sync prompt:', _t4);
          case 6:
            saveSuccessMessage.classList.remove('hidden');
            setTimeout(function () {
              saveSuccessMessage.classList.add('hidden');
            }, 2000);
            saveButton.classList.add('button-pop');
            setTimeout(function () {
              saveButton.classList.remove('button-pop');
            }, 300);
            saveButton.disabled = true;
            setTimeout(function () {
              saveButton.disabled = false;
            }, 500);
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[2, 5]]);
    })));
  }
  if (shareTwitterButton) {
    var updateShareTwitterIcon = function updateShareTwitterIcon() {
      var svg = shareTwitterButton.querySelector('svg');
      if (svg) svg.setAttribute('fill', shareTwitterButton.classList.contains('active') ? 'currentColor' : 'none');
    };
    updateShareTwitterIcon();
    shareTwitterButton.addEventListener('click', function () {
      shareTwitterButton.classList.add('button-pop');
      shareTwitterButton.classList.toggle('active');
      updateShareTwitterIcon();
      if (shareMessage) {
        shareMessage.classList.remove('hidden');
        setTimeout(function () {
          shareMessage.classList.add('hidden');
        }, 2000);
      }
      setTimeout(function () {
        shareTwitterButton.classList.remove('button-pop');
      }, 300);
      sharePrompt(_state.appState.generatedPrompt, 'https://twitter.com/intent/tweet?text=');
    });
  }
  clearHistoryButton.addEventListener('click', function () {
    _state.appState.history = [];
    localStorage.setItem('promptHistory', JSON.stringify(_state.appState.history));
    renderHistory();
  });
  historyList.addEventListener('click', /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(e) {
      var copyBtn, saveBtn, shareBtn, siteShareBtn, deleteBtn, btn, index, text, li, saveIcon, saved, _yield$import3, savePrompt, retry, _yield$import4, retrySavePrompt, feedback, siteShareIcon, _yield$import5, _savePrompt, shareIcon, _t5, _t6, _t7;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            copyBtn = e.target.closest('.history-copy');
            saveBtn = e.target.closest('.history-save');
            shareBtn = e.target.closest('.history-share');
            siteShareBtn = e.target.closest('.history-site-share');
            deleteBtn = e.target.closest('.history-delete');
            btn = copyBtn || saveBtn || shareBtn || siteShareBtn || deleteBtn;
            if (btn) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            index = parseInt(btn.getAttribute('data-index'), 10);
            if (!Number.isNaN(index)) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2);
          case 2:
            text = _state.appState.history[index];
            if (!deleteBtn) {
              _context6.n = 3;
              break;
            }
            li = deleteBtn.closest('li');
            if (li) li.classList.add('fade-out');
            deleteBtn.classList.add('button-pop');
            setTimeout(function () {
              deleteBtn.classList.remove('button-pop');
            }, 300);
            setTimeout(function () {
              _state.appState.history.splice(index, 1);
              localStorage.setItem('promptHistory', JSON.stringify(_state.appState.history));
              renderHistory();
            }, 300);
            _context6.n = 24;
            break;
          case 3:
            if (text) {
              _context6.n = 4;
              break;
            }
            return _context6.a(2);
          case 4:
            if (!copyBtn) {
              _context6.n = 5;
              break;
            }
            navigator.clipboard.writeText(text).then(function () {
              var feedback = copyBtn.parentElement.querySelector('.history-copy-feedback');
              if (feedback) {
                feedback.classList.remove('hidden');
                setTimeout(function () {
                  return feedback.classList.add('hidden');
                }, 1000);
              }
              copyBtn.classList.add('button-pop');
              setTimeout(function () {
                copyBtn.classList.remove('button-pop');
              }, 300);
            })["catch"](function (err) {
              console.error('Failed to copy text: ', err);
            });
            _context6.n = 24;
            break;
          case 5:
            if (!saveBtn) {
              _context6.n = 16;
              break;
            }
            saveBtn.classList.toggle('active');
            saveIcon = saveBtn.querySelector('svg');
            if (saveIcon) saveIcon.setAttribute('fill', saveBtn.classList.contains('active') ? 'currentColor' : 'none');
            _state.appState.savedPrompts.push(text);
            localStorage.setItem('savedPrompts', JSON.stringify(_state.appState.savedPrompts));
            saved = true;
            if (!_state.appState.currentUser) {
              _context6.n = 15;
              break;
            }
            _context6.p = 6;
            _context6.n = 7;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('./prompt.js'));
            });
          case 7:
            _yield$import3 = _context6.v;
            savePrompt = _yield$import3.savePrompt;
            _context6.n = 8;
            return savePrompt(text, _state.appState.currentUser.uid, _state.appState.selectedCategory, _state.appState.currentUser.displayName || '', _state.appState.currentUser.email || '');
          case 8:
            _context6.n = 15;
            break;
          case 9:
            _context6.p = 9;
            _t5 = _context6.v;
            console.error(_t5);
            saved = false;
            if (saveErrorMessage) {
              saveErrorMessage.classList.remove('hidden');
            }
            retry = confirm("".concat(uiText[_state.appState.language].saveErrorMessage, " Retry?"));
            if (!retry) {
              _context6.n = 14;
              break;
            }
            _context6.p = 10;
            _context6.n = 11;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('./prompt.js'));
            });
          case 11:
            _yield$import4 = _context6.v;
            retrySavePrompt = _yield$import4.savePrompt;
            _context6.n = 12;
            return retrySavePrompt(text, _state.appState.currentUser.uid, undefined, _state.appState.currentUser.displayName || '', _state.appState.currentUser.email || '');
          case 12:
            saved = true;
            _context6.n = 14;
            break;
          case 13:
            _context6.p = 13;
            _t6 = _context6.v;
            console.error(_t6);
            saved = false;
          case 14:
            setTimeout(function () {
              if (saveErrorMessage) saveErrorMessage.classList.add('hidden');
            }, 2000);
          case 15:
            if (saved) {
              feedback = saveBtn.parentElement.querySelector('.save-feedback');
              if (feedback) {
                feedback.classList.remove('hidden');
                setTimeout(function () {
                  feedback.classList.add('hidden');
                }, 1000);
              }
            }
            saveBtn.classList.add('button-pop');
            setTimeout(function () {
              saveBtn.classList.remove('button-pop');
            }, 300);
            _context6.n = 24;
            break;
          case 16:
            if (!siteShareBtn) {
              _context6.n = 23;
              break;
            }
            if (_state.appState.currentUser) {
              _context6.n = 17;
              break;
            }
            alert(uiText[_state.appState.language].loginRequiredShare);
            return _context6.a(2);
          case 17:
            siteShareBtn.classList.toggle('active');
            siteShareIcon = siteShareBtn.querySelector('svg');
            if (siteShareIcon) siteShareIcon.setAttribute('fill', siteShareBtn.classList.contains('active') ? 'currentColor' : 'none');
            siteShareBtn.classList.add('button-pop');
            if (shareMessage) {
              shareMessage.classList.remove('hidden');
              setTimeout(function () {
                shareMessage.classList.add('hidden');
              }, 2000);
            }
            setTimeout(function () {
              siteShareBtn.classList.remove('button-pop');
            }, 300);
            _context6.p = 18;
            _context6.n = 19;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('./prompt.js'));
            });
          case 19:
            _yield$import5 = _context6.v;
            _savePrompt = _yield$import5.savePrompt;
            _context6.n = 20;
            return _savePrompt(text, _state.appState.currentUser.uid, _state.appState.selectedCategory, _state.appState.currentUser.displayName || '', _state.appState.currentUser.email || '');
          case 20:
            _context6.n = 22;
            break;
          case 21:
            _context6.p = 21;
            _t7 = _context6.v;
            console.error(_t7);
            alert(uiText[_state.appState.language].shareFailed);
          case 22:
            _context6.n = 24;
            break;
          case 23:
            if (shareBtn) {
              shareBtn.classList.toggle('active');
              shareIcon = shareBtn.querySelector('svg');
              if (shareIcon) shareIcon.setAttribute('fill', shareBtn.classList.contains('active') ? 'currentColor' : 'none');
              shareBtn.classList.add('button-pop');
              if (shareMessage) {
                shareMessage.classList.remove('hidden');
                setTimeout(function () {
                  shareMessage.classList.add('hidden');
                }, 2000);
              }
              setTimeout(function () {
                shareBtn.classList.remove('button-pop');
              }, 300);
              sharePrompt(text, 'https://twitter.com/intent/tweet?text=');
            }
          case 24:
            return _context6.a(2);
        }
      }, _callee6, null, [[18, 21], [10, 13], [6, 9]]);
    }));
    return function (_x3) {
      return _ref8.apply(this, arguments);
    };
  }());
  historyList.addEventListener('input', function (e) {
    var target = e.target.closest('.history-edit');
    if (!target) return;
    var idx = Number(target.getAttribute('data-index'));
    var value = 'value' in target ? target.value : target.textContent;
    if (!Number.isNaN(idx)) {
      _state.appState.history[idx] = value;
      localStorage.setItem('promptHistory', JSON.stringify(_state.appState.history));
    }
  });
  if (langToggleButton && langMenu) {
    langToggleButton.addEventListener('click', function () {
      langMenu.classList.toggle('hidden');
    });
  }
  if (currentLangLabel && langMenu) {
    currentLangLabel.addEventListener('click', function () {
      langMenu.classList.toggle('hidden');
    });
  }
  langEnButton.addEventListener('click', function () {
    return setLanguage('en');
  });
  langTrButton.addEventListener('click', function () {
    return setLanguage('tr');
  });
  if (langEsButton) {
    langEsButton.addEventListener('click', function () {
      return setLanguage('es');
    });
  }
  if (langFrButton) {
    langFrButton.addEventListener('click', function () {
      return setLanguage('fr');
    });
  }
  if (langZhButton) {
    langZhButton.addEventListener('click', function () {
      return setLanguage('zh');
    });
  }
  if (langHiButton) {
    langHiButton.addEventListener('click', function () {
      return setLanguage('hi');
    });
  }
  [langEnButton, langTrButton, langEsButton, langFrButton, langZhButton, langHiButton].forEach(function (btn) {
    if (btn) {
      btn.addEventListener('click', function () {
        langMenu && langMenu.classList.add('hidden');
      });
    }
  });
  themeLightButton.addEventListener('click', function () {
    return setTheme(_state.THEMES.LIGHT);
  });
  themeDarkButton.addEventListener('click', function () {
    return setTheme(_state.THEMES.DARK);
  });
};
var initializeApp = exports.initializeApp = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var href, parts, runLucide, savedLanguage, savedTheme;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
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
            href = themeLinkElement.getAttribute('href') || '';
            parts = href.split('?');
            if (parts[1]) {
              themeVersion = parts[1];
            }
          }
          appLogo = document.getElementById('app-logo');
          historyPanel = document.getElementById('history-panel');
          historyList = document.getElementById('history-list');
          clearHistoryButton = document.getElementById('clear-history');
          runLucide = function runLucide() {
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
              window.lucide.createIcons();
              document.querySelectorAll('#category-buttons .category-button').forEach(function (button) {
                var iconEl = button.querySelector('i[data-lucide]');
                var emojiEl = button.querySelector('.emoji-icon');
                if (!iconEl) return;
                var iconName = iconEl.getAttribute('data-lucide');
                var pascal = iconName.replace(/(^.|-.)/g, function (s) {
                  return s.replace('-', '').toUpperCase();
                });
                if (!window.lucide.icons || !window.lucide.icons[pascal]) {
                  var fallback = _prompts.ICON_FALLBACKS[iconName];
                  if (fallback) {
                    iconName = fallback;
                    iconEl.setAttribute('data-lucide', iconName);
                  }
                }
                var hasSvg = iconEl.querySelector('svg');
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
          savedLanguage = localStorage.getItem('language') || 'en'; // Apply the stored language preference. The call may redirect to the matching
          // language page unless a query parameter specifies a different one.
          _context7.n = 1;
          return setLanguage(savedLanguage, true);
        case 1:
          savedTheme = localStorage.getItem('theme') || _state.THEMES.DARK;
          setTheme(savedTheme);
          categoryButtonsContainer.innerHTML = '';
          _prompts.categories.forEach(function (category) {
            var button = document.createElement('button');
            button.id = "category-".concat(category.id);
            button.className = 'category-button focus:outline-none focus:ring-2 focus:ring-white/50';
            button.setAttribute('aria-label', "".concat(category.name[_state.appState.language], " category"));
            if (category.id === _state.appState.selectedCategory) {
              button.classList.add('selected');
            }
            button.innerHTML = "\n                    <span class=\"emoji-icon mr-1\" aria-hidden=\"true\">".concat(category.emoji, "</span>\n                    <i data-lucide=\"").concat(category.icon, "\" class=\"lucide\" aria-hidden=\"true\"></i>\n                    <span class=\"category-label\">").concat(category.name[_state.appState.language], "</span>");
            categoryButtonsContainer.appendChild(button);
          });
          if (window.lucideScripts && window.lucideScripts.loadPromise) {
            window.lucideScripts.loadPromise.then(runLucide);
          }
          renderHistory();
          setupEventListeners();
        case 2:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return function initializeApp() {
    return _ref9.apply(this, arguments);
  };
}();
