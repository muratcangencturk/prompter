import { appState, THEMES } from './state.js';
import { categories, ICON_FALLBACKS, generatePrompt } from './prompts.js';

const uiText = {
  en: {
    appTitle: 'PROMPTER',
    appSubtitle: 'Prompt generator for AI - unprecedented, limitless creativity',
    chooseStyleTitle: 'Select Your Prompt Inspiration',
    generateButtonText: 'Generate New Prompt',
    yourPromptTitle: 'Your Unique Prompt:',
    copyButtonTitle: 'Copy to clipboard',
    downloadButtonTitle: 'Download as .txt',
    copySuccessMessage: 'Prompt copied successfully!',
    appStats: 'Prompts that will unlock the potential of your mind',
    footerPrompter: 'Prompter',
    randomCategory: 'Random Mix',
    themeLightTitle: 'Light Theme',
    themeDarkTitle: 'Dark Theme',
    langEnLabel: 'Switch to English',
    langTrLabel: 'Switch to Turkish',
  },
  tr: {
    appTitle: 'PROMPTER',
    appSubtitle: 'YZ için prompt üretici - eşi benzeri görülmemiş sınırsız yaratıcılık',
    chooseStyleTitle: 'Prompt İlhamınızı Seçin',
    generateButtonText: 'Yeni Prompt Üret',
    yourPromptTitle: 'Benzersiz Promptunuz:',
    copyButtonTitle: 'Panoya kopyala',
    downloadButtonTitle: '.txt olarak indir',
    copySuccessMessage: 'Prompt başarıyla kopyalandı!',
    appStats: 'Zihninizin potansiyelini açığa çıkaracak promptlar',
    footerPrompter: 'Prompter',
    randomCategory: 'Rastgele Karışım',
    themeLightTitle: 'Açık Tema',
    themeDarkTitle: 'Koyu Tema',
    langEnLabel: 'İngilizce\'ye geç',
    langTrLabel: 'Türkçe\'ye geç',
  },
};

let categoryButtonsContainer;
let generateButton;
let promptDisplayArea;
let generatedPromptText;
let copyButton;
let downloadButton;
let copySuccessMessage;
let langEnButton;
let langTrButton;
let themeLightButton;
let themeDarkButton;
let themeLinkElement;
let lastGeneratedCategoryId = appState.selectedCategory;

const setTheme = (theme) => {
  appState.theme = theme;
  if (themeLinkElement) {
    themeLinkElement.href = `css/theme-${theme}.css`;
  }
  if (theme === THEMES.LIGHT) {
    themeLightButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeLightButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
    themeDarkButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeDarkButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
  } else {
    themeDarkButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeDarkButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
    themeLightButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
    themeLightButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
  }
  localStorage.setItem('theme', theme);
  updateButtonTitles();
};

const setLanguage = (lang) => {
  appState.language = lang;
  document.documentElement.lang = lang;
  document.getElementById('app-title').textContent = uiText[lang].appTitle;
  document.getElementById('app-subtitle').textContent = uiText[lang].appSubtitle;
  document.getElementById('choose-style-title').textContent = uiText[lang].chooseStyleTitle;
  document.getElementById('generate-button-text').textContent = uiText[lang].generateButtonText;
  generateButton.setAttribute('aria-label', uiText[lang].generateButtonText);
  document.getElementById('your-prompt-title').textContent = uiText[lang].yourPromptTitle;
  copyButton.title = uiText[lang].copyButtonTitle;
  copyButton.setAttribute('aria-label', uiText[lang].copyButtonTitle);
  downloadButton.title = uiText[lang].downloadButtonTitle;
  downloadButton.setAttribute('aria-label', uiText[lang].downloadButtonTitle);
  copySuccessMessage.textContent = uiText[lang].copySuccessMessage;
  document.getElementById('app-stats').textContent = uiText[lang].appStats;
  document.getElementById('footer-prompter').textContent = uiText[lang].footerPrompter;
  langEnButton.title = uiText[lang].langEnLabel;
  langEnButton.setAttribute('aria-label', uiText[lang].langEnLabel);
  langTrButton.title = uiText[lang].langTrLabel;
  langTrButton.setAttribute('aria-label', uiText[lang].langTrLabel);

  categories.forEach((category) => {
    const button = document.getElementById(`category-${category.id}`);
    if (button) {
      const labelSpan = button.querySelector('.category-label');
      if (labelSpan) {
        labelSpan.textContent = category.name[lang];
      }
      button.setAttribute('aria-label', `${category.name[lang]} category`);
    }
  });

  if (lang === 'en') {
    langEnButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
    langEnButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
    langTrButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
    langTrButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
  } else {
    langTrButton.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
    langTrButton.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
    langEnButton.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
    langEnButton.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
  }
  localStorage.setItem('language', lang);
  updateButtonTitles();
};

