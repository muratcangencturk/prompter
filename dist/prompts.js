"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFullSentences = exports.loadCategory = exports.generatePrompt = exports.categories = exports.ICON_FALLBACKS = void 0;
var _state = require("./state.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var loadedPrompts = {};
var loadedFullSentences = {};
var getRandomElement = function getRandomElement(array) {
  var history = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!array || array.length === 0) return '';
  var available = array.filter(function (item) {
    return !history.includes(item);
  });
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }
  return array[Math.floor(Math.random() * array.length)];
};
var join = function join(arr) {
  return arr.join(' ').replace(/\s+([,.!?])/g, '$1').replace(/\s+\n/g, ' ').trim();
};
var punctuate = function punctuate(str) {
  return /[.!?]$/.test(str) ? str : str + '.';
};
var structures = {
  singleSentence: function singleSentence(parts) {
    return punctuate(join(parts));
  },
  twoSentence: function twoSentence(parts) {
    var first = punctuate(join(parts.slice(0, 3)));
    var second = punctuate(parts[3].trim());
    return "".concat(first, " ").concat(second);
  },
  questionThenInstruction: function questionThenInstruction(parts) {
    var first = punctuate(join(parts.slice(0, 2)));
    var rest = "".concat(parts[2].trim(), " ").concat(parts[3].trim());
    return "".concat(first, " ").concat(punctuate(rest));
  },
  imageStructure: function imageStructure(parts) {
    var first = punctuate(join(parts.slice(0, 2)));
    var rest = "".concat(parts[2].trim(), " ").concat(parts[3].trim());
    return "".concat(first, " ").concat(punctuate(rest));
  }
};
var catMap = {
  inspiring: 'singleSentence',
  mindBlowing: 'questionThenInstruction',
  productivity: 'twoSentence',
  educational: 'twoSentence',
  crazy: 'twoSentence',
  perspective: 'twoSentence',
  ai: 'twoSentence',
  ideas: 'twoSentence',
  video: 'questionThenInstruction',
  image: 'imageStructure',
  hellprompts: 'twoSentence'
};
var categories = exports.categories = [{
  id: 'random',
  icon: 'shuffle',
  emoji: '🔀',
  name: {
    en: 'Random',
    tr: 'Rastgele',
    es: 'Aleatorio',
    zh: '随机',
    fr: 'Aléatoire',
    hi: 'रैंडम'
  }
}, {
  id: 'inspiring',
  icon: 'sunrise',
  emoji: '🌅',
  name: {
    en: 'Inspiring',
    tr: 'İlham Verici',
    es: 'Inspirador',
    zh: '鼓舞人心',
    fr: 'Inspirant',
    hi: 'प्रेरणादायक'
  }
}, {
  id: 'mindBlowing',
  icon: 'brain-circuit',
  emoji: '🤯',
  name: {
    en: 'Interesting',
    tr: 'İlginç',
    es: 'Interesante',
    zh: '有趣',
    fr: 'Intéressant',
    hi: 'दिलचस्प'
  }
}, {
  id: 'productivity',
  icon: 'zap',
  emoji: '⚡',
  name: {
    en: 'Productivity',
    tr: 'Üretkenlik',
    es: 'Productividad',
    zh: '生产力',
    fr: 'Productivité',
    hi: 'उत्पादकता'
  }
}, {
  id: 'educational',
  icon: 'graduation-cap',
  emoji: '🎓',
  name: {
    en: 'Educational',
    tr: 'Eğitici',
    es: 'Educativo',
    zh: '教育',
    fr: 'Éducatif',
    hi: 'शैक्षिक'
  }
}, {
  id: 'crazy',
  icon: 'laugh',
  emoji: '😂',
  name: {
    en: 'Crazy',
    tr: 'Uçuk',
    es: 'Ideas Locas',
    zh: '疯狂',
    fr: 'Idées Folles',
    hi: 'पागलपन'
  }
}, {
  id: 'perspective',
  icon: 'glasses',
  emoji: '🕶️',
  name: {
    en: 'Perspective',
    tr: 'Bakış Açısı',
    es: 'Perspectiva',
    zh: '视角',
    fr: 'Perspective',
    hi: 'दृष्टिकोण'
  }
}, {
  id: 'ai',
  icon: 'cpu',
  emoji: '🤖',
  name: {
    en: 'AI',
    tr: 'YZ',
    es: 'IA',
    zh: '人工智能',
    fr: 'IA',
    hi: 'एआई'
  }
}, {
  id: 'ideas',
  icon: 'lightbulb',
  emoji: '💡',
  name: {
    en: 'Ideas',
    tr: 'Fikirler',
    es: 'Ideas',
    zh: '创意',
    fr: 'Idées',
    hi: 'विचार'
  }
}, {
  id: 'video',
  icon: 'video',
  emoji: '🎬',
  name: {
    en: 'Video',
    tr: 'Video',
    es: 'Video',
    zh: '视频',
    fr: 'Vidéo',
    hi: 'वीडियो'
  }
}, {
  id: 'image',
  icon: 'image',
  emoji: '🖼️',
  name: {
    en: 'Image',
    tr: 'Görsel',
    es: 'Imagen',
    zh: '图像',
    fr: 'Image',
    hi: 'छवि'
  }
}, {
  id: 'hellprompts',
  icon: 'skull',
  emoji: '💀',
  name: {
    en: 'Hellprompts',
    tr: 'Hellprompts',
    es: 'Hellprompts',
    zh: '地狱提示',
    fr: 'Hellprompts',
    hi: 'हेलप्रॉम्प्ट्स'
  }
}];
var ICON_FALLBACKS = exports.ICON_FALLBACKS = {
  'brain-circuits': 'brain-circuit'
};
var loadCategory = exports.loadCategory = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(lang, cat) {
    var cached, preloaded, data, res;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          loadedPrompts[lang] = loadedPrompts[lang] || {};
          cached = loadedPrompts[lang][cat];
          if (!cached) {
            _context.n = 1;
            break;
          }
          if (!cached.structure) {
            loadedPrompts[lang][cat] = _objectSpread(_objectSpread({}, cached), {}, {
              structure: structures[catMap[cat]]
            });
          }
          return _context.a(2, loadedPrompts[lang][cat]);
        case 1:
          preloaded = window.prompts && window.prompts[lang] && window.prompts[lang][cat];
          if (!preloaded) {
            _context.n = 2;
            break;
          }
          // copy preloaded data so global window.prompts is never mutated
          data = _objectSpread({}, preloaded);
          _context.n = 5;
          break;
        case 2:
          _context.n = 3;
          return fetch("prompts/".concat(lang, "/").concat(cat, ".json"), {
            cache: 'no-store'
          });
        case 3:
          res = _context.v;
          _context.n = 4;
          return res.json();
        case 4:
          data = _context.v;
        case 5:
          data = _objectSpread(_objectSpread({}, data), {}, {
            structure: structures[catMap[cat]]
          });
          loadedPrompts[lang][cat] = data;
          return _context.a(2, data);
      }
    }, _callee);
  }));
  return function loadCategory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var loadFullSentences = exports.loadFullSentences = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(lang) {
    var res, data;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (!loadedFullSentences[lang]) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, loadedFullSentences[lang]);
        case 1:
          _context2.n = 2;
          return fetch("fullsentenceprompts.".concat(lang, ".json"), {
            cache: 'no-store'
          });
        case 2:
          res = _context2.v;
          _context2.n = 3;
          return res.json();
        case 3:
          data = _context2.v;
          loadedFullSentences[lang] = data;
          return _context2.a(2, data);
      }
    }, _callee2);
  }));
  return function loadFullSentences(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var generatePrompt = exports.generatePrompt = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var selectedCatId, isRandom, sentences, prompt, availableCategories, categoryData, promptParts, newPrompt;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (navigator.onLine) {
            _context3.n = 1;
            break;
          }
          throw new Error('offline');
        case 1:
          _state.appState.isGenerating = true;
          selectedCatId = _state.appState.selectedCategory;
          isRandom = selectedCatId === 'random';
          if (!isRandom) {
            _context3.n = 4;
            break;
          }
          if (!_state.appState.useFullSentenceNext) {
            _context3.n = 3;
            break;
          }
          _context3.n = 2;
          return loadFullSentences(_state.appState.language);
        case 2:
          sentences = _context3.v;
          prompt = getRandomElement(sentences);
          _state.appState.generatedPrompt = prompt;
          _state.appState.isGenerating = false;
          _state.appState.useFullSentenceNext = false;
          return _context3.a(2, {
            prompt: prompt,
            categoryId: 'random'
          });
        case 3:
          availableCategories = categories.filter(function (c) {
            return c.id !== 'random';
          });
          selectedCatId = availableCategories[Math.floor(Math.random() * availableCategories.length)].id;
          _state.appState.useFullSentenceNext = true;
        case 4:
          _context3.n = 5;
          return loadCategory(_state.appState.language, selectedCatId);
        case 5:
          categoryData = _context3.v;
          if (!(!categoryData || !categoryData.parts || !Array.isArray(categoryData.parts))) {
            _context3.n = 6;
            break;
          }
          _state.appState.isGenerating = false;
          throw new Error('Invalid category data');
        case 6:
          promptParts = categoryData.parts.map(function (partArray, idx) {
            if (!_state.appState.partHistory[idx]) {
              _state.appState.partHistory[idx] = [];
            }
            var element = getRandomElement(partArray, _state.appState.partHistory[idx]);
            _state.appState.partHistory[idx].push(element);
            if (_state.appState.partHistory[idx].length > _state.appState.HISTORY_SIZE) {
              _state.appState.partHistory[idx].shift();
            }
            return element;
          });
          newPrompt = categoryData.structure ? categoryData.structure(promptParts) : promptParts.join(' ');
          _state.appState.generatedPrompt = newPrompt;
          _state.appState.isGenerating = false;
          return _context3.a(2, {
            prompt: newPrompt,
            categoryId: isRandom ? 'random' : selectedCatId
          });
      }
    }, _callee3);
  }));
  return function generatePrompt() {
    return _ref3.apply(this, arguments);
  };
}();
