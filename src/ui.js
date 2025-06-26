import { appState, THEMES } from './state.js';
import { categories, ICON_FALLBACKS, generatePrompt } from './prompts.js';

const uiText = {
  en: {
    appTitle: 'PROMPTER',
    appSubtitle:
      'Prompt generator for AI - the ultimate prompt engineering online space',
    chooseStyleTitle: 'Select Your Prompt Inspiration',
    generateButtonText: 'Generate New Prompt',
    yourPromptTitle: 'Your Prompt',
    copyButtonTitle: 'Copy to clipboard',
    shareButtonTitle: 'Share on Prompter',
    shareTwitterTitle: 'Share on Twitter',
    saveButtonTitle: 'Save prompt (login required to sync online)',
    deleteButtonTitle: 'Delete prompt',
    historyTitle: 'Previous Prompts',
    clearHistoryTitle: 'Clear history',
    copySuccessMessage: 'Prompt copied successfully!',
    saveSuccessMessage: 'Prompt saved!',
    saveErrorMessage: 'Failed to save prompt.',
    shareMessage: 'Sharing...',
    saveFeedback: 'Saved!',
    appStats: 'Prompts that will unlock the potential of your mind',
    footerPrompter: 'Prompter',
    randomCategory: 'Random',
    themeLightTitle: 'Light Theme',
    themeDarkTitle: 'Dark Theme',
    langEnLabel: 'Switch to English',
    langTrLabel: 'Switch to Turkish',
    langEsLabel: 'Switch to Spanish',
    langFrLabel: 'Switch to French',
    langZhLabel: 'Switch to Chinese',
    appLogoAlt: 'Prompter logo',
    loginRequired: 'Login required',
    loginRequiredShare: 'Login required to share',
    loginRequiredSaveShare: 'Login required to save or share prompts.',
    loginRequiredLike: 'You need to log in to like prompts.',
    loginRequiredSharePrompt: 'You need to log in to share prompts.',
    copyFailed: 'Failed to copy prompt. Please try again.',
    shareFailed: 'Failed to share prompt. Please try again.',
    internetRequired: 'Internet connection required.',
    errorGenerating: 'Error generating prompt. Please try again.',
  },
  tr: {
    appTitle: 'PROMPTER',
    appSubtitle:
      'YZ için prompt üretici - prompt mühendisliğinin online adresi',
    chooseStyleTitle: 'Prompt İlhamınızı Seçin',
    generateButtonText: 'Yeni Prompt Üret',
    yourPromptTitle: 'Promptunuz',
    historyBottom: 'Geçmiş aşağıda',
    copyButtonTitle: 'Panoya kopyala',
    shareButtonTitle: "Prompter'da paylaş",
    shareTwitterTitle: "Twitter'da paylaş",
    saveButtonTitle: 'Promptu kaydet (online senkronizasyon için giriş yapın)',
    deleteButtonTitle: 'Sil',
    historyTitle: 'Önceki Promptlar',
    clearHistoryTitle: 'Geçmişi temizle',
    copySuccessMessage: 'Kopyalandı!',
    saveSuccessMessage: 'Kaydedildi!',
    saveErrorMessage: 'Prompt kaydedilemedi.',
    shareMessage: 'Paylaşılıyor...',
    saveFeedback: 'Kaydedildi!',
    appStats: 'Zihninizin potansiyelini açığa çıkaracak promptlar',
    footerPrompter: 'Prompter',
    randomCategory: 'Rastgele',
    themeLightTitle: 'Açık Tema',
    themeDarkTitle: 'Koyu Tema',
    langEnLabel: "İngilizce'ye geç",
    langTrLabel: "Türkçe'ye geç",
    langEsLabel: "İspanyolca'ya geç",
    langFrLabel: "Fransızca'ya geç",
    langZhLabel: "Çince'ye geç",
    appLogoAlt: 'Prompter logosu',
    loginRequired: 'Giriş gerekli',
    loginRequiredShare: 'Paylaşmak için giriş yapın',
    loginRequiredSaveShare: 'Promptları kaydetmek veya paylaşmak için giriş yapın.',
    loginRequiredLike: 'Promptları beğenmek için giriş yapın.',
    loginRequiredSharePrompt: 'Promptları paylaşmak için giriş yapın.',
    copyFailed: 'Prompt kopyalanamadı. Lütfen tekrar deneyin.',
    shareFailed: 'Prompt paylaşılamadı. Lütfen tekrar deneyin.',
    internetRequired: 'İnternet bağlantısı gerekli.',
    errorGenerating: 'Prompt oluşturulurken hata oluştu. Lütfen tekrar deneyin.',
  },
  es: {
    appTitle: 'PROMPTER',
    appSubtitle: 'Generador de prompts para IA - creatividad ilimitada',
    chooseStyleTitle: 'Selecciona tu inspiración de prompt',
    generateButtonText: 'Generar nuevo prompt',
    yourPromptTitle: 'Tu prompt',
    historyBottom: 'El historial de prompts está en la parte inferior',
    copyButtonTitle: 'Copiar al portapapeles',
    shareButtonTitle: 'Compartir en Prompter',
    shareTwitterTitle: 'Compartir en Twitter',
    saveButtonTitle: 'Guardar prompt (inicia sesión para sincronizar en línea)',
    deleteButtonTitle: 'Eliminar',
    historyTitle: 'Prompts anteriores',
    clearHistoryTitle: 'Borrar historial',
    copySuccessMessage: '¡Copiado!',
    saveSuccessMessage: '¡Guardado!',
    saveErrorMessage: 'No se pudo guardar el prompt.',
    shareMessage: 'Compartiendo...',
    saveFeedback: '¡Guardado!',
    appStats: 'Prompts que liberarán el potencial de tu mente',
    footerPrompter: 'Prompter',
    randomCategory: 'Aleatorio',
    themeLightTitle: 'Tema Claro',
    themeDarkTitle: 'Tema Oscuro',
    langEnLabel: 'Cambiar a inglés',
    langTrLabel: 'Cambiar a turco',
    langEsLabel: 'Cambiar a español',
    langFrLabel: 'Cambiar a francés',
    langZhLabel: 'Cambiar a chino',
    appLogoAlt: 'Logo de Prompter',
    loginRequired: 'Se requiere inicio de sesión',
    loginRequiredShare: 'Debes iniciar sesión para compartir',
    loginRequiredSaveShare: 'Debes iniciar sesión para guardar o compartir prompts.',
    loginRequiredLike: 'Debes iniciar sesión para dar me gusta a los prompts.',
    loginRequiredSharePrompt: 'Debes iniciar sesión para compartir prompts.',
    copyFailed: 'No se pudo copiar el prompt. Por favor inténtalo de nuevo.',
    shareFailed: 'No se pudo compartir el prompt. Por favor inténtalo de nuevo.',
    internetRequired: 'Se requiere conexión a Internet.',
    errorGenerating: 'Error al generar el prompt. Por favor inténtalo de nuevo.',
  },
  fr: {
    appTitle: 'PROMPTER',
    appSubtitle:
      "Générateur de prompts pour IA - l'espace ultime de l'ingénierie des prompts en ligne",
    chooseStyleTitle: 'Sélectionnez votre inspiration de prompt',
    generateButtonText: 'Générer un nouveau prompt',
    yourPromptTitle: 'Votre prompt',
    historyBottom: "L'historique des prompts est en bas",
    copyButtonTitle: 'Copier dans le presse-papiers',
    shareButtonTitle: 'Partager sur Prompter',
    shareTwitterTitle: 'Partager sur Twitter',
    saveButtonTitle:
      'Enregistrer le prompt (connexion requise pour la synchronisation en ligne)',
    deleteButtonTitle: 'Supprimer le prompt',
    historyTitle: 'Prompts précédents',
    clearHistoryTitle: "Effacer l'historique",
    copySuccessMessage: 'Prompt copié !',
    saveSuccessMessage: 'Prompt enregistré !',
    saveErrorMessage: "Échec de l'enregistrement du prompt.",
    shareMessage: 'Partage en cours...',
    saveFeedback: 'Enregistré !',
    appStats: 'Des prompts qui libéreront le potentiel de votre esprit',
    footerPrompter: 'Prompter',
    randomCategory: 'Aléatoire',
    themeLightTitle: 'Thème clair',
    themeDarkTitle: 'Thème sombre',
    langEnLabel: "Passer à l'anglais",
    langTrLabel: 'Passer au turc',
    langEsLabel: "Passer à l'espagnol",
    langFrLabel: 'Passer au français',
    langZhLabel: 'Passer au chinois',
    appLogoAlt: 'Logo de Prompter',
    loginRequired: 'Connexion requise',
    loginRequiredShare: 'Connexion requise pour partager',
    loginRequiredSaveShare: 'Vous devez vous connecter pour enregistrer ou partager des prompts.',
    loginRequiredLike: 'Vous devez vous connecter pour aimer les prompts.',
    loginRequiredSharePrompt: 'Vous devez vous connecter pour partager des prompts.',
    copyFailed: 'Échec de la copie du prompt. Veuillez réessayer.',
    shareFailed: 'Échec du partage du prompt. Veuillez réessayer.',
    internetRequired: 'Connexion Internet requise.',
    errorGenerating: 'Erreur lors de la génération du prompt. Veuillez réessayer.',
  },
  zh: {
    appTitle: 'PROMPTER',
    appSubtitle: '面向AI的提示生成器 - 终极提示工程在线空间',
    chooseStyleTitle: '选择你的提示灵感',
    generateButtonText: '生成新的提示',
    yourPromptTitle: '你的提示',
    historyBottom: '提示历史在底部',
    copyButtonTitle: '复制到剪贴板',
    shareButtonTitle: '在 Prompter 上分享',
    shareTwitterTitle: '在 Twitter 上分享',
    saveButtonTitle: '保存提示（登录后才能在线同步）',
    deleteButtonTitle: '删除提示',
    historyTitle: '之前的提示',
    clearHistoryTitle: '清除历史',
    copySuccessMessage: '已复制!',
    saveSuccessMessage: '已保存!',
    saveErrorMessage: '保存提示失败。',
    shareMessage: '正在分享...',
    saveFeedback: '已保存!',
    appStats: '激发你思维潜力的提示',
    footerPrompter: 'Prompter',
    randomCategory: '随机',
    themeLightTitle: '浅色主题',
    themeDarkTitle: '深色主题',
    langEnLabel: '切换到英文',
    langTrLabel: '切换到土耳其语',
    langEsLabel: '切换到西班牙语',
    langFrLabel: '切换到法语',
    langZhLabel: '切换到中文',
    appLogoAlt: 'Prompter 标志',
    loginRequired: '需要登录',
    loginRequiredShare: '登录后才能分享',
    loginRequiredSaveShare: '需要登录才能保存或分享提示。',
    loginRequiredLike: '需要登录才能点赞提示。',
    loginRequiredSharePrompt: '需要登录才能分享提示。',
    copyFailed: '复制提示失败。请再试一次。',
    shareFailed: '分享提示失败。请再试一次。',
    internetRequired: '需要连接互联网。',
    errorGenerating: '生成提示时出错。请再试一次。',
  },
  hi: {
    appTitle: 'PROMPTER',
    appSubtitle:
      'एआई के लिए प्रॉम्प्ट जनरेटर - सर्वश्रेष्ठ प्रॉम्प्ट इंजीनियरिंग ऑनलाइन स्पेस',
    chooseStyleTitle: 'अपनी प्रॉम्प्ट प्रेरणा चुनें',
    generateButtonText: 'नया प्रॉम्प्ट बनाएं',
    yourPromptTitle: 'आपका प्रॉम्प्ट',
    historyBottom: 'प्रॉम्प्ट इतिहास नीचे है',
    copyButtonTitle: 'क्लिपबोर्ड पर कॉपी करें',
    shareButtonTitle: 'Prompter पर साझा करें',
    shareTwitterTitle: 'ट्विटर पर साझा करें',
    saveButtonTitle: 'प्रॉम्प्ट सहेजें (ऑनलाइन सिंक के लिए लॉगिन आवश्यक)',
    deleteButtonTitle: 'प्रॉम्प्ट हटाएं',
    historyTitle: 'पिछले प्रॉम्प्ट',
    clearHistoryTitle: 'इतिहास साफ करें',
    copySuccessMessage: 'प्रॉम्प्ट सफलतापूर्वक कॉपी हुआ!',
    saveSuccessMessage: 'प्रॉम्प्ट सहेजा गया!',
    saveErrorMessage: 'प्रॉम्प्ट सहेजने में विफल।',
    shareMessage: 'साझा किया जा रहा है...',
    saveFeedback: 'सहेजा गया!',
    appStats: 'ऐसे प्रॉम्प्ट जो आपके दिमाग की क्षमता को खोलेंगे',
    footerPrompter: 'Prompter',
    randomCategory: 'रैंडम',
    themeLightTitle: 'लाइट थीम',
    themeDarkTitle: 'डार्क थीम',
    langEnLabel: 'अंग्रेजी पर स्विच करें',
    langTrLabel: 'तुर्की पर स्विच करें',
    langEsLabel: 'स्पेनिश पर स्विच करें',
    langFrLabel: 'फ्रेंच पर स्विच करें',
    langZhLabel: 'चीनी पर स्विच करें',
    appLogoAlt: 'Prompter लोगो',
    loginRequired: 'लॉगिन आवश्यक है',
    loginRequiredShare: 'शेयर करने के लिए लॉगिन करें',
    loginRequiredSaveShare: 'प्रॉम्प्ट सहेजने या साझा करने के लिए लॉगिन करें।',
    loginRequiredLike: 'प्रॉम्प्ट पसंद करने के लिए लॉगिन करें।',
    loginRequiredSharePrompt: 'प्रॉम्प्ट साझा करने के लिए लॉगिन करें।',
    copyFailed: 'प्रॉम्प्ट कॉपी करने में विफल। कृपया पुनः प्रयास करें।',
    shareFailed: 'प्रॉम्प्ट साझा करने में विफल। कृपया पुनः प्रयास करें।',
    internetRequired: 'इंटरनेट कनेक्शन आवश्यक है।',
    errorGenerating: 'प्रॉम्प्ट जनरेट करने में त्रुटि। कृपया पुनः प्रयास करें।',
  },
};

