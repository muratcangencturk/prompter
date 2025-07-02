export const THEMES = { LIGHT: 'light', DARK: 'dark' };

const readLocal = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const appState = {
  generatedPrompt: '',
  selectedCategory: 'random',
  // tracks whether each category should use a full sentence prompt next
  // { [categoryId]: boolean }
  useFullSentenceNext: {},
  isGenerating: false,
  copySuccess: false,
  language: 'en',
  theme: THEMES.DARK,
  currentUser: null,
  history: readLocal('promptHistory', []),
  savedPrompts: readLocal('savedPrompts', []),
  likedPrompts: readLocal('likedPrompts', []),
  partHistory: [],
  HISTORY_SIZE: 100,
};
