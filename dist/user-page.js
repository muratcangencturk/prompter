"use strict";

var _user = require("./user.js");
var _auth = require("./auth.js");
var _prompt = require("./prompt.js");
var _prompts = require("./prompts.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var categoryMap = Object.fromEntries(_prompts.categories.map(function (c) {
  return [c.id, c.name.en];
}));
var getParam = function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
};
var renderPrompts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(prompts) {
    var _window$lucide;
    var list, likes, comments, shares, saves, _iterator, _step, p, card, text, cat;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          list = document.getElementById('prompt-list');
          list.innerHTML = '';
          likes = 0;
          comments = 0;
          shares = 0;
          saves = 0;
          _iterator = _createForOfIteratorHelper(prompts);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              p = _step.value;
              likes += p.likes || (Array.isArray(p.likedBy) ? p.likedBy.length : 0);
              shares += p.shareCount || (Array.isArray(p.sharedBy) ? p.sharedBy.length : 0);
              saves += p.saveCount || 0;
              comments += p.commentCount || 0;
              card = document.createElement('div');
              card.className = 'bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg';
              text = document.createElement('p');
              text.textContent = p.text;
              cat = document.createElement('p');
              cat.className = 'text-blue-200 text-xs mt-1';
              cat.textContent = categoryMap[p.category] || p.category || 'random';
              card.appendChild(text);
              card.appendChild(cat);
              list.appendChild(card);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          document.getElementById('stat-prompts').textContent = prompts.length.toString();
          document.getElementById('stat-likes').textContent = likes.toString();
          document.getElementById('stat-comments').textContent = comments.toString();
          document.getElementById('stat-saves').textContent = saves.toString();
          document.getElementById('stat-shares').textContent = shares.toString();
          (_window$lucide = window.lucide) === null || _window$lucide === void 0 || _window$lucide.createIcons();
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function renderPrompts(_x) {
    return _ref.apply(this, arguments);
  };
}();
var init = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var uid, nameQuery, name, dmLink, followersLink, followingLink, followersList, followingList, followerIds, followingIds, user, profile, bio, bioEl, schemaEl, updateFollowCounts, followBtn, currentUserId, updateDmLink, updateFollowBtn, showList, prompts;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          uid = getParam('uid');
          nameQuery = getParam('name');
          name = '';
          dmLink = document.getElementById('dm-link');
          followersLink = document.getElementById('stat-followers');
          followingLink = document.getElementById('stat-following');
          followersList = document.getElementById('followers-list');
          followingList = document.getElementById('following-list');
          followerIds = [];
          followingIds = [];
          if (!(!uid && nameQuery)) {
            _context7.n = 2;
            break;
          }
          _context7.n = 1;
          return (0, _user.getUserByName)(nameQuery);
        case 1:
          user = _context7.v;
          if (user) {
            uid = user.id;
            name = user.name || nameQuery;
          }
        case 2:
          if (uid) {
            _context7.n = 3;
            break;
          }
          document.getElementById('user-name').textContent = 'User not found';
          return _context7.a(2);
        case 3:
          _context7.n = 4;
          return (0, _user.getUserProfile)(uid);
        case 4:
          profile = _context7.v;
          if (profile && profile.name) name = profile.name;
          bio = profile && typeof profile.bio === 'string' ? profile.bio : '';
          document.getElementById('user-name').textContent = name || uid;
          bioEl = document.getElementById('user-bio');
          if (bioEl) bioEl.textContent = bio;
          schemaEl = document.getElementById('person-schema');
          if (schemaEl) {
            schemaEl.textContent = JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: name || uid,
              description: bio
            });
          }
          updateFollowCounts = /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    _context2.n = 1;
                    return (0, _user.getFollowingIds)(uid);
                  case 1:
                    followingIds = _context2.v;
                    _context2.n = 2;
                    return (0, _user.getFollowerIds)(uid);
                  case 2:
                    followerIds = _context2.v;
                    if (followingLink) followingLink.textContent = followingIds.length.toString();
                    if (followersLink) followersLink.textContent = followerIds.length.toString();
                  case 3:
                    return _context2.a(2);
                }
              }, _callee2);
            }));
            return function updateFollowCounts() {
              return _ref3.apply(this, arguments);
            };
          }();
          _context7.n = 5;
          return updateFollowCounts();
        case 5:
          followBtn = document.getElementById('follow-btn');
          currentUserId = null;
          updateDmLink = function updateDmLink() {
            if (!dmLink) return;
            if (currentUserId && currentUserId !== uid) {
              dmLink.href = "dm.html?uid=".concat(encodeURIComponent(uid));
              dmLink.classList.remove('hidden');
            } else {
              dmLink.classList.add('hidden');
            }
          };
          updateDmLink();
          updateFollowBtn = /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
              var following;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    if (!(!followBtn || !currentUserId || currentUserId === uid)) {
                      _context3.n = 1;
                      break;
                    }
                    followBtn === null || followBtn === void 0 || followBtn.classList.add('hidden');
                    return _context3.a(2);
                  case 1:
                    _context3.n = 2;
                    return (0, _user.isFollowing)(currentUserId, uid);
                  case 2:
                    following = _context3.v;
                    followBtn.textContent = following ? 'Unfollow' : 'Follow';
                    followBtn.dataset.following = following ? '1' : '0';
                    followBtn.classList.remove('hidden');
                  case 3:
                    return _context3.a(2);
                }
              }, _callee3);
            }));
            return function updateFollowBtn() {
              return _ref4.apply(this, arguments);
            };
          }();
          showList = /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(ids, container) {
              var names;
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.n) {
                  case 0:
                    if (container) {
                      _context4.n = 1;
                      break;
                    }
                    return _context4.a(2);
                  case 1:
                    container.innerHTML = '';
                    if (!(ids.length === 0)) {
                      _context4.n = 2;
                      break;
                    }
                    container.classList.toggle('hidden', false);
                    return _context4.a(2);
                  case 2:
                    _context4.n = 3;
                    return Promise.all(ids.map(function (id) {
                      return (0, _user.getUserProfile)(id).then(function (p) {
                        return (p === null || p === void 0 ? void 0 : p.name) || id;
                      });
                    }));
                  case 3:
                    names = _context4.v;
                    ids.forEach(function (id, idx) {
                      var a = document.createElement('a');
                      a.href = "user.html?uid=".concat(id);
                      a.className = 'block underline';
                      a.textContent = names[idx];
                      container.appendChild(a);
                    });
                    container.classList.toggle('hidden', false);
                  case 4:
                    return _context4.a(2);
                }
              }, _callee4);
            }));
            return function showList(_x2, _x3) {
              return _ref5.apply(this, arguments);
            };
          }();
          followBtn === null || followBtn === void 0 || followBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
            var following, _t;
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  if (currentUserId) {
                    _context5.n = 1;
                    break;
                  }
                  return _context5.a(2);
                case 1:
                  following = followBtn.dataset.following === '1';
                  followBtn.disabled = true;
                  _context5.p = 2;
                  if (!following) {
                    _context5.n = 4;
                    break;
                  }
                  _context5.n = 3;
                  return (0, _user.unfollowUser)(currentUserId, uid);
                case 3:
                  _context5.n = 5;
                  break;
                case 4:
                  _context5.n = 5;
                  return (0, _user.followUser)(currentUserId, uid);
                case 5:
                  _context5.n = 7;
                  break;
                case 6:
                  _context5.p = 6;
                  _t = _context5.v;
                  console.error('Follow toggle failed', _t);
                case 7:
                  followBtn.disabled = false;
                  _context5.n = 8;
                  return updateFollowBtn();
                case 8:
                  _context5.n = 9;
                  return updateFollowCounts();
                case 9:
                  return _context5.a(2);
              }
            }, _callee5, null, [[2, 6]]);
          })));
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
          (0, _auth.onAuth)(/*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(u) {
              return _regenerator().w(function (_context6) {
                while (1) switch (_context6.n) {
                  case 0:
                    currentUserId = u ? u.uid : null;
                    _context6.n = 1;
                    return updateFollowBtn();
                  case 1:
                    updateDmLink();
                    _context6.n = 2;
                    return updateFollowCounts();
                  case 2:
                    return _context6.a(2);
                }
              }, _callee6);
            }));
            return function (_x4) {
              return _ref7.apply(this, arguments);
            };
          }());
          _context7.n = 6;
          return (0, _prompt.getUserPrompts)(uid);
        case 6:
          prompts = _context7.v;
          _context7.n = 7;
          return renderPrompts(prompts);
        case 7:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return function init() {
    return _ref2.apply(this, arguments);
  };
}();
document.addEventListener('DOMContentLoaded', function () {
  if (window.firebaseInitPromise) window.firebaseInitPromise.then(init);else init();
});
