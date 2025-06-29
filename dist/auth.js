"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runPendingAuthCallbacks = exports.register = exports.pendingAuthCallbacks = exports.onAuth = exports.logout = exports.login = void 0;
var _firebaseAuth = require("https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js");
var _firebase = require("./firebase.js");
var pendingAuthCallbacks = exports.pendingAuthCallbacks = [];
var register = exports.register = function register(email, password) {
  return (0, _firebaseAuth.createUserWithEmailAndPassword)(_firebase.auth, email, password);
};
var login = exports.login = function login(email, password) {
  return (0, _firebaseAuth.signInWithEmailAndPassword)(_firebase.auth, email, password);
};
var logout = exports.logout = function logout() {
  return (0, _firebaseAuth.signOut)(_firebase.auth);
};
var onAuth = exports.onAuth = function onAuth(cb) {
  if (!_firebase.auth) {
    pendingAuthCallbacks.push(cb);
    return;
  }
  (0, _firebaseAuth.onAuthStateChanged)(_firebase.auth, cb);
};
var runPendingAuthCallbacks = exports.runPendingAuthCallbacks = function runPendingAuthCallbacks() {
  if (_firebase.auth) {
    pendingAuthCallbacks.forEach(function (cb) {
      return (0, _firebaseAuth.onAuthStateChanged)(_firebase.auth, cb);
    });
    pendingAuthCallbacks.length = 0;
  }
};
