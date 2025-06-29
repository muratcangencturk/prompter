"use strict";

var _ui = require("./ui.js");
var _auth = require("./auth.js");
var _notifications = require("./notifications.js");
var _state = require("./state.js");
var _prompt = require("./prompt.js");
var _user = require("./user.js");
var _firebase = require("./firebase.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var notificationBtn;
var notificationCountEl;
var notificationsPanel;
var notifications = [];
var unsubscribeNotifications;
var socialBadge;
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
    link.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!_state.appState.currentUser) {
              _context.n = 4;
              break;
            }
            _context.p = 1;
            _context.n = 2;
            return (0, _notifications.markNotificationRead)(_state.appState.currentUser.uid, n.id);
          case 2:
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            console.error('Failed to mark notification read:', _t);
          case 4:
            n.read = true;
            _renderNotifications();
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3]]);
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
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var unread;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (_state.appState.currentUser) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          unread = notifications.filter(function (n) {
            return !n.read;
          });
          if (unread.length) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2);
        case 2:
          _context2.n = 3;
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
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function markAllNotificationsRead() {
    return _ref2.apply(this, arguments);
  };
}();
var hideEmptyAdSlots = function hideEmptyAdSlots() {
  var slots = document.querySelectorAll('.ad-slot');
  slots.forEach(function (slot) {
    var hasAd = slot.querySelector('iframe, img, ins');
    if (!hasAd || slot.offsetHeight < 5) {
      slot.remove();
    }
  });
};
var checkForNewPrompts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(uid) {
    var last, local, remote, newest, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (_firebase.db) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          if (!socialBadge) {
            socialBadge = document.getElementById('social-new-badge');
          }
          if (socialBadge) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2);
        case 2:
          _context3.p = 2;
          last = 0;
          local = parseInt(localStorage.getItem('socialLastVisit'), 10);
          if (!Number.isNaN(local)) last = local;
          if (!uid) {
            _context3.n = 4;
            break;
          }
          _context3.n = 3;
          return (0, _user.getLastSocialVisit)(uid);
        case 3:
          remote = _context3.v;
          if (remote && remote > last) {
            last = remote;
            localStorage.setItem('socialLastVisit', String(remote));
          }
        case 4:
          _context3.n = 5;
          return (0, _prompt.getNewestPromptTimestamp)();
        case 5:
          newest = _context3.v;
          if (newest && newest > last) socialBadge.classList.remove('hidden');else socialBadge.classList.add('hidden');
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t2 = _context3.v;
          console.error('Failed to check new prompts:', _t2);
        case 7:
          return _context3.a(2);
      }
    }, _callee3, null, [[2, 6]]);
  }));
  return function checkForNewPrompts(_x) {
    return _ref3.apply(this, arguments);
  };
}();
document.addEventListener('DOMContentLoaded', function () {
  var _notificationBtn;
  if (window.stopInit) return;
  (0, _ui.initializeApp)();
  notificationBtn = document.getElementById('notifications-btn');
  notificationCountEl = document.getElementById('notification-count');
  notificationsPanel = document.getElementById('notifications-panel');
  (_notificationBtn = notificationBtn) === null || _notificationBtn === void 0 || _notificationBtn.addEventListener('click', function () {
    var _notificationsPanel, _notificationsPanel2;
    var wasHidden = (_notificationsPanel = notificationsPanel) === null || _notificationsPanel === void 0 ? void 0 : _notificationsPanel.classList.contains('hidden');
    (_notificationsPanel2 = notificationsPanel) === null || _notificationsPanel2 === void 0 || _notificationsPanel2.classList.toggle('hidden');
    if (wasHidden) markAllNotificationsRead();
  });
  var start = function start() {
    checkForNewPrompts();
    (0, _auth.onAuth)(function (user) {
      _state.appState.currentUser = user;
      if (!user) {
        var _unsubscribeNotificat2;
        notifications = [];
        _renderNotifications();
        (_unsubscribeNotificat2 = unsubscribeNotifications) === null || _unsubscribeNotificat2 === void 0 || _unsubscribeNotificat2();
        checkForNewPrompts();
        return;
      }
      initNotifications(user.uid);
      checkForNewPrompts(user.uid);
    });
  };
  if (window.firebaseInitPromise) window.firebaseInitPromise.then(start);else start();
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  setTimeout(hideEmptyAdSlots, 4000);
});
