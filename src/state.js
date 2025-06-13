export const THEMES = { LIGHT: 'light', DARK: 'dark' };

export const appState = {
  generatedPrompt: '',
  selectedCategory: 'random',
  isGenerating: false,
  copySuccess: false,
  language: 'en',
  theme: THEMES.DARK,
  history: [], // generated prompts
  partHistory: [],
  HISTORY_SIZE: 100,
};
