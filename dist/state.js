"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appState = exports.THEMES = void 0;
var THEMES = exports.THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};
var readLocal = function readLocal(key, fallback) {
  try {
    var data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (_unused) {
    return fallback;
  }
};
var appState = exports.appState = {
  generatedPrompt: '',
  selectedCategory: 'random',
  useFullSentenceNext: false,
  isGenerating: false,
  copySuccess: false,
  language: 'en',
  theme: THEMES.DARK,
  currentUser: null,
  history: readLocal('promptHistory', []),
  savedPrompts: readLocal('savedPrompts', []),
  likedPrompts: readLocal('likedPrompts', []),
  partHistory: [],
  HISTORY_SIZE: 100
};
