"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeAgo = timeAgo;
function timeAgo(timestamp) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  var now = Date.now();
  var diff = now - timestamp;
  var minute = 60 * 1000;
  var hour = 60 * minute;
  var day = 24 * hour;
  var week = 7 * day;
  var month = 30 * day;
  var year = 365 * day;
  var tr = {
    minute: 'dk',
    hour: 'sa',
    day: 'g',
    week: 'hf',
    month: 'ay',
    year: 'yıl',
    ago: 'önce',
    now: 'az önce'
  };
  var en = {
    minute: 'm',
    hour: 'h',
    day: 'd',
    week: 'w',
    month: 'mo',
    year: 'y',
    ago: 'ago',
    now: 'just now'
  };
  var t = lang === 'tr' ? tr : en;
  if (diff >= year) return "".concat(Math.floor(diff / year), " ").concat(t.year, " ").concat(t.ago);
  if (diff >= month) return "".concat(Math.floor(diff / month), " ").concat(t.month, " ").concat(t.ago);
  if (diff >= week) return "".concat(Math.floor(diff / week), " ").concat(t.week, " ").concat(t.ago);
  if (diff >= day) return "".concat(Math.floor(diff / day), " ").concat(t.day, " ").concat(t.ago);
  if (diff >= hour) return "".concat(Math.floor(diff / hour), " ").concat(t.hour, " ").concat(t.ago);
  if (diff >= minute) return "".concat(Math.floor(diff / minute), " ").concat(t.minute, " ").concat(t.ago);
  return t.now;
}