const updateButtonTitles = () => {
  themeLightButton.title = uiText[appState.language].themeLightTitle;
  themeLightButton.setAttribute('aria-label', uiText[appState.language].themeLightTitle);
  themeDarkButton.title = uiText[appState.language].themeDarkTitle;
  themeDarkButton.setAttribute('aria-label', uiText[appState.language].themeDarkTitle);
};

const handleGenerate = async () => {
  generatedPromptText.innerHTML =
    '<div class="flex justify-center items-center h-20"><i data-lucide="loader-2" class="w-6 h-6 animate-spin" aria-hidden="true"></i></div>';
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
  promptDisplayArea.classList.remove('hidden');
  promptDisplayArea.classList.add('animate-fadeIn');
  try {
    const { prompt, categoryId } = await generatePrompt();
    generatedPromptText.textContent = prompt;
    lastGeneratedCategoryId = categoryId;
  } catch (err) {
    console.error(err);
    generatedPromptText.textContent = 'Error generating prompt. Please try again.';
  } finally {
    appState.isGenerating = false;
    generateButton.disabled = false;
  }
};

const setupEventListeners = () => {
  categories.forEach((category) => {
    const button = document.getElementById(`category-${category.id}`);
    if (button) {
      button.addEventListener('click', () => {
        appState.selectedCategory = category.id;
        document.querySelectorAll('.category-button').forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
      });
    }
  });

  generateButton.addEventListener('click', () => {
    generateButton.disabled = true;
    handleGenerate();
  });

  copyButton.addEventListener('click', () => {
    if (!appState.generatedPrompt) return;
    navigator.clipboard
      .writeText(appState.generatedPrompt)
      .then(() => {
        appState.copySuccess = true;
        copySuccessMessage.classList.remove('hidden');
        setTimeout(() => {
          copySuccessMessage.classList.add('hidden');
          appState.copySuccess = false;
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy prompt. Please try again.');
      });
  });

  downloadButton.addEventListener('click', () => {
    if (!appState.generatedPrompt) return;
    const blob = new Blob([appState.generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt_${lastGeneratedCategoryId}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  langEnButton.addEventListener('click', () => setLanguage('en'));
  langTrButton.addEventListener('click', () => setLanguage('tr'));

  themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
};

export const initializeApp = () => {
  categoryButtonsContainer = document.getElementById('category-buttons');
  generateButton = document.getElementById('generate-button');
  promptDisplayArea = document.getElementById('prompt-display-area');
  generatedPromptText = document.getElementById('generated-prompt-text');
  copyButton = document.getElementById('copy-button');
  downloadButton = document.getElementById('download-button');
  copySuccessMessage = document.getElementById('copy-success-message');
  langEnButton = document.getElementById('lang-en');
  langTrButton = document.getElementById('lang-tr');
  themeLightButton = document.getElementById('theme-light');
  themeDarkButton = document.getElementById('theme-dark');
  themeLinkElement = document.getElementById('theme-css');

  const runLucide = () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();

      document.querySelectorAll('#category-buttons .category-button').forEach((button) => {
        const iconEl = button.querySelector('i[data-lucide]');
        const emojiEl = button.querySelector('.emoji-icon');
        if (!iconEl) return;

        let iconName = iconEl.getAttribute('data-lucide');
        const pascal = iconName.replace(/(^.|-.)/g, (s) => s.replace('-', '').toUpperCase());
        if (!window.lucide.icons || !window.lucide.icons[pascal]) {
          const fallback = ICON_FALLBACKS[iconName];
          if (fallback) {
            iconName = fallback;
            iconEl.setAttribute('data-lucide', iconName);
          }
        }

        const hasSvg = iconEl.querySelector('svg');
        if (!hasSvg) {
          emojiEl && emojiEl.classList.remove('hidden');
          iconEl.style.display = 'none';
        } else {
          iconEl.style.display = 'block';
          emojiEl && emojiEl.classList.add('hidden');
        }
      });

      window.lucide.createIcons();
      return true;
    }
    return false;
  };

  const savedLanguage = localStorage.getItem('language') || 'en';
  setLanguage(savedLanguage);

  const savedTheme = localStorage.getItem('theme') || THEMES.DARK;
  setTheme(savedTheme);

  categoryButtonsContainer.innerHTML = '';
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.id = `category-${category.id}`;
    button.className = 'category-button focus:outline-none focus:ring-2 focus:ring-white/50';
    button.setAttribute('aria-label', `${category.name[appState.language]} category`);
    if (category.id === appState.selectedCategory) {
      button.classList.add('selected');
    }
    button.innerHTML = `
                    <span class="emoji-icon mr-1" aria-hidden="true">${category.emoji}</span>
                    <i data-lucide="${category.icon}" class="lucide" aria-hidden="true"></i>
                    <span class="category-label">${category.name[appState.language]}</span>`;
    categoryButtonsContainer.appendChild(button);
  });
  if (window.lucideScripts && window.lucideScripts.loadPromise) {
    window.lucideScripts.loadPromise.then(runLucide);
  }

  setupEventListeners();
};
