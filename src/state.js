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
  isGenerating: false,
  copySuccess: false,
  language: 'en',
  theme: THEMES.DARK,
  currentUser: null,
  history: readLocal('promptHistory', []),
  savedPrompts: readLocal('savedPrompts', []),
  partHistory: [],
  HISTORY_SIZE: 100,
};
