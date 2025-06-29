"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostText = exports.unsharePostByUser = exports.unlikePost = exports.sharePostByUser = exports.postScore = exports.likePost = exports.getComments = exports.getAllPosts = exports.deletePost = exports.createPost = exports.addComment = void 0;
var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js");
var _firebase = require("./firebase.js");
var _notifications = require("./notifications.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createPost = exports.createPost = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(text, userId) {
    var userName,
      userEmail,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          userName = _args.length > 2 && _args[2] !== undefined ? _args[2] : '';
          userEmail = _args.length > 3 && _args[3] !== undefined ? _args[3] : '';
          return _context.a(2, (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, 'blogPosts'), {
              text: text,
              userId: userId,
              userName: userName,
              userEmail: userEmail,
              createdAt: (0, _firebaseFirestore.serverTimestamp)(),
              likes: 0,
              likedBy: [],
              sharedBy: [userId],
              shared: true,
              shareCount: 1,
              commentCount: 0
            });
          }));
      }
    }, _callee);
  }));
  return function createPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAllPosts = exports.getAllPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var cacheKey, cached, q, snap, posts, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          cacheKey = 'blogCache';
          _context2.p = 1;
          cached = localStorage.getItem(cacheKey);
          if (!cached) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, JSON.parse(cached));
        case 2:
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t = _context2.v;
        case 4:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, 'blogPosts'), (0, _firebaseFirestore.where)('shared', '==', true), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'));
          _context2.n = 5;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDocs)(q);
          });
        case 5:
          snap = _context2.v;
          posts = snap.docs.map(function (d) {
            return _objectSpread({
              id: d.id
            }, d.data());
          });
          try {
            localStorage.setItem(cacheKey, JSON.stringify(posts));
          } catch (_unused2) {
            /* ignore */
          }
          return _context2.a(2, posts);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return function getAllPosts() {
    return _ref2.apply(this, arguments);
  };
}();
var likePost = exports.likePost = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(postId, userId) {
    var snap, owner;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId), {
              likes: (0, _firebaseFirestore.increment)(1),
              likedBy: (0, _firebaseFirestore.arrayUnion)(userId)
            });
          });
        case 1:
          _context3.n = 2;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId));
          });
        case 2:
          snap = _context3.v;
          owner = snap.exists() ? snap.data().userId : null;
          if (!(owner && owner !== userId)) {
            _context3.n = 3;
            break;
          }
          _context3.n = 3;
          return (0, _notifications.sendNotification)(owner, {
            type: 'like',
            targetId: postId,
            from: userId
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function likePost(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var unlikePost = exports.unlikePost = function unlikePost(postId, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId), {
      likes: (0, _firebaseFirestore.increment)(-1),
      likedBy: (0, _firebaseFirestore.arrayRemove)(userId)
    });
  });
};
var sharePostByUser = exports.sharePostByUser = function sharePostByUser(postId, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId), {
      sharedBy: (0, _firebaseFirestore.arrayUnion)(userId),
      shared: true,
      shareCount: (0, _firebaseFirestore.increment)(1)
    });
  });
};
var unsharePostByUser = exports.unsharePostByUser = function unsharePostByUser(postId, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId), {
      sharedBy: (0, _firebaseFirestore.arrayRemove)(userId),
      shareCount: (0, _firebaseFirestore.increment)(-1)
    });
  });
};
var addComment = exports.addComment = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(postId, userId, text) {
    var snap, owner;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, "blogPosts/".concat(postId, "/comments")), {
              text: text,
              userId: userId,
              createdAt: (0, _firebaseFirestore.serverTimestamp)()
            });
          });
        case 1:
          _context4.n = 2;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId), {
              commentCount: (0, _firebaseFirestore.increment)(1)
            });
          });
        case 2:
          _context4.n = 3;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId));
          });
        case 3:
          snap = _context4.v;
          owner = snap.exists() ? snap.data().userId : null;
          if (!(owner && owner !== userId)) {
            _context4.n = 4;
            break;
          }
          _context4.n = 4;
          return (0, _notifications.sendNotification)(owner, {
            type: 'comment',
            targetId: postId,
            from: userId
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function addComment(_x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
var getComments = exports.getComments = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(postId) {
    var q, snap;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, "blogPosts/".concat(postId, "/comments")), (0, _firebaseFirestore.orderBy)('createdAt', 'asc'));
          _context5.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDocs)(q);
          });
        case 1:
          snap = _context5.v;
          return _context5.a(2, snap.docs.map(function (d) {
            return _objectSpread({
              id: d.id
            }, d.data());
          }));
      }
    }, _callee5);
  }));
  return function getComments(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var updatePostText = exports.updatePostText = function updatePostText(postId, newText) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId), {
      text: newText
    });
  });
};
var deletePost = exports.deletePost = function deletePost(postId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.deleteDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'blogPosts', postId));
  });
};
var postScore = exports.postScore = function postScore() {
  var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref6$likes = _ref6.likes,
    likes = _ref6$likes === void 0 ? 0 : _ref6$likes,
    _ref6$commentCount = _ref6.commentCount,
    commentCount = _ref6$commentCount === void 0 ? 0 : _ref6$commentCount;
  return likes + commentCount;
};
