        // --- Core Application Logic ---
        const appState = {
            generatedPrompt: '',
            selectedCategory: 'random',
            isGenerating: false,
            copySuccess: false,
            language: 'en',
            theme: 'dark', // Default theme
history: [],            // overall prompt history
partHistory: [],        // Track history for each prompt part
HISTORY_SIZE: 50        // Increased history size

        };

        // --- Utility Functions ---
        const getRandomElement = (array, history = []) => {
            if (!array || array.length === 0) return '';
            const available = array.filter(item => !history.includes(item));
            if (available.length > 0) {
                return available[Math.floor(Math.random() * available.length)];
            }
            // If all items are in history, pick a random one anyway
            return array[Math.floor(Math.random() * array.length)];
        };



 main

        // --- UI Text Translations ---
        const uiText = {
            en: {
                appTitle: "AI Prompt Generator - Prompter",
                appSubtitle: "Prompt generator for AI - unprecedented, limitless creativity",
                chooseStyleTitle: "Select Your Prompt Inspiration",
                generateButtonText: "Generate New Prompt",
                yourPromptTitle: "Your Unique Prompt:",
                copyButtonTitle: "Copy to clipboard",
                downloadButtonTitle: "Download as .txt",
                copySuccessMessage: "Prompt copied successfully!",
                appStats: "Prompts that will unlock the potential of your mind",
                footerPrompter: "Prompter",
                randomCategory: "Random Mix",
                themeLightTitle: "Light Theme",
                themeDarkTitle: "Dark Theme"
            },
            tr: {
                appTitle: "YZ Prompt Üretici - Prompter",
                appSubtitle: "YZ için prompt üretici - eşi benzeri görülmemiş sınırsız yaratıcılık",
                chooseStyleTitle: "Prompt İlhamınızı Seçin",
                generateButtonText: "Yeni Prompt Üret",
                yourPromptTitle: "Benzersiz Promptunuz:",
                copyButtonTitle: "Panoya kopyala",
                downloadButtonTitle: ".txt olarak indir",
                copySuccessMessage: "Prompt başarıyla kopyalandı!",
                appStats: "Zihninizin potansiyelini açığa çıkaracak promptlar",
                footerPrompter: "Prompter",
                randomCategory: "Rastgele Karışım",
                themeLightTitle: "Açık Tema",
                themeDarkTitle: "Koyu Tema"
            }
        };

        // --- Category Definitions ---
        const categories = [
            { id: 'random', icon: 'shuffle', name: { en: 'Random Mix', tr: 'Rastgele Karışım' } },
            { id: 'inspiring', icon: 'sunrise', name: { en: 'Inspiring', tr: 'İlham Verici' } },
            { id: 'mindBlowing', icon: 'brain-circuit', name: { en: 'Mind-blowing', tr: 'Ufuk Açıcı' } },
            { id: 'productivity', icon: 'zap', name: { en: 'Productivity', tr: 'Üretkenlik' } },
            { id: 'educational', icon: 'graduation-cap', name: { en: 'Educational', tr: 'Eğitici' } },
            { id: 'crazy', icon: 'laugh', name: { en: 'Crazy', tr: 'Çılgın Fikirler' } }, // Updated name
            { id: 'perspective', icon: 'glasses', name: { en: 'Perspective', tr: 'Bakış Açısı' } },
            { id: 'ai', icon: 'cpu', name: { en: 'AI', tr: 'YZ' } }, // Updated name
            { id: 'ideas', icon: 'lightbulb', name: { en: 'Ideas', tr: 'Fikirler' } },
            { id: 'hellprompts', icon: 'skull', name: { en: 'Hellprompts', tr: 'Cehennem Promptları' } } // New category
        ];

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
        const themeStyleElement = document.getElementById('theme-styles');

        // --- Theme Toggle Logic ---
        const THEMES = { LIGHT: 'light', DARK: 'dark' };
        const themeStyles = {
            [THEMES.LIGHT]: `
                body { background-image: linear-gradient(to bottom right, #f0f4ff, #d9e2ff, #c4d1ff) !important; color: #1a1a2e !important; }
                .bg-white\/10 { background-color: rgba(255, 255, 255, 0.8) !important; border-color: rgba(0, 0, 0, 0.1) !important; }
                .bg-black\/30 { background-color: rgba(0, 0, 0, 0.05) !important; color: #1e293b !important; }
                .text-blue-200 { color: #4338ca !important; }
                .text-blue-300 { color: #3730a3 !important; }
                .border-white\/20 { border-color: rgba(0, 0, 0, 0.1) !important; }
                .bg-black\/20 { background-color: rgba(0, 0, 0, 0.05) !important; }
                .hover\:bg-white\/10:hover { background-color: rgba(0, 0, 0, 0.1) !important; }
                .bg-white\/30 { background-color: rgba(0, 0, 0, 0.2) !important; }
                .hover\:bg-white\/30:hover { background-color: rgba(0, 0, 0, 0.3) !important; }
                .focus\:ring-white\/50:focus { --tw-ring-color: rgba(0, 0, 0, 0.3) !important; }
                .category-button { background-color: rgba(0, 0, 0, 0.08) !important; color: #1a1a2e !important; border: 1px solid rgba(0, 0, 0, 0.1) !important; }
                .category-button:hover { background-color: rgba(0, 0, 0, 0.15) !important; }
                .category-button.selected { background-image: linear-gradient(to right, #6366f1, #8b5cf6) !important; color: white !important; border-color: transparent !important; }
                .category-button .lucide { color: #4f46e5 !important; }
                .category-button.selected .lucide { color: white !important; }
                #app-title { background-image: linear-gradient(to right, #4f46e5, #7c3aed) !important; }
                #choose-style-title, #your-prompt-title { color: #1e293b !important; }
                #lang-en, #lang-tr { color: #4338ca !important; }
                #lang-en.active, #lang-tr.active { background-color: rgba(0, 0, 0, 0.2) !important; color: #1e293b !important; }
                .theme-toggle-container i { color: #4338ca !important; }
                .theme-toggle-container button { color: #4338ca !important; }
                .theme-toggle-container button.active { background-color: rgba(0, 0, 0, 0.2) !important; color: #1e293b !important; }
                .absolute.top-4.right-4 i { color: #4338ca !important; }
            `,
            [THEMES.DARK]: `
                body { background-image: linear-gradient(to bottom right, #581c87, #1e3a8a, #312e81) !important; color: white !important; }
                .bg-white\/10 { background-color: rgba(255, 255, 255, 0.1) !important; border-color: rgba(255, 255, 255, 0.2) !important; }
                .bg-black\/30 { background-color: rgba(0, 0, 0, 0.3) !important; color: white !important; }
                .text-blue-200 { color: #bfdbfe !important; }
                .text-blue-300 { color: #93c5fd !important; }
                .border-white\/20 { border-color: rgba(255, 255, 255, 0.2) !important; }
                .bg-black\/20 { background-color: rgba(0, 0, 0, 0.2) !important; }
                .hover\:bg-white\/10:hover { background-color: rgba(255, 255, 255, 0.1) !important; }
                .bg-white\/30 { background-color: rgba(255, 255, 255, 0.3) !important; }
                .hover\:bg-white\/30:hover { background-color: rgba(255, 255, 255, 0.3) !important; }
                .focus\:ring-white\/50:focus { --tw-ring-color: rgba(255, 255, 255, 0.5) !important; }
                .category-button { background-color: rgba(255, 255, 255, 0.2) !important; color: white !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; }
                .category-button:hover { background-color: rgba(255, 255, 255, 0.3) !important; }
                .category-button.selected { background-image: linear-gradient(to right, #a855f7, #ec4899) !important; color: white !important; border-color: transparent !important; }
                .category-button .lucide { color: white !important; }
                #app-title { background-image: linear-gradient(to right, #22d3ee, #c084fc) !important; }
                #choose-style-title, #your-prompt-title { color: white !important; }
                #lang-en, #lang-tr { color: #bfdbfe !important; }
                #lang-en.active, #lang-tr.active { background-color: rgba(255, 255, 255, 0.3) !important; color: white !important; }
                .theme-toggle-container i { color: #bfdbfe !important; }
                .theme-toggle-container button { color: #bfdbfe !important; }
                .theme-toggle-container button.active { background-color: rgba(255, 255, 255, 0.3) !important; color: white !important; }
                .absolute.top-4.right-4 i { color: #93c5fd !important; }
            `
        };

        const setTheme = (theme) => {
            appState.theme = theme;
            themeStyleElement.textContent = themeStyles[theme];
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
        const setLanguage = (lang) => {
            appState.language = lang;
            // Update UI text
            document.getElementById('app-title').textContent = uiText[lang].appTitle;
            document.getElementById('app-subtitle').textContent = uiText[lang].appSubtitle;
            document.getElementById('choose-style-title').textContent = uiText[lang].chooseStyleTitle;
            document.getElementById('generate-button-text').textContent = uiText[lang].generateButtonText;
            document.getElementById('your-prompt-title').textContent = uiText[lang].yourPromptTitle;
            copyButton.title = uiText[lang].copyButtonTitle;
            downloadButton.title = uiText[lang].downloadButtonTitle;
            copySuccessMessage.textContent = uiText[lang].copySuccessMessage;
            document.getElementById('app-stats').textContent = uiText[lang].appStats;
            document.getElementById('footer-prompter').textContent = uiText[lang].footerPrompter;

            // Update category button text
            categories.forEach(category => {
                const button = document.getElementById(`category-${category.id}`);
                if (button) {
                    button.querySelector('span').textContent = category.name[lang];
                }
            });

            // Update language button styles
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
            // Update theme button titles based on language
            updateButtonTitles();
        };

        const updateButtonTitles = () => {
             themeLightButton.title = uiText[appState.language].themeLightTitle;
             themeDarkButton.title = uiText[appState.language].themeDarkTitle;
        };

        // --- Prompt Generation Logic ---
        const generatePrompt = () => {
            appState.isGenerating = true;
            generateButton.disabled = true;
            generatedPromptText.innerHTML = '<div class="flex justify-center items-center h-20"><i data-lucide="loader-2" class="w-6 h-6 animate-spin"></i></div>';
            lucide.createIcons(); // Render spinner icon
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
                    const element = getRandomElement(partArray, appState.partHistory[idx]);
                    appState.partHistory[idx].push(element);
                    if (appState.partHistory[idx].length > appState.HISTORY_SIZE) {
                        appState.partHistory[idx].shift();
                    }
                    return element;
                });
 main
                const newPrompt = categoryData.structure(promptParts);

                // Update history for each part (FIFO queue)
                promptParts.forEach((part, idx) => {
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
            langEnButton.addEventListener('click', () => setLanguage('en'));
            langTrButton.addEventListener('click', () => setLanguage('tr'));

            // Theme buttons
            themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
            themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
        };

        // --- Initialization ---
        const initializeApp = () => {
            // Load categories
            categories.forEach(category => {
                const button = document.createElement('button');
                button.id = `category-${category.id}`;
                button.className = 'category-button';
                if (category.id === appState.selectedCategory) {
                    button.classList.add('selected');
                }
                button.innerHTML = `
                    <i data-lucide="${category.icon}" class="lucide"></i>
                    <span>${category.name[appState.language]}</span>
                `;
                categoryButtonsContainer.appendChild(button);
            });

            // Initialize Lucide icons
            lucide.createIcons();

            // Load saved language or default to 'en'
            const savedLanguage = localStorage.getItem('language') || 'en';
            setLanguage(savedLanguage);

            // Load saved theme or default to 'dark'
            const savedTheme = localStorage.getItem('theme') || THEMES.DARK;
            setTheme(savedTheme);

            // Setup event listeners
            setupEventListeners();
        };

        // --- Run Initialization ---
        document.addEventListener('DOMContentLoaded', initializeApp);

