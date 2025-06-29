"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotification = exports.markNotificationRead = exports.listenNotifications = void 0;
var _firebaseFirestore = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js");
var _firebase = require("./firebase.js");
var _excluded = ["promptId", "target", "targetId"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var sendNotification = exports.sendNotification = function sendNotification(uid, data) {
  var _ref = data || {},
    promptId = _ref.promptId,
    target = _ref.target,
    targetId = _ref.targetId,
    rest = _objectWithoutProperties(_ref, _excluded);
  var payload = _objectSpread({}, rest);
  if (promptId) payload.promptId = promptId;else if (targetId) payload.promptId = targetId;else if (target) payload.target = target;
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.addDoc)((0, _firebaseFirestore.collection)(_firebase.db, "users/".concat(uid, "/notifications")), _objectSpread(_objectSpread({}, payload), {}, {
      createdAt: (0, _firebaseFirestore.serverTimestamp)()
    }));
  });
};
var markNotificationRead = exports.markNotificationRead = function markNotificationRead(uid, id) {
  return (0, _firebase.withRetry)(function () {
    return (0, _firebaseFirestore.updateDoc)((0, _firebaseFirestore.doc)(_firebase.db, "users/".concat(uid, "/notifications/").concat(id)), {
      read: true
    });
  });
};
var listenNotifications = exports.listenNotifications = function listenNotifications(uid, cb) {
  var q = (0, _firebaseFirestore.query)((0, _firebaseFirestore.collection)(_firebase.db, "users/".concat(uid, "/notifications")), (0, _firebaseFirestore.orderBy)('createdAt', 'desc'));
  return (0, _firebaseFirestore.onSnapshot)(q, function (snap) {
    return cb(snap.docs.map(function (d) {
      return _objectSpread({
        id: d.id
      }, d.data());
    }));
  });
};