let categoryButtonsContainer;
let generateButton;
let promptDisplayArea;
let generatedPromptText;
let copyButton;
let shareButton;
let saveButton;
let shareTwitterButton;
let categorySelect;
let copySuccessMessage;
let saveSuccessMessage;
let saveErrorMessage;
let shareMessage;
let langEnButton;
let langTrButton;
let langEsButton;
let langFrButton;
let langZhButton;
let langHiButton;
let langToggleButton;
let langMenu;
let currentLangLabel;
let themeLightButton;
let themeDarkButton;
let themeLinkElement;
let themeVersion = '';
let appLogo;
let historyPanel;
let historyList;
let clearHistoryButton;

const setTheme = (theme) => {
  appState.theme = theme;
  if (themeLinkElement) {
    const versionSuffix = themeVersion ? `?${themeVersion}` : '';
    themeLinkElement.href = `css/theme-${theme}.css${versionSuffix}`;
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
  updateButtonTitles();
};

const setLanguage = (lang) => {
  appState.language = lang;
  document.documentElement.lang = lang;
  document.getElementById('app-title').textContent = uiText[lang].appTitle;
  document.getElementById('app-subtitle').textContent =
    uiText[lang].appSubtitle;
  document.getElementById('choose-style-title').textContent =
    uiText[lang].chooseStyleTitle;
  document.getElementById('generate-button-text').textContent =
    uiText[lang].generateButtonText;
  generateButton.setAttribute('aria-label', uiText[lang].generateButtonText);
  const promptTitleEl = document.getElementById('your-prompt-title');
  promptTitleEl.textContent = `${uiText[lang].yourPromptTitle} \u2193`;
  if (appLogo) {
    appLogo.alt = uiText[lang].appLogoAlt;
  }
  copyButton.title = uiText[lang].copyButtonTitle;
  copyButton.setAttribute('aria-label', uiText[lang].copyButtonTitle);
  if (shareButton) {
    shareButton.title = uiText[lang].shareButtonTitle;
    shareButton.setAttribute('aria-label', uiText[lang].shareButtonTitle);
  }
  if (saveButton) {
    saveButton.title = uiText[lang].saveButtonTitle;
    saveButton.setAttribute('aria-label', uiText[lang].saveButtonTitle);
  }
  if (shareTwitterButton) {
    shareTwitterButton.title = uiText[lang].shareTwitterTitle;
    shareTwitterButton.setAttribute(
      'aria-label',
      uiText[lang].shareTwitterTitle
    );
  }
  copySuccessMessage.textContent = uiText[lang].copySuccessMessage;
  saveSuccessMessage.textContent = uiText[lang].saveSuccessMessage;
  if (saveErrorMessage) {
    saveErrorMessage.textContent = uiText[lang].saveErrorMessage;
  }
  if (shareMessage) {
    shareMessage.textContent = uiText[lang].shareMessage;
  }
  document.getElementById('history-title').textContent =
    uiText[lang].historyTitle;
  clearHistoryButton.title = uiText[lang].clearHistoryTitle;
  clearHistoryButton.setAttribute('aria-label', uiText[lang].clearHistoryTitle);
  document.getElementById('app-stats').textContent = uiText[lang].appStats;
  document.getElementById('footer-prompter').textContent =
    uiText[lang].footerPrompter;
  langEnButton.title = uiText[lang].langEnLabel;
  langEnButton.setAttribute('aria-label', uiText[lang].langEnLabel);
  langTrButton.title = uiText[lang].langTrLabel;
  langTrButton.setAttribute('aria-label', uiText[lang].langTrLabel);
  if (langEsButton) {
    langEsButton.title = uiText[lang].langEsLabel;
    langEsButton.setAttribute('aria-label', uiText[lang].langEsLabel);
  }
  if (langFrButton) {
    langFrButton.title = uiText[lang].langFrLabel;
    langFrButton.setAttribute('aria-label', uiText[lang].langFrLabel);
  }
  if (langZhButton) {
    langZhButton.title = uiText[lang].langZhLabel;
    langZhButton.setAttribute('aria-label', uiText[lang].langZhLabel);
  }
  if (currentLangLabel) {
    const arrow = currentLangLabel.querySelector('svg');
    currentLangLabel.textContent = lang.toUpperCase();
    if (arrow) {
      currentLangLabel.appendChild(arrow);
    }
  }

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
  if (categorySelect) {
    Array.from(categorySelect.options).forEach((opt) => {
      const cat = categories.find((c) => c.id === opt.value);
      if (cat) opt.textContent = cat.name[lang];
    });
  }

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
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'tr') {
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
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'es') {
    if (langEsButton) {
      langEsButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
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
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'fr') {
    if (langFrButton) {
      langFrButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langFrButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
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
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else if (lang === 'zh') {
    if (langZhButton) {
      langZhButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
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
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  } else {
    if (langHiButton) {
      langHiButton.classList.add(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langHiButton.classList.remove(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
    if (langZhButton) {
      langZhButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langZhButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
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
    if (langEsButton) {
      langEsButton.classList.remove(
        'active',
        'bg-white/30',
        'text-white',
        'shadow-md'
      );
      langEsButton.classList.add(
        'bg-transparent',
        'text-blue-200',
        'hover:bg-white/10'
      );
    }
  }
  localStorage.setItem('language', lang);
  updateButtonTitles();
  renderHistory();
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
  if (saveButton) {
    saveButton.title = uiText[appState.language].saveButtonTitle;
    saveButton.setAttribute(
      'aria-label',
      uiText[appState.language].saveButtonTitle
    );
  }
  if (shareTwitterButton) {
    shareTwitterButton.title = uiText[appState.language].shareTwitterTitle;
    shareTwitterButton.setAttribute(
      'aria-label',
      uiText[appState.language].shareTwitterTitle
    );
  }
};

const renderHistory = () => {
  if (!historyPanel || !historyList) return;
  historyList.innerHTML = '';
  const reversed = appState.history.slice().reverse();
  reversed.forEach((prompt, revIdx) => {
    const idx = appState.history.length - 1 - revIdx;
    const li = document.createElement('li');
    li.className = 'flex justify-between items-start gap-2';
    const textarea = document.createElement('textarea');
    textarea.className =
      'history-edit flex-1 whitespace-pre-wrap font-mono bg-transparent p-1 rounded-md';
    textarea.value = prompt;
    textarea.setAttribute('data-index', idx);
    const actions = document.createElement('div');
    actions.className = 'flex gap-2';

    const copyBtn = document.createElement('button');
    copyBtn.className =
      'history-copy p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    copyBtn.title = uiText[appState.language].copyButtonTitle;
    copyBtn.setAttribute(
      'aria-label',
      uiText[appState.language].copyButtonTitle
    );
    copyBtn.setAttribute('data-index', idx);
    copyBtn.innerHTML =
      '<i data-lucide="copy" class="w-3 h-3" aria-hidden="true"></i>';
    actions.appendChild(copyBtn);

    const copyFeedback = document.createElement('span');
    copyFeedback.className =
      'history-copy-feedback text-green-400 text-xs ml-1 hidden';
    copyFeedback.textContent = uiText[appState.language].copySuccessMessage;
    actions.appendChild(copyFeedback);

    if (saveButton) {
      const saveBtn = document.createElement('button');
      saveBtn.className =
        'history-save p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      saveBtn.title = uiText[appState.language].saveButtonTitle;
      saveBtn.setAttribute(
        'aria-label',
        uiText[appState.language].saveButtonTitle
      );
      saveBtn.setAttribute('data-index', idx);
      saveBtn.innerHTML =
        '<i data-lucide="save" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(saveBtn);
    }

    if (shareTwitterButton) {
      const shareBtn = document.createElement('button');
      shareBtn.className =
        'history-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      shareBtn.title = uiText[appState.language].shareTwitterTitle;
      shareBtn.setAttribute(
        'aria-label',
        uiText[appState.language].shareTwitterTitle
      );
      shareBtn.setAttribute('data-index', idx);
      shareBtn.innerHTML =
        '<i data-lucide="twitter" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(shareBtn);
    }

    if (shareButton) {
      const siteShareBtn = document.createElement('button');
      siteShareBtn.className =
        'history-site-share p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
      siteShareBtn.title = uiText[appState.language].shareButtonTitle;
      siteShareBtn.setAttribute(
        'aria-label',
        uiText[appState.language].shareButtonTitle
      );
      siteShareBtn.setAttribute('data-index', idx);
      siteShareBtn.innerHTML =
        '<i data-lucide="share-2" class="w-3 h-3" aria-hidden="true"></i>';
      actions.appendChild(siteShareBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className =
      'history-delete p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50';
    deleteBtn.title = uiText[appState.language].deleteButtonTitle;
    deleteBtn.setAttribute(
      'aria-label',
      uiText[appState.language].deleteButtonTitle
    );
    deleteBtn.setAttribute('data-index', idx);
    deleteBtn.innerHTML =
      '<i data-lucide="trash" class="w-3 h-3" aria-hidden="true"></i>';
    actions.appendChild(deleteBtn);

    const feedback = document.createElement('span');
    feedback.className = 'save-feedback text-green-400 text-xs ml-1 hidden';
    feedback.textContent = uiText[appState.language].saveFeedback;
    actions.appendChild(feedback);

    li.appendChild(textarea);
    li.appendChild(actions);
    historyList.appendChild(li);
  });
  historyPanel.classList.toggle('hidden', appState.history.length === 0);
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
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
    const { prompt } = await generatePrompt();
    generatedPromptText.textContent = prompt;
    appState.history.push(prompt);
    if (appState.history.length > appState.HISTORY_SIZE) {
      appState.history.shift();
    }
    localStorage.setItem('promptHistory', JSON.stringify(appState.history));
    renderHistory();
  } catch (err) {
    console.error(err);
    if (err && err.message === 'offline') {
      generatedPromptText.textContent = uiText[appState.language].internetRequired;
    } else {
      generatedPromptText.textContent = uiText[appState.language].errorGenerating;
    }
  } finally {
    appState.isGenerating = false;
    generateButton.disabled = false;
  }
};

const sharePrompt = (prompt, baseUrl) => {
  if (!prompt) return;
  const link = ' https://prompterai.space';
  const url = `${baseUrl}${encodeURIComponent(`${prompt}${link}`)}`;
  window.open(url, '_blank');
};

const setupEventListeners = () => {
  categories.forEach((category) => {
    const button = document.getElementById(`category-${category.id}`);
    if (button) {
      button.addEventListener('click', () => {
        if (
          ['random', 'hellprompts', 'ai', 'educational'].includes(category.id)
        ) {
          window.open('https://otieu.com/4/9472472', '_blank');
        }
        appState.selectedCategory = category.id;
        document
          .querySelectorAll('.category-button')
          .forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
      });
    }
  });

  generateButton.addEventListener('click', () => {
    generateButton.disabled = true;
    handleGenerate();
  });

  generatedPromptText.addEventListener('input', () => {
    const val =
      'value' in generatedPromptText
        ? generatedPromptText.value
        : generatedPromptText.textContent;
    appState.generatedPrompt = val;
  });

  copyButton.addEventListener('click', () => {
    if (!appState.generatedPrompt) return;
    navigator.clipboard
      .writeText(appState.generatedPrompt)
      .then(() => {
        appState.copySuccess = true;
        copySuccessMessage.classList.remove('hidden');
        copyButton.classList.add('button-pop');
        setTimeout(() => {
          copySuccessMessage.classList.add('hidden');
          appState.copySuccess = false;
          copyButton.classList.remove('button-pop');
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        alert(uiText[appState.language].copyFailed);
      });
  });

  if (shareButton) {
    const updateShareIcon = () => {
      const svg = shareButton.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          shareButton.classList.contains('active') ? 'currentColor' : 'none'
        );
    };
    updateShareIcon();
    shareButton.addEventListener('click', async () => {
      if (!appState.generatedPrompt) return;
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequiredShare);
        return;
      }
      shareButton.classList.add('button-pop');
      shareButton.classList.toggle('active');
      updateShareIcon();
      shareMessage?.classList.remove('hidden');
      setTimeout(() => {
        shareMessage?.classList.add('hidden');
        shareButton.classList.remove('button-pop');
      }, 2000);
      try {
        const { savePrompt } = await import('./prompt.js');
        await savePrompt(
          appState.generatedPrompt,
          appState.currentUser.uid,
          categorySelect ? categorySelect.value : appState.selectedCategory,
          appState.currentUser.displayName || '',
          appState.currentUser.email || ''
        );
      } catch (err) {
        console.error(err);
        alert(uiText[appState.language].shareFailed);
      }
    });
  }

  if (saveButton) {
    const updateSaveIcon = () => {
      const svg = saveButton.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          saveButton.classList.contains('active') ? 'currentColor' : 'none'
        );
    };
    updateSaveIcon();
    saveButton.addEventListener('click', async () => {
      if (!appState.generatedPrompt) return;
      saveButton.classList.toggle('active');
      updateSaveIcon();
      appState.savedPrompts.push(appState.generatedPrompt);
      localStorage.setItem(
        'savedPrompts',
        JSON.stringify(appState.savedPrompts)
      );
      if (appState.currentUser) {
        try {
          const { saveUserPrompt } = await import('./prompt.js');
          await saveUserPrompt(
            appState.generatedPrompt,
            appState.currentUser.uid
          );
        } catch (err) {
          console.error('Failed to sync prompt:', err);
        }
      }
      saveSuccessMessage.classList.remove('hidden');
      setTimeout(() => {
        saveSuccessMessage.classList.add('hidden');
      }, 2000);
      saveButton.classList.add('button-pop');
      setTimeout(() => {
        saveButton.classList.remove('button-pop');
      }, 300);
      saveButton.disabled = true;
      setTimeout(() => {
        saveButton.disabled = false;
      }, 500);
    });
  }

  if (shareTwitterButton) {
    const updateShareTwitterIcon = () => {
      const svg = shareTwitterButton.querySelector('svg');
      if (svg)
        svg.setAttribute(
          'fill',
          shareTwitterButton.classList.contains('active') ? 'currentColor' : 'none'
        );
    };
    updateShareTwitterIcon();
    shareTwitterButton.addEventListener('click', () => {
      shareTwitterButton.classList.add('button-pop');
      shareTwitterButton.classList.toggle('active');
      updateShareTwitterIcon();
      if (shareMessage) {
        shareMessage.classList.remove('hidden');
        setTimeout(() => {
          shareMessage.classList.add('hidden');
        }, 2000);
      }
      setTimeout(() => {
        shareTwitterButton.classList.remove('button-pop');
      }, 300);
      sharePrompt(
        appState.generatedPrompt,
        'https://twitter.com/intent/tweet?text='
      );
    });
  }

  clearHistoryButton.addEventListener('click', () => {
    appState.history = [];
    localStorage.setItem('promptHistory', JSON.stringify(appState.history));
    renderHistory();
  });

  historyList.addEventListener('click', async (e) => {
    const copyBtn = e.target.closest('.history-copy');
    const saveBtn = e.target.closest('.history-save');
    const shareBtn = e.target.closest('.history-share');
    const siteShareBtn = e.target.closest('.history-site-share');
    const deleteBtn = e.target.closest('.history-delete');
    const btn = copyBtn || saveBtn || shareBtn || siteShareBtn || deleteBtn;
    if (!btn) return;
    const index = parseInt(btn.getAttribute('data-index'), 10);
    if (Number.isNaN(index)) return;
    const text = appState.history[index];
    if (deleteBtn) {
      const li = deleteBtn.closest('li');
      if (li) li.classList.add('fade-out');
      deleteBtn.classList.add('button-pop');
      setTimeout(() => {
        deleteBtn.classList.remove('button-pop');
      }, 300);
      setTimeout(() => {
        appState.history.splice(index, 1);
        localStorage.setItem('promptHistory', JSON.stringify(appState.history));
        renderHistory();
      }, 300);
    } else if (!text) {
      return;
    } else if (copyBtn) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          const feedback = copyBtn.parentElement.querySelector(
            '.history-copy-feedback'
          );
          if (feedback) {
            feedback.classList.remove('hidden');
            setTimeout(() => feedback.classList.add('hidden'), 1000);
          }
          copyBtn.classList.add('button-pop');
          setTimeout(() => {
            copyBtn.classList.remove('button-pop');
          }, 300);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    } else if (saveBtn) {
      saveBtn.classList.toggle('active');
      const saveIcon = saveBtn.querySelector('svg');
      if (saveIcon)
        saveIcon.setAttribute(
          'fill',
          saveBtn.classList.contains('active') ? 'currentColor' : 'none'
        );
      appState.savedPrompts.push(text);
      localStorage.setItem(
        'savedPrompts',
        JSON.stringify(appState.savedPrompts)
      );
      let saved = true;
      if (appState.currentUser) {
        try {
          const { savePrompt } = await import('./prompt.js');
          await savePrompt(
            text,
            appState.currentUser.uid,
            categorySelect ? categorySelect.value : appState.selectedCategory,
            appState.currentUser.displayName || '',
            appState.currentUser.email || ''
          );
        } catch (err) {
          console.error(err);
          saved = false;
          if (saveErrorMessage) {
            saveErrorMessage.classList.remove('hidden');
          }
          const retry = confirm(
            `${uiText[appState.language].saveErrorMessage} Retry?`
          );
          if (retry) {
            try {
              const { savePrompt: retrySavePrompt } = await import(
                './prompt.js'
              );
              await retrySavePrompt(
                text,
                appState.currentUser.uid,
                undefined,
                appState.currentUser.displayName || '',
                appState.currentUser.email || ''
              );
              saved = true;
            } catch (err2) {
              console.error(err2);
              saved = false;
            }
          }
          setTimeout(() => {
            if (saveErrorMessage) saveErrorMessage.classList.add('hidden');
          }, 2000);
        }
      }
      if (saved) {
        const feedback = saveBtn.parentElement.querySelector('.save-feedback');
        if (feedback) {
          feedback.classList.remove('hidden');
          setTimeout(() => {
            feedback.classList.add('hidden');
          }, 1000);
        }
      }
      saveBtn.classList.add('button-pop');
      setTimeout(() => {
        saveBtn.classList.remove('button-pop');
      }, 300);
    } else if (siteShareBtn) {
      if (!appState.currentUser) {
        alert(uiText[appState.language].loginRequiredShare);
        return;
      }
      siteShareBtn.classList.toggle('active');
      const siteShareIcon = siteShareBtn.querySelector('svg');
      if (siteShareIcon)
        siteShareIcon.setAttribute(
          'fill',
          siteShareBtn.classList.contains('active') ? 'currentColor' : 'none'
        );
      siteShareBtn.classList.add('button-pop');
      if (shareMessage) {
        shareMessage.classList.remove('hidden');
        setTimeout(() => {
          shareMessage.classList.add('hidden');
        }, 2000);
      }
      setTimeout(() => {
        siteShareBtn.classList.remove('button-pop');
      }, 300);
      try {
        const { savePrompt } = await import('./prompt.js');
        await savePrompt(
          text,
          appState.currentUser.uid,
          categorySelect ? categorySelect.value : appState.selectedCategory,
          appState.currentUser.displayName || '',
          appState.currentUser.email || ''
        );
      } catch (err) {
        console.error(err);
        alert(uiText[appState.language].shareFailed);
      }
    } else if (shareBtn) {
      shareBtn.classList.toggle('active');
      const shareIcon = shareBtn.querySelector('svg');
      if (shareIcon)
        shareIcon.setAttribute(
          'fill',
          shareBtn.classList.contains('active') ? 'currentColor' : 'none'
        );
      shareBtn.classList.add('button-pop');
      if (shareMessage) {
        shareMessage.classList.remove('hidden');
        setTimeout(() => {
          shareMessage.classList.add('hidden');
        }, 2000);
      }
      setTimeout(() => {
        shareBtn.classList.remove('button-pop');
      }, 300);
      sharePrompt(text, 'https://twitter.com/intent/tweet?text=');
    }
  });

  historyList.addEventListener('input', (e) => {
    const target = e.target.closest('.history-edit');
    if (!target) return;
    const idx = Number(target.getAttribute('data-index'));
    const value = 'value' in target ? target.value : target.textContent;
    if (!Number.isNaN(idx)) {
      appState.history[idx] = value;
      localStorage.setItem('promptHistory', JSON.stringify(appState.history));
    }
  });

  if (langToggleButton && langMenu) {
    langToggleButton.addEventListener('click', () => {
      langMenu.classList.toggle('hidden');
    });
  }

  if (currentLangLabel && langMenu) {
    currentLangLabel.addEventListener('click', () => {
      langMenu.classList.toggle('hidden');
    });
  }

  langEnButton.addEventListener('click', () => setLanguage('en'));
  langTrButton.addEventListener('click', () => setLanguage('tr'));
  if (langEsButton) {
    langEsButton.addEventListener('click', () => setLanguage('es'));
  }
  if (langFrButton) {
    langFrButton.addEventListener('click', () => setLanguage('fr'));
  }
  if (langZhButton) {
    langZhButton.addEventListener('click', () => setLanguage('zh'));
  }
  if (langHiButton) {
    langHiButton.addEventListener('click', () => setLanguage('hi'));
  }

  [
    langEnButton,
    langTrButton,
    langEsButton,
    langFrButton,
    langZhButton,
    langHiButton,
  ].forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', () => {
        langMenu && langMenu.classList.add('hidden');
      });
    }
  });

  themeLightButton.addEventListener('click', () => setTheme(THEMES.LIGHT));
  themeDarkButton.addEventListener('click', () => setTheme(THEMES.DARK));
};

export const initializeApp = () => {
  categoryButtonsContainer = document.getElementById('category-buttons');
  generateButton = document.getElementById('generate-button');
  promptDisplayArea = document.getElementById('prompt-display-area');
  generatedPromptText = document.getElementById('generated-prompt-text');
  copyButton = document.getElementById('copy-button');
  shareButton = document.getElementById('share-button');
  saveButton = document.getElementById('save-button');
  shareTwitterButton = document.getElementById('share-twitter');
  categorySelect = document.getElementById('share-category');
  copySuccessMessage = document.getElementById('copy-success-message');
  saveSuccessMessage = document.getElementById('save-success-message');
  saveErrorMessage = document.getElementById('save-error-message');
  shareMessage = document.getElementById('share-message');
  langEnButton = document.getElementById('lang-en');
  langTrButton = document.getElementById('lang-tr');
  langEsButton = document.getElementById('lang-es');
  langFrButton = document.getElementById('lang-fr');
  langZhButton = document.getElementById('lang-zh');
  langHiButton = document.getElementById('lang-hi');
  langToggleButton = document.getElementById('lang-toggle');
  langMenu = document.getElementById('lang-menu');
  currentLangLabel = document.getElementById('current-lang');
  themeLightButton = document.getElementById('theme-light');
  themeDarkButton = document.getElementById('theme-dark');
  themeLinkElement = document.getElementById('theme-css');
  if (themeLinkElement) {
    const href = themeLinkElement.getAttribute('href') || '';
    const parts = href.split('?');
    if (parts[1]) {
      themeVersion = parts[1];
    }
  }
  appLogo = document.getElementById('app-logo');
  historyPanel = document.getElementById('history-panel');
  historyList = document.getElementById('history-list');
  clearHistoryButton = document.getElementById('clear-history');
  if (categorySelect) {
    categorySelect.innerHTML = '';
    categories.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name[appState.language];
      categorySelect.appendChild(opt);
    });
    categorySelect.value = appState.selectedCategory;
  }

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

      window.lucide.createIcons();
      return true;
    }
    return false;
  };

  const savedLanguage = localStorage.getItem('language') || 'tr';
  setLanguage(savedLanguage);

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
    button.innerHTML = `
                    <span class="emoji-icon mr-1" aria-hidden="true">${
                      category.emoji
                    }</span>
                    <i data-lucide="${
                      category.icon
                    }" class="lucide" aria-hidden="true"></i>
                    <span class="category-label">${
                      category.name[appState.language]
                    }</span>`;
    categoryButtonsContainer.appendChild(button);
  });
  if (window.lucideScripts && window.lucideScripts.loadPromise) {
    window.lucideScripts.loadPromise.then(runLucide);
  }

  renderHistory();

  setupEventListeners();
};
