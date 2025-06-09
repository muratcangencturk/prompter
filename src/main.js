(() => {
    // --- Core Application Logic ---
    const appState = {
        generatedPrompt: '',
        selectedCategory: 'random',
        isGenerating: false,
        copySuccess: false,
        language: 'en',
        theme: 'dark', // Default theme
        history: [],        // overall prompt history
        partHistory: [],    // per-part history
        HISTORY_SIZE: 100,    // Increased history size
        ui: {}               // loaded UI strings
    };

    // --- Utility Functions ---
    const getRandomElement = (array, history = []) => {
        if (!array || array.length === 0) return '';
        const available = array.filter(item => !history.includes(item));
        if (available.length > 0) {
            return available[Math.floor(Math.random() * available.length)];
        }
        return array[Math.floor(Math.random() * array.length)];
    };

    // --- UI Text Translations loaded from /i18n/*.json ---
    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'tr', label: 'TR' }
    ];

    const translations = {};

    const loadLanguage = async (lang) => {
        if (!translations[lang]) {
            try {
                const res = await fetch(`i18n/${lang}.json`);
                translations[lang] = await res.json();
            } catch (err) {
                console.error(`Failed to load language file for ${lang}`, err);
                translations[lang] = {};
            }
        }
        return translations[lang];
    };

        // --- Category Definitions ---
        const categories = [
            { id: 'random', icon: 'shuffle', emoji: '🔀', name: { en: 'Random Mix', tr: 'Rastgele Karışım' } },
            { id: 'inspiring', icon: 'sunrise', emoji: '🌅', name: { en: 'Inspiring', tr: 'İlham Verici' } },
            { id: 'mindBlowing', icon: 'brain-circuit', emoji: '🤯', name: { en: 'Mind-blowing', tr: 'Ufuk Açıcı' } },
            { id: 'productivity', icon: 'zap', emoji: '⚡', name: { en: 'Productivity', tr: 'Üretkenlik' } },
            { id: 'educational', icon: 'graduation-cap', emoji: '🎓', name: { en: 'Educational', tr: 'Eğitici' } },
            { id: 'crazy', icon: 'laugh', emoji: '😂', name: { en: 'Crazy', tr: 'Çılgın Fikirler' } },
            { id: 'perspective', icon: 'glasses', emoji: '🕶️', name: { en: 'Perspective', tr: 'Bakış Açısı' } },
            { id: 'ai', icon: 'cpu', emoji: '🤖', name: { en: 'AI', tr: 'YZ' } },
            { id: 'ideas', icon: 'lightbulb', emoji: '💡', name: { en: 'Ideas', tr: 'Fikirler' } },
            { id: 'video', icon: 'video', emoji: '🎬', name: { en: 'Video', tr: 'Video' } },
            { id: 'image', icon: 'image', emoji: '🖼️', name: { en: 'Image', tr: 'Görsel' } },
            { id: 'hellprompts', icon: 'skull', emoji: '💀', name: { en: 'Hellprompts', tr: 'Cehennem Promptları' } } // New category
        ];

        // Optional fallback icons in case a name is not supported by Lucide
        const ICON_FALLBACKS = {
            'brain-circuits': 'brain-circuit'
        };



        // --- DOM Elements ---
        const categoryButtonsContainer = document.getElementById('category-buttons');
        const generateButton = document.getElementById('generate-button');
        const promptDisplayArea = document.getElementById('prompt-display-area');
        const generatedPromptText = document.getElementById('generated-prompt-text');
        const copyButton = document.getElementById('copy-button');
        const downloadButton = document.getElementById('download-button');
        const copySuccessMessage = document.getElementById('copy-success-message');
        const languageSwitcher = document.getElementById('language-switcher');
        const themeLightButton = document.getElementById('theme-light');
        const themeDarkButton = document.getElementById('theme-dark');
        const themeLinkElement = document.getElementById('theme-css');
        const languageButtons = {};

        // --- Theme Toggle Logic ---
        const THEMES = { LIGHT: 'light', DARK: 'dark' };

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
            // Update button titles based on theme and language
            updateButtonTitles();
        };

        // --- Language Switching Logic ---
        const setLanguage = async (lang) => {
            appState.language = lang;
            document.documentElement.lang = lang;

            const uiText = await loadLanguage(lang);
            appState.ui = uiText;
            // Update UI text
            document.getElementById('app-title').textContent = uiText.appTitle || '';
            document.getElementById('app-subtitle').textContent = uiText.appSubtitle || '';
            document.getElementById('choose-style-title').textContent = uiText.chooseStyleTitle || '';
            document.getElementById('generate-button-text').textContent = uiText.generateButtonText || '';
            generateButton.setAttribute('aria-label', uiText.generateButtonText || '');
            document.getElementById('your-prompt-title').textContent = uiText.yourPromptTitle || '';
            copyButton.title = uiText.copyButtonTitle || '';
            copyButton.setAttribute('aria-label', uiText.copyButtonTitle || '');
            downloadButton.title = uiText.downloadButtonTitle || '';
            downloadButton.setAttribute('aria-label', uiText.downloadButtonTitle || '');
            copySuccessMessage.textContent = uiText.copySuccessMessage || '';
            document.getElementById('app-stats').textContent = uiText.appStats || '';
            document.getElementById('footer-prompter').textContent = uiText.footerPrompter || '';

            // Update category button text
            categories.forEach(category => {
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
            Object.keys(languageButtons).forEach(code => {
                const btn = languageButtons[code];
                if (!btn) return;
                if (code === lang) {
                    btn.classList.add('active', 'bg-white/30', 'text-white', 'shadow-md');
                    btn.classList.remove('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
                } else {
                    btn.classList.remove('active', 'bg-white/30', 'text-white', 'shadow-md');
                    btn.classList.add('bg-transparent', 'text-blue-200', 'hover:bg-white/10');
                }
            });
            localStorage.setItem('language', lang);
            // Update theme button titles based on language
            updateButtonTitles();
        };

       const updateButtonTitles = () => {
             const uiText = appState.ui || {};
             themeLightButton.title = uiText.themeLightTitle || '';
             themeLightButton.setAttribute('aria-label', uiText.themeLightTitle || '');
             themeDarkButton.title = uiText.themeDarkTitle || '';
             themeDarkButton.setAttribute('aria-label', uiText.themeDarkTitle || '');
       };

        // --- Prompt Generation Logic ---
        const generatePrompt = () => {
            appState.isGenerating = true;
            generateButton.disabled = true;
            generatedPromptText.innerHTML = '<div class="flex justify-center items-center h-20"><i data-lucide="loader-2" class="w-6 h-6 animate-spin" aria-hidden="true"></i></div>';
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
            promptDisplayArea.classList.remove('hidden');
            promptDisplayArea.classList.add('animate-fadeIn');

            setTimeout(() => {
                let categoryData;
                let selectedCatId = appState.selectedCategory;

                if (selectedCatId === 'random') {
                    // Exclude 'random' itself from random selection
                    const availableCategories = categories.filter(c => c.id !== 'random');
                    selectedCatId = availableCategories[Math.floor(Math.random() * availableCategories.length)].id;
                }

                categoryData = prompts[appState.language][selectedCatId];

                if (!categoryData || !categoryData.parts || !Array.isArray(categoryData.parts)) {
                    console.error(`Invalid data for category: ${selectedCatId}, language: ${appState.language}`);
                    generatedPromptText.textContent = 'Error generating prompt. Please try again.';
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
            }, 300); // Simulate generation time
        };

        // --- Event Listeners ---
        const setupEventListeners = () => {
            // Category buttons
            categories.forEach(category => {
                const button = document.getElementById(`category-${category.id}`);
                if (button) {
                    button.addEventListener('click', () => {
                        appState.selectedCategory = category.id;
                        document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('selected'));
                        button.classList.add('selected');
                    });
                }
            });

            // Generate button
            generateButton.addEventListener('click', generatePrompt);

            // Copy button
            copyButton.addEventListener('click', () => {
                if (!appState.generatedPrompt) return;
                navigator.clipboard.writeText(appState.generatedPrompt).then(() => {
                    appState.copySuccess = true;
                    copySuccessMessage.classList.remove('hidden');
                    setTimeout(() => {
                        copySuccessMessage.classList.add('hidden');
                        appState.copySuccess = false;
                    }, 2000);
                }).catch(err => {
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
            Object.keys(languageButtons).forEach(code => {
                const btn = languageButtons[code];
                btn.addEventListener('click', () => setLanguage(code));
            });

            // Theme buttons
            themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
            themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
        };

        // --- Initialization ---
        const initializeApp = async () => {
            const runLucide = () => {
                if (window.lucide && typeof window.lucide.createIcons === 'function') {
                    window.lucide.createIcons();

                    document.querySelectorAll('#category-buttons .category-button').forEach(button => {
                        const iconEl = button.querySelector('i[data-lucide]');
                        const emojiEl = button.querySelector('.emoji-icon');
                        if (!iconEl) return;

                        let iconName = iconEl.getAttribute('data-lucide');
                        const pascal = iconName.replace(/(^.|-.)/g, s => s.replace('-', '').toUpperCase());
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

            // Build language buttons
            languageSwitcher.innerHTML = '';
            languages.forEach(lang => {
                const btn = document.createElement('button');
                btn.id = `lang-${lang.code}`;
                btn.className = 'px-3 py-1 rounded-md text-sm font-medium';
                btn.textContent = lang.label;
                languageSwitcher.appendChild(btn);
                languageButtons[lang.code] = btn;
            });

            // Load saved language or default to 'en'
            const savedLanguage = localStorage.getItem('language') || 'en';
            await setLanguage(savedLanguage);

            // Load saved theme or default to 'dark'
            const savedTheme = localStorage.getItem('theme') || THEMES.DARK;
            setTheme(savedTheme);

            categoryButtonsContainer.innerHTML = '';
            categories.forEach(category => {
                const button = document.createElement('button');
                button.id = `category-${category.id}`;
                button.className = 'category-button';
                button.setAttribute('aria-label', `${category.name[appState.language]} category`);
                if (category.id === appState.selectedCategory) {
                    button.classList.add('selected');
                }
                button.innerHTML = `\
                    <span class="emoji-icon mr-1" aria-hidden="true">${category.emoji}</span>\
                    <i data-lucide="${category.icon}" class="lucide" aria-hidden="true"></i>\
                    <span class="category-label">${category.name[appState.language]}</span>`;
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
