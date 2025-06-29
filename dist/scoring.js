"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promptScore = exports.collectorScore = void 0;
var promptScore = exports.promptScore = function promptScore() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$likes = _ref.likes,
    likes = _ref$likes === void 0 ? 0 : _ref$likes,
    _ref$saveCount = _ref.saveCount,
    saveCount = _ref$saveCount === void 0 ? 0 : _ref$saveCount,
    _ref$shareCount = _ref.shareCount,
    shareCount = _ref$shareCount === void 0 ? 0 : _ref$shareCount;
  return likes + saveCount + shareCount;
};
var collectorScore = exports.collectorScore = function collectorScore() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref2$likes = _ref2.likes,
    likes = _ref2$likes === void 0 ? 0 : _ref2$likes,
    _ref2$saves = _ref2.saves,
    saves = _ref2$saves === void 0 ? 0 : _ref2$saves,
    _ref2$shares = _ref2.shares,
    shares = _ref2$shares === void 0 ? 0 : _ref2$shares;
  return likes + saves + shares;
};
