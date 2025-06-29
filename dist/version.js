"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startVersionCheck = exports.clearServiceWorkersAndCaches = void 0;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Version and cache management utilities
var currentManifestVersion = null;
var fetchManifestVersion = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var link, url, sep, res, data, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          link = document.querySelector('link[rel="manifest"]');
          if (link) {
            _context.n = 1;
            break;
          }
          return _context.a(2, null);
        case 1:
          url = link.href; // ensures correct path under <base>
          sep = url.includes('?') ? '&' : '?';
          _context.n = 2;
          return fetch("".concat(url).concat(sep, "v=").concat(Date.now()), {
            cache: 'no-store'
          });
        case 2:
          res = _context.v;
          if (res.ok) {
            _context.n = 3;
            break;
          }
          return _context.a(2, null);
        case 3:
          _context.n = 4;
          return res.json();
        case 4:
          data = _context.v;
          return _context.a(2, data.version);
        case 5:
          _context.p = 5;
          _t = _context.v;
          return _context.a(2, null);
      }
    }, _callee, null, [[0, 5]]);
  }));
  return function fetchManifestVersion() {
    return _ref.apply(this, arguments);
  };
}();
var startVersionCheck = exports.startVersionCheck = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return fetchManifestVersion();
        case 1:
          currentManifestVersion = _context3.v;
          setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
            var newVersion, banner, btn;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _context2.n = 1;
                  return fetchManifestVersion();
                case 1:
                  newVersion = _context2.v;
                  if (newVersion && currentManifestVersion && newVersion !== currentManifestVersion) {
                    if (!document.getElementById('update-banner')) {
                      banner = document.createElement('div');
                      banner.id = 'update-banner';
                      banner.textContent = 'A new version is available.';
                      banner.style.cssText = 'background:#fef08a;color:#000;padding:8px;text-align:center;font-size:14px;position:sticky;top:0;z-index:1000;';
                      btn = document.createElement('button');
                      btn.textContent = 'Refresh';
                      btn.style.cssText = 'margin-left:8px;text-decoration:underline;font-weight:bold;background:transparent;border:none;cursor:pointer;color:inherit;';
                      btn.addEventListener('click', function () {
                        clearServiceWorkersAndCaches();
                        location.reload();
                      });
                      banner.appendChild(btn);
                      document.body.prepend(banner);
                    }
                  }
                case 2:
                  return _context2.a(2);
              }
            }, _callee2);
          })), 5 * 60 * 1000);
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function startVersionCheck() {
    return _ref2.apply(this, arguments);
  };
}();
var clearServiceWorkersAndCaches = exports.clearServiceWorkersAndCaches = function clearServiceWorkersAndCaches() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      var _iterator = _createForOfIteratorHelper(regs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var reg = _step.value;
          reg.unregister()["catch"](function () {});
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    })["catch"](function () {});
  }
  if ('caches' in window) {
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        return caches["delete"](key);
      }));
    })["catch"](function () {});
  }
};

// automatically run when imported
startVersionCheck();
