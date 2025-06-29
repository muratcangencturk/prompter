"use strict";

var _auth = require("./auth.js");
var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js");
var _firebase = require("./firebase.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MAX_MESSAGE_LENGTH = 500;
var MAX_NAME_LENGTH = 50;
// Allow letters, numbers, punctuation and whitespace
var allowedChars = /^(?:[ -#%-\*,-;\?-\]_a-\{\}\xA0\xA1\xA7\xAA\xAB\xB2\xB3\xB5-\xB7\xB9-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559-\u058A\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05EF-\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u064A\u0660-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF-\u070D\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07F7-\u07FA\u0800-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0964-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u09FD\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A76\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AF0\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C77-\u0C7E\u0C80\u0C84-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0DF4\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E4F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F04-\u0F12\u0F14\u0F20-\u0F33\u0F3A-\u0F3D\u0F40-\u0F47\u0F49-\u0F6C\u0F85\u0F88-\u0F8C\u0FD0-\u0FD4\u0FD9\u0FDA\u1000-\u102A\u103F-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1400-\u166C\u166E-\u169C\u16A0-\u16F8\u1700-\u1711\u171F-\u1731\u1735\u1736\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D4-\u17DA\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1800-\u180A\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1944-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A1E-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1B05-\u1B33\u1B45-\u1B4C\u1B4E-\u1B60\u1B7D-\u1B7F\u1B83-\u1BA0\u1BAE-\u1BE5\u1BFC-\u1C23\u1C3B-\u1C49\u1C4D-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD3\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2000-\u200A\u2010-\u2027\u202F-\u2043\u2045-\u2051\u2053-\u205F\u2070\u2071\u2074-\u2079\u207D-\u2089\u208D\u208E\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2308-\u230B\u2329\u232A\u2460-\u249B\u24EA-\u24FF\u2768-\u2793\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CF9-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E00-\u2E4F\u2E52-\u2E5D\u3000-\u3003\u3005-\u3011\u3014-\u301F\u3021-\u3029\u3030-\u3035\u3038-\u303D\u3041-\u3096\u309D-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA62B\uA640-\uA66E\uA673\uA67E-\uA69D\uA6A0-\uA6EF\uA6F2-\uA6F7\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA877\uA882-\uA8B3\uA8CE-\uA8D9\uA8F2-\uA8FE\uA900-\uA925\uA92E-\uA946\uA95F-\uA97C\uA984-\uA9B2\uA9C1-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA5C-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAAEA\uAAF0-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABEB\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3F\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFE70-\uFE74\uFE76-\uFEFC\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF1B\uFF1F-\uFF3D\uFF3F\uFF41-\uFF5B\uFF5D\uFF5F-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD00-\uDD02\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDF9F-\uDFC3\uDFC8-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD6F-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC57-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD1F-\uDD39\uDD3F\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE50-\uDE58\uDE60-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEF6\uDF00-\uDF35\uDF39-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDF99-\uDF9C\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDD40-\uDD65\uDD6E-\uDD85\uDE60-\uDE7E\uDE80-\uDEA9\uDEAD\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF59\uDF70-\uDF81\uDF86-\uDF89\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC47-\uDC4D\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCBB\uDCBC\uDCBE-\uDCC1\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD44\uDD47\uDD50-\uDD72\uDD74-\uDD76\uDD83-\uDDB2\uDDC1-\uDDC8\uDDCD\uDDD0-\uDDDF\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE38-\uDE3D\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA9\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3-\uDFD5\uDFD7\uDFD8]|\uD805[\uDC00-\uDC34\uDC47-\uDC5B\uDC5D\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4-\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDC1-\uDDDB\uDE00-\uDE2F\uDE41-\uDE44\uDE50-\uDE59\uDE60-\uDE6C\uDE80-\uDEAA\uDEB8\uDEB9\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF30-\uDF3E\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDC3B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD44-\uDD46\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1-\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE3F-\uDE46\uDE50\uDE5C-\uDE89\uDE9A-\uDEA2\uDEB0-\uDEF8\uDF00-\uDF09\uDFC0-\uDFE1\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40-\uDC45\uDC50-\uDC6C\uDC70-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDEF7\uDEF8\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF43-\uDF59\uDFB0\uDFC0-\uDFD4\uDFFF]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC70-\uDC74\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF2]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D\uDD30-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE6E-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDEF5\uDF00-\uDF2F\uDF37-\uDF3B\uDF40-\uDF44\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD79\uDE40-\uDE9A\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0-\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9F]|\uD833[\uDCF0-\uDCF9]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE87-\uDE8B]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDDD0-\uDDED\uDDF0-\uDDFA\uDDFF\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59\uDD5E\uDD5F]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])+$/;
var sanitizeText = function sanitizeText(str) {
  return str.replace(/[<>]/g, '');
};
var isValidInput = function isValidInput(str, maxLen) {
  return !!str && str.length <= maxLen && allowedChars.test(str);
};
var currentUser = null;
var unsubscribeMsgs = null;
var convListEl = document.getElementById('conv-list');
var messagesEl = document.getElementById('messages');
var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var createConvBtn = document.getElementById('create-conv');
var renderConversations = function renderConversations(convs) {
  convListEl.innerHTML = '';
  convs.forEach(function (c) {
    var li = document.createElement('li');
    li.textContent = c.name || c.id;
    li.className = 'cursor-pointer p-1 rounded hover:bg-white/20';
    li.addEventListener('click', function () {
      return openConversation(c.id);
    });
    convListEl.appendChild(li);
  });
};
var listenConversations = function listenConversations(uid) {
  var q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, 'conversations'), (0, _firebaseFirestore.where)('members', 'array-contains', uid), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'));
  return (0, _firebaseFirestore.onSnapshot)(q, function (snap) {
    var data = snap.docs.map(function (d) {
      return _objectSpread({
        id: d.id
      }, d.data());
    });
    renderConversations(data);
  });
};
var openConversation = function openConversation(convId) {
  var _unsubscribeMsgs;
  messageForm.dataset.convId = convId;
  messagesEl.innerHTML = '';
  (_unsubscribeMsgs = unsubscribeMsgs) === null || _unsubscribeMsgs === void 0 || _unsubscribeMsgs();
  var q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, "conversations/".concat(convId, "/messages")), (0, _firebaseFirestore.orderBy)('createdAt', 'asc'));
  unsubscribeMsgs = (0, _firebaseFirestore.onSnapshot)(q, function (snap) {
    messagesEl.innerHTML = '';
    snap.docs.forEach(function (d) {
      var m = d.data();
      var div = document.createElement('div');
      div.textContent = "".concat(m.userId, ": ").concat(m.text);
      messagesEl.appendChild(div);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
};
messageForm.addEventListener('submit', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
    var convId, text, cleanText;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          e.preventDefault();
          convId = messageForm.dataset.convId;
          text = messageInput.value.trim();
          if (!(!convId || !text)) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          if (isValidInput(text, MAX_MESSAGE_LENGTH)) {
            _context.n = 2;
            break;
          }
          alert('Message contains invalid characters or is too long.');
          return _context.a(2);
        case 2:
          cleanText = sanitizeText(text);
          _context.n = 3;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, "conversations/".concat(convId, "/messages")), {
              text: cleanText,
              userId: currentUser.uid,
              createdAt: (0, _firebaseFirestore.serverTimestamp)()
            });
          });
        case 3:
          messageInput.value = '';
        case 4:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
createConvBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var name, membersRaw, members;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        if (currentUser) {
          _context2.n = 1;
          break;
        }
        return _context2.a(2);
      case 1:
        name = prompt('Group name');
        if (!(name && !isValidInput(name.trim(), MAX_NAME_LENGTH))) {
          _context2.n = 2;
          break;
        }
        alert('Conversation name contains invalid characters or is too long.');
        return _context2.a(2);
      case 2:
        membersRaw = prompt('Comma-separated user IDs');
        if (membersRaw) {
          _context2.n = 3;
          break;
        }
        return _context2.a(2);
      case 3:
        members = Array.from(new Set([currentUser.uid].concat(_toConsumableArray(membersRaw.split(',').map(function (m) {
          return m.trim();
        }).filter(Boolean)))));
        _context2.n = 4;
        return (0, _firebase.withRetry)(function () {
          return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, 'conversations'), {
            name: name ? sanitizeText(name.trim()) : '',
            members: members,
            createdBy: currentUser.uid,
            createdAt: (0, _firebaseFirestore.serverTimestamp)()
          });
        });
      case 4:
        return _context2.a(2);
    }
  }, _callee2);
})));
(0, _auth.onAuth)(function (user) {
  currentUser = user;
  if (!user) return;
  listenConversations(user.uid);
});
