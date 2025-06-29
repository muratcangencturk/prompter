"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkify = linkify;
var _sanitize = require("./sanitize.js");
function linkify(text) {
  var urlRegex = /(https?:\/\/[^\s]+?)([).]+)?(?=\s|$)/g;
  var html = text.replace(urlRegex, function (match, url) {
    var punctuation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var safeUrl = url.replace(/"/g, '&quot;');
    return "<a href=\"".concat(safeUrl, "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"underline\">").concat(url, "</a>").concat(punctuation);
  });
  return (0, _sanitize.sanitizeHTML)(html);
}
