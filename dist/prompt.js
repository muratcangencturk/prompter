"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePromptText = exports.updateComment = exports.unsharePromptByUser = exports.unsharePrompt = exports.unlikePrompt = exports.sharePromptByUser = exports.saveUserPrompt = exports.savePrompt = exports.likePrompt = exports.incrementShareCount = exports.incrementSaveCount = exports.getUserSavedPrompts = exports.getUserPrompts = exports.getNewestPromptTimestamp = exports.getComments = exports.getAllPrompts = exports.generatePrompt = exports.deleteComment = exports.addComment = void 0;
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
var samplePrompts = ['Describe a futuristic city where nature and technology coexist.', 'Write a short story about a robot learning emotions.', 'Imagine you can talk to animals for a day. What happens?', 'Create a prompt for an artwork about space exploration.'];
var generatePrompt = exports.generatePrompt = function generatePrompt() {
  var idx = Math.floor(Math.random() * samplePrompts.length);
  return samplePrompts[idx];
};
var savePrompt = exports.savePrompt = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(text, userId) {
    var category,
      userName,
      userEmail,
      q,
      snap,
      ref,
      _args = arguments,
      _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          category = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'random';
          userName = _args.length > 3 && _args[3] !== undefined ? _args[3] : '';
          userEmail = _args.length > 4 && _args[4] !== undefined ? _args[4] : '';
          _context.p = 1;
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, 'prompts'), (0, _firebaseFirestore.where)('userId', '==', userId), (0, _firebaseFirestore.where)('text', '==', text));
          _context.n = 2;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDocs)(q);
          });
        case 2:
          snap = _context.v;
          if (snap.empty) {
            _context.n = 4;
            break;
          }
          ref = snap.docs[0].ref;
          _context.n = 3;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.updateDoc)(ref, {
              category: category,
              shared: true,
              sharedBy: (0, _firebaseFirestore.arrayUnion)(userId),
              shareCount: (0, _firebaseFirestore.increment)(1),
              userName: userName,
              userEmail: userEmail
            });
          });
        case 3:
          return _context.a(2, ref);
        case 4:
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error('Failed to check existing prompt:', _t);
        case 6:
          return _context.a(2, (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, 'prompts'), {
              text: text,
              userId: userId,
              userName: userName,
              userEmail: userEmail,
              category: category,
              createdAt: (0, _firebaseFirestore.serverTimestamp)(),
              likes: 0,
              likedBy: [],
              sharedBy: [userId],
              shared: true,
              saveCount: 0,
              shareCount: 1,
              commentCount: 0
            });
          }));
      }
    }, _callee, null, [[1, 5]]);
  }));
  return function savePrompt(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getUserPrompts = exports.getUserPrompts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(userId) {
    var q, snap, prompts, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, 'prompts'), (0, _firebaseFirestore.where)('userId', '==', userId), (0, _firebaseFirestore.where)('sharedBy', 'array-contains', userId));
          _context2.p = 1;
          _context2.n = 2;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDocs)(q);
          });
        case 2:
          snap = _context2.v;
          prompts = snap.docs.map(function (d) {
            return _objectSpread({
              id: d.id,
              category: d.get('category') || 'random'
            }, d.data());
          });
          prompts.sort(function (a, b) {
            return b.createdAt.toMillis() - a.createdAt.toMillis();
          });
          return _context2.a(2, prompts);
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          console.error('Failed to load user prompts:', _t2);
          return _context2.a(2, []);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return function getUserPrompts(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllPrompts = exports.getAllPrompts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var q, snap;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, 'prompts'), (0, _firebaseFirestore.where)('shared', '==', true), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'));
          _context3.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDocs)(q);
          });
        case 1:
          snap = _context3.v;
          return _context3.a(2, snap.docs.map(function (d) {
            return _objectSpread({
              id: d.id,
              category: d.get('category') || 'random'
            }, d.data());
          }).filter(function (p) {
            return Array.isArray(p.sharedBy) && p.sharedBy.length > 0;
          }));
      }
    }, _callee3);
  }));
  return function getAllPrompts() {
    return _ref3.apply(this, arguments);
  };
}();
var likePrompt = exports.likePrompt = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(promptId, userId) {
    var snap, owner;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
              likes: (0, _firebaseFirestore.increment)(1),
              likedBy: (0, _firebaseFirestore.arrayUnion)(userId)
            });
          });
        case 1:
          _context4.n = 2;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId));
          });
        case 2:
          snap = _context4.v;
          owner = snap.exists() ? snap.data().userId : null;
          if (!(owner && owner !== userId)) {
            _context4.n = 3;
            break;
          }
          _context4.n = 3;
          return (0, _notifications.sendNotification)(owner, {
            type: 'like',
            promptId: promptId,
            from: userId
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function likePrompt(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
var unlikePrompt = exports.unlikePrompt = function unlikePrompt(promptId, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
      likes: (0, _firebaseFirestore.increment)(-1),
      likedBy: (0, _firebaseFirestore.arrayRemove)(userId)
    });
  });
};
var unsharePrompt = exports.unsharePrompt = function unsharePrompt(promptId, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
      sharedBy: (0, _firebaseFirestore.arrayRemove)(userId),
      shared: false
    });
  });
};
var sharePromptByUser = exports.sharePromptByUser = function sharePromptByUser(promptId, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
      sharedBy: (0, _firebaseFirestore.arrayUnion)(userId),
      shared: true,
      shareCount: (0, _firebaseFirestore.increment)(1)
    });
  });
};
var unsharePromptByUser = exports.unsharePromptByUser = function unsharePromptByUser(promptId, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
      sharedBy: (0, _firebaseFirestore.arrayRemove)(userId),
      shareCount: (0, _firebaseFirestore.increment)(-1)
    });
  });
};
var saveUserPrompt = exports.saveUserPrompt = function saveUserPrompt(text, userId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, "users/".concat(userId, "/savedPrompts")), {
      text: text,
      createdAt: (0, _firebaseFirestore.serverTimestamp)()
    });
  });
};
var incrementSaveCount = exports.incrementSaveCount = function incrementSaveCount(promptId) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
      saveCount: (0, _firebaseFirestore.increment)(1)
    });
  });
};
var incrementShareCount = exports.incrementShareCount = function incrementShareCount(promptId) {
  var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
      shareCount: (0, _firebaseFirestore.increment)(delta)
    });
  });
};
var getUserSavedPrompts = exports.getUserSavedPrompts = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userId) {
    var q, snap;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, "users/".concat(userId, "/savedPrompts")), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'));
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
  return function getUserSavedPrompts(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
var updatePromptText = exports.updatePromptText = function updatePromptText(promptId, newText) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
      text: newText
    });
  });
};
var addComment = exports.addComment = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(promptId, userId, text) {
    var snap, owner;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, "prompts/".concat(promptId, "/comments")), {
              text: text,
              userId: userId,
              createdAt: (0, _firebaseFirestore.serverTimestamp)()
            });
          });
        case 1:
          _context6.n = 2;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
              commentCount: (0, _firebaseFirestore.increment)(1)
            });
          });
        case 2:
          _context6.n = 3;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId));
          });
        case 3:
          snap = _context6.v;
          owner = snap.exists() ? snap.data().userId : null;
          if (!(owner && owner !== userId)) {
            _context6.n = 4;
            break;
          }
          _context6.n = 4;
          return (0, _notifications.sendNotification)(owner, {
            type: 'comment',
            promptId: promptId,
            from: userId
          });
        case 4:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return function addComment(_x7, _x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
var getComments = exports.getComments = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(promptId) {
    var q, snap;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, "prompts/".concat(promptId, "/comments")), (0, _firebaseFirestore.orderBy)('createdAt', 'asc'));
          _context7.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDocs)(q);
          });
        case 1:
          snap = _context7.v;
          return _context7.a(2, snap.docs.map(function (d) {
            return _objectSpread({
              id: d.id
            }, d.data());
          }));
      }
    }, _callee7);
  }));
  return function getComments(_x0) {
    return _ref7.apply(this, arguments);
  };
}();
var updateComment = exports.updateComment = function updateComment(promptId, commentId, newText) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, "prompts/".concat(promptId, "/comments/").concat(commentId)), {
      text: newText
    });
  });
};
var deleteComment = exports.deleteComment = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(promptId, commentId) {
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          _context8.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.deleteDoc)((0, _firebaseFirestore.doc)(_firebase.db, "prompts/".concat(promptId, "/comments/").concat(commentId)));
          });
        case 1:
          _context8.n = 2;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, 'prompts', promptId), {
              commentCount: (0, _firebaseFirestore.increment)(-1)
            });
          });
        case 2:
          return _context8.a(2);
      }
    }, _callee8);
  }));
  return function deleteComment(_x1, _x10) {
    return _ref8.apply(this, arguments);
  };
}();
var getNewestPromptTimestamp = exports.getNewestPromptTimestamp = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
    var q, snap, ts;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.n) {
        case 0:
          q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, 'prompts'), (0, _firebaseFirestore.where)('shared', '==', true), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'), (0, _firebaseFirestore.limit)(1));
          _context9.n = 1;
          return (0, _firebase.withRetry)(function () {
            return (0, _firebaseFirestore.getDocs)(q);
          });
        case 1:
          snap = _context9.v;
          if (!snap.empty) {
            _context9.n = 2;
            break;
          }
          return _context9.a(2, null);
        case 2:
          ts = snap.docs[0].get('createdAt');
          return _context9.a(2, ts ? ts.toMillis() : null);
      }
    }, _callee9);
  }));
  return function getNewestPromptTimestamp() {
    return _ref9.apply(this, arguments);
  };
}();
