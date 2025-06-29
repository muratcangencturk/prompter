"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firebaseReady = exports.db = exports.auth = exports.app = void 0;
exports.initFirebase = initFirebase;
exports.loadFirebaseConfig = loadFirebaseConfig;
exports.withRetry = withRetry;
var _firebaseApp = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js");
var _firebaseAuth = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js");
var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js");
var _auth = require("./auth.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function loadFirebaseConfig() {
  return _loadFirebaseConfig.apply(this, arguments);
}
function _loadFirebaseConfig() {
  _loadFirebaseConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var retries,
      res,
      cfg,
      _args = arguments,
      _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          retries = _args.length > 0 && _args[0] !== undefined ? _args[0] : 3;
          if (!window.firebaseConfig) {
            _context.n = 1;
            break;
          }
          return _context.a(2, window.firebaseConfig);
        case 1:
          if (!(retries > 0)) {
            _context.n = 9;
            break;
          }
          _context.p = 2;
          _context.n = 3;
          return fetch('./firebase.config.json');
        case 3:
          res = _context.v;
          if (res.ok) {
            _context.n = 4;
            break;
          }
          throw new Error('Firebase configuration not found');
        case 4:
          _context.n = 5;
          return res.json();
        case 5:
          cfg = _context.v;
          window.firebaseConfig = cfg;
          return _context.a(2, cfg);
        case 6:
          _context.p = 6;
          _t = _context.v;
          retries -= 1;
          if (retries) {
            _context.n = 7;
            break;
          }
          console.error('Failed to load Firebase config:', _t);
          return _context.a(2, null);
        case 7:
          _context.n = 8;
          return new Promise(function (r) {
            return setTimeout(r, 1000);
          });
        case 8:
          _context.n = 1;
          break;
        case 9:
          return _context.a(2);
      }
    }, _callee, null, [[2, 6]]);
  }));
  return _loadFirebaseConfig.apply(this, arguments);
}
function withRetry(_x) {
  return _withRetry.apply(this, arguments);
}
function _withRetry() {
  _withRetry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(fn) {
    var retries,
      delay,
      lastError,
      i,
      _args2 = arguments,
      _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          retries = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 3;
          delay = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 500;
          i = 0;
        case 1:
          if (!(i < retries)) {
            _context2.n = 6;
            break;
          }
          _context2.p = 2;
          _context2.n = 3;
          return fn();
        case 3:
          return _context2.a(2, _context2.v);
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          lastError = _t2;
          if (!(i < retries - 1)) {
            _context2.n = 5;
            break;
          }
          _context2.n = 5;
          return new Promise(function (r) {
            return setTimeout(r, delay);
          });
        case 5:
          i += 1;
          _context2.n = 1;
          break;
        case 6:
          throw lastError;
        case 7:
          return _context2.a(2);
      }
    }, _callee2, null, [[2, 4]]);
  }));
  return _withRetry.apply(this, arguments);
}
var app;
var auth;
var db;
var readyResolve;
var firebaseReady = exports.firebaseReady = new Promise(function (resolve) {
  readyResolve = resolve;
});
function initFirebase(config) {
  exports.app = app = (0, _firebaseApp.initializeApp)(config);
  exports.auth = auth = (0, _firebaseAuth.getAuth)(app);
  exports.db = db = (0, _firebaseFirestore.initializeFirestore)(app, {
    localCache: (0, _firebaseFirestore.persistentLocalCache)({
      tabManager: (0, _firebaseFirestore.persistentMultipleTabManager)()
    })
  });
  _auth.pendingAuthCallbacks.forEach(function (cb) {
    return (0, _firebaseAuth.onAuthStateChanged)(auth, cb);
  });
  _auth.pendingAuthCallbacks.length = 0;
  readyResolve();
}
