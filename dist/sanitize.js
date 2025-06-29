"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSanitizedHTML = exports.sanitizeHTML = void 0;
var _esm = _interopRequireDefault(require("https://cdn.jsdelivr.net/npm/dompurify@3.2.6/+esm"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var sanitizeHTML = exports.sanitizeHTML = function sanitizeHTML(html) {
  return _esm["default"].sanitize(html);
};
var setSanitizedHTML = exports.setSanitizedHTML = function setSanitizedHTML(el, html) {
  el.innerHTML = _esm["default"].sanitize(html);
};
