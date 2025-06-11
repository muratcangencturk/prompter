(() => {
  // --- Core Application Logic ---
  const appState = {
    generatedPrompt: '',
    selectedCategory: 'random',
    isGenerating: false,
    copySuccess: false,
    language: 'en',
    theme: 'dark', // Default theme
    history: [], // overall prompt history
    partHistory: [], // per-part history
    HISTORY_SIZE: 100, // Increased history size
  };

  // --- Utility Functions ---
  const getRandomElement = (array, history = []) => {
    if (!array || array.length === 0) return '';
    const available = array.filter((item) => !history.includes(item));
    if (available.length > 0) {
      return available[Math.floor(Math.random() * available.length)];
    }
    return array[Math.floor(Math.random() * array.length)];
  };

  const loadedPrompts = {};
  const join = (arr) =>
    arr
      .join(' ')
      .replace(/\s+([,.!?])/g, '$1')
      .replace(/\s+\n/g, ' ')
      .trim();
  const punctuate = (str) => (/[.!?]$/.test(str) ? str : str + '.');

  const structures = {
    singleSentence: (parts) => join(parts),
    twoSentence: (parts) => {
      const first = punctuate(join(parts.slice(0, 3)));
      return `${first} ${parts[3].trim()}`;
    },
    questionThenInstruction: (parts) => {
      const first = punctuate(join(parts.slice(0, 2)));
      return `${first} ${parts[2].trim()} ${parts[3].trim()}`;
    },
    imageStructure: (parts) => {
      const first = punctuate(join(parts.slice(0, 2)));
      return `${first} ${parts[2].trim()} ${parts[3].trim()}`;
    },
  };

  const catMap = {
    inspiring: 'singleSentence',
    mindBlowing: 'questionThenInstruction',
    productivity: 'twoSentence',
    educational: 'twoSentence',
    crazy: 'twoSentence',
    perspective: 'twoSentence',
    ai: 'twoSentence',
    ideas: 'twoSentence',
    video: 'questionThenInstruction',
    image: 'imageStructure',
    hellprompts: 'twoSentence',
  };

  const loadCategory = async (lang, cat) => {
    loadedPrompts[lang] = loadedPrompts[lang] || {};
    if (loadedPrompts[lang][cat]) return loadedPrompts[lang][cat];
    if (window.prompts && window.prompts[lang] && window.prompts[lang][cat]) {
      loadedPrompts[lang][cat] = window.prompts[lang][cat];
      return loadedPrompts[lang][cat];
    }
    const res = await fetch(`prompts/${lang}/${cat}.json`);
    const data = await res.json();
    data.structure = structures[catMap[cat]];
    loadedPrompts[lang][cat] = data;
    return data;
  };

  // --- UI Text Translations ---
  const uiText = {
    en: {
      appTitle: 'PROMPTER',
      appSubtitle:
        'Prompt generator for AI - unprecedented, limitless creativity',
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
      appSubtitle:
        'YZ için prompt üretici - eşi benzeri görülmemiş sınırsız yaratıcılık',
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

  // --- Category Definitions ---
  const categories = [
    {
      id: 'random',
      icon: 'shuffle',
      emoji: '🔀',
      name: { en: 'Random Mix', tr: 'Rastgele Karışım' },
    },
    {
      id: 'inspiring',
      icon: 'sunrise',
      emoji: '🌅',
      name: { en: 'Inspiring', tr: 'İlham Verici' },
    },
    {
      id: 'mindBlowing',
      icon: 'brain-circuit',
      emoji: '🤯',
      name: { en: 'Mind-blowing', tr: 'Ufuk Açıcı' },
    },
    {
      id: 'productivity',
      icon: 'zap',
      emoji: '⚡',
      name: { en: 'Productivity', tr: 'Üretkenlik' },
    },
    {
      id: 'educational',
      icon: 'graduation-cap',
      emoji: '🎓',
      name: { en: 'Educational', tr: 'Eğitici' },
    },
    {
      id: 'crazy',
      icon: 'laugh',
      emoji: '😂',
      name: { en: 'Crazy', tr: 'Çılgın Fikirler' },
    },
    {
      id: 'perspective',
      icon: 'glasses',
      emoji: '🕶️',
      name: { en: 'Perspective', tr: 'Bakış Açısı' },
    },
    { id: 'ai', icon: 'cpu', emoji: '🤖', name: { en: 'AI', tr: 'YZ' } },
    {
      id: 'ideas',
      icon: 'lightbulb',
      emoji: '💡',
      name: { en: 'Ideas', tr: 'Fikirler' },
    },
    {
      id: 'video',
      icon: 'video',
      emoji: '🎬',
      name: { en: 'Video', tr: 'Video' },
    },
    {
      id: 'image',
      icon: 'image',
      emoji: '🖼️',
      name: { en: 'Image', tr: 'Görsel' },
    },
    {
      id: 'hellprompts',
      icon: 'skull',
      emoji: '💀',
      name: { en: 'Hellprompts', tr: 'Cehennem Promptları' },
    }, // New category
  ];

  // Optional fallback icons in case a name is not supported by Lucide
  const ICON_FALLBACKS = {
    'brain-circuits': 'brain-circuit',
  };

  // --- DOM Elements ---
  const categoryButtonsContainer = document.getElementById('category-buttons');
  const generateButton = document.getElementById('generate-button');
  const promptDisplayArea = document.getElementById('prompt-display-area');
  const generatedPromptText = document.getElementById('generated-prompt-text');
  const copyButton = document.getElementById('copy-button');
  const downloadButton = document.getElementById('download-button');
  const copySuccessMessage = document.getElementById('copy-success-message');
  const langEnButton = document.getElementById('lang-en');
  const langTrButton = document.getElementById('lang-tr');
  const themeLightButton = document.getElementById('theme-light');
  const themeDarkButton = document.getElementById('theme-dark');
  const themeLinkElement = document.getElementById('theme-css');

  // --- Theme Toggle Logic ---
  const THEMES = { LIGHT: 'light', DARK: 'dark' };

  const setTheme = (theme) => {
    appState.theme = theme;
    if (themeLinkElement) {
      themeLinkElement.href = `css/theme-${theme}.css`;
    }
    if (theme === THEMES.LIGHT) {
      themeLightButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      themeLightButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
      themeDarkButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      themeDarkButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    } else {
      themeDarkButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      themeDarkButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
      themeLightButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      themeLightButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    localStorage.setItem('theme', theme);
    // Update button titles based on theme and language
    updateButtonTitles();
  };

  // --- Language Switching Logic ---
  const setLanguage = (lang) => {
    appState.language = lang;
    document.documentElement.lang = lang;
    // Update UI text
    document.getElementById('app-title').textContent = uiText[lang].appTitle;
    document.getElementById('app-subtitle').textContent =
      uiText[lang].appSubtitle;
    document.getElementById('choose-style-title').textContent =
      uiText[lang].chooseStyleTitle;
    document.getElementById('generate-button-text').textContent =
      uiText[lang].generateButtonText;
    generateButton.setAttribute('aria-label', uiText[lang].generateButtonText);
    document.getElementById('your-prompt-title').textContent =
      uiText[lang].yourPromptTitle;
    copyButton.title = uiText[lang].copyButtonTitle;
    copyButton.setAttribute('aria-label', uiText[lang].copyButtonTitle);
    downloadButton.title = uiText[lang].downloadButtonTitle;
    downloadButton.setAttribute('aria-label', uiText[lang].downloadButtonTitle);
    copySuccessMessage.textContent = uiText[lang].copySuccessMessage;
    document.getElementById('app-stats').textContent = uiText[lang].appStats;
    document.getElementById('footer-prompter').textContent =
      uiText[lang].footerPrompter;
    langEnButton.title = uiText[lang].langEnLabel;
    langEnButton.setAttribute('aria-label', uiText[lang].langEnLabel);
    langTrButton.title = uiText[lang].langTrLabel;
    langTrButton.setAttribute('aria-label', uiText[lang].langTrLabel);

    // Update category button text
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

    // Update language button styles
    if (lang === 'en') {
      langEnButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEnButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
      langTrButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langTrButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    } else {
      langTrButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langTrButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
      langEnButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEnButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    localStorage.setItem('language', lang);
    // Update theme button titles based on language
    updateButtonTitles();
  };

  const updateButtonTitles = () => {
    themeLightButton.title = uiText[appState.language].themeLightTitle;
    themeLightButton.setAttribute(
      'aria-label',
      uiText[appState.language].themeLightTitle
    );
    themeDarkButton.title = uiText[appState.language].themeDarkTitle;
    themeDarkButton.setAttribute(
      'aria-label',
      uiText[appState.language].themeDarkTitle
    );
  };

  // --- Prompt Generation Logic ---
  const generatePrompt = async () => {
    appState.isGenerating = true;
    generateButton.disabled = true;
    generatedPromptText.innerHTML =
      '<div class="flex justify-center items-center h-20"><i data-lucide="loader-2" class="w-6 h-6 animate-spin" aria-hidden="true"></i></div>';
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
    promptDisplayArea.classList.remove('hidden');
    promptDisplayArea.classList.add('animate-fadeIn');
    try {
      let selectedCatId = appState.selectedCategory;

      if (selectedCatId === 'random') {
        // Exclude 'random' itself from random selection
        const availableCategories = categories.filter((c) => c.id !== 'random');
        selectedCatId =
          availableCategories[
            Math.floor(Math.random() * availableCategories.length)
          ].id;
      }

      const categoryData = await loadCategory(appState.language, selectedCatId);

      if (
        !categoryData ||
        !categoryData.parts ||
        !Array.isArray(categoryData.parts)
      ) {
        console.error(
          `Invalid data for category: ${selectedCatId}, language: ${appState.language}`
        );
        generatedPromptText.textContent =
          'Error generating prompt. Please try again.';
        appState.isGenerating = false;
        generateButton.disabled = false;
        return;
      }

      const promptParts = categoryData.parts.map((partArray, idx) => {
        if (!appState.partHistory[idx]) {
          appState.partHistory[idx] = [];
        }
        if (!appState.history[idx]) {
          appState.history[idx] = [];
        }
        const element = getRandomElement(partArray, appState.partHistory[idx]);
        appState.partHistory[idx].push(element);
        if (appState.partHistory[idx].length > appState.HISTORY_SIZE) {
          appState.partHistory[idx].shift();
        }
        return element;
      });
      const newPrompt = categoryData.structure
        ? categoryData.structure(promptParts)
        : promptParts.join(' ');

      // Update history for each part (FIFO queue)
      promptParts.forEach((part, idx) => {
        if (!appState.history[idx]) {
          appState.history[idx] = [];
        }
        const hist = appState.history[idx];
        hist.push(part);
        if (hist.length > appState.HISTORY_SIZE) {
          hist.shift();
        }
      });

      appState.generatedPrompt = newPrompt;
      generatedPromptText.textContent = newPrompt;
      appState.isGenerating = false;
      generateButton.disabled = false;
    } catch (err) {
      console.error(err);
      generatedPromptText.textContent = 'Error loading prompts.';
      appState.isGenerating = false;
      generateButton.disabled = false;
    }
  };

  // --- Event Listeners ---
  const setupEventListeners = () => {
    // Category buttons
    categories.forEach((category) => {
      const button = document.getElementById(`category-${category.id}`);
      if (button) {
        button.addEventListener('click', () => {
          appState.selectedCategory = category.id;
          document
            .querySelectorAll('.category-button')
            .forEach((btn) => btn.classList.remove('selected'));
          button.classList.add('selected');
        });
      }
    });

    // Generate button
    generateButton.addEventListener('click', generatePrompt);

    // Copy button
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

    // Download button
    downloadButton.addEventListener('click', () => {
      if (!appState.generatedPrompt) return;
      const blob = new Blob([appState.generatedPrompt], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt_${appState.selectedCategory}_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    // Language buttons
    langEnButton.addEventListener('click', () => setLanguage('en'));
    langTrButton.addEventListener('click', () => setLanguage('tr'));

    // Theme buttons
    themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
    themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
  };

  // --- Initialization ---
  const initializeApp = () => {
    const runLucide = () => {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();

        document
          .querySelectorAll('#category-buttons .category-button')
          .forEach((button) => {
            const iconEl = button.querySelector('i[data-lucide]');
            const emojiEl = button.querySelector('.emoji-icon');
            if (!iconEl) return;

            let iconName = iconEl.getAttribute('data-lucide');
            const pascal = iconName.replace(/(^.|-.)/g, (s) =>
              s.replace('-', '').toUpperCase()
            );
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

        // Re-run in case any icons were replaced
        window.lucide.createIcons();
        return true;
      }
      return false;
    };

    // Load saved language or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // Load saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || THEMES.DARK;
    setTheme(savedTheme);

    categoryButtonsContainer.innerHTML = '';
    categories.forEach((category) => {
      const button = document.createElement('button');
      button.id = `category-${category.id}`;
      button.className =
        'category-button focus:outline-none focus:ring-2 focus:ring-white/50';
      button.setAttribute(
        'aria-label',
        `${category.name[appState.language]} category`
      );
      if (category.id === appState.selectedCategory) {
        button.classList.add('selected');
      }
      button.innerHTML = `\
                    <span class="emoji-icon mr-1" aria-hidden="true">${
                      category.emoji
                    }</span>\
                    <i data-lucide="${
                      category.icon
                    }" class="lucide" aria-hidden="true"></i>\
                    <span class="category-label">${
                      category.name[appState.language]
                    }</span>`;
      categoryButtonsContainer.appendChild(button);
    });
    if (window.lucideScripts && window.lucideScripts.loadPromise) {
      window.lucideScripts.loadPromise.then(runLucide);
    }

    // Setup event listeners
    setupEventListeners();
  };

  // --- Run Initialization ---
  document.addEventListener('DOMContentLoaded', initializeApp);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(console.error);
    });
  }
})();
