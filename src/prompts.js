import { appState } from './state.js';

const loadedPrompts = {};

const getRandomElement = (array, history = []) => {
  if (!array || array.length === 0) return '';
  const available = array.filter((item) => !history.includes(item));
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }
  return array[Math.floor(Math.random() * array.length)];
};

const join = (arr) =>
  arr
    .join(' ')
    .replace(/\s+([,.!?])/g, '$1')
    .replace(/\s+\n/g, ' ')
    .trim();
const punctuate = (str) => (/[.!?]$/.test(str) ? str : str + '.');

const structures = {
  singleSentence: (parts) => punctuate(join(parts)),
  twoSentence: (parts) => {
    const first = punctuate(join(parts.slice(0, 3)));
    const second = punctuate(parts[3].trim());
    return `${first} ${second}`;
  },
  questionThenInstruction: (parts) => {
    const first = punctuate(join(parts.slice(0, 2)));
    const rest = `${parts[2].trim()} ${parts[3].trim()}`;
    return `${first} ${punctuate(rest)}`;
  },
  imageStructure: (parts) => {
    const first = punctuate(join(parts.slice(0, 2)));
    const rest = `${parts[2].trim()} ${parts[3].trim()}`;
    return `${first} ${punctuate(rest)}`;
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

export const categories = [
  {
    id: 'random',
    icon: 'shuffle',
    emoji: '🔀',
    name: {
      en: 'Random',
      tr: 'Rastgele',
      es: 'Aleatorio',
      zh: '随机',
      fr: 'Aléatoire',
      hi: 'रैंडम',
    },
  },
  {
    id: 'inspiring',
    icon: 'sunrise',
    emoji: '🌅',
    name: {
      en: 'Inspiring',
      tr: 'İlham Verici',
      es: 'Inspirador',
      zh: '鼓舞人心',
      fr: 'Inspirant',
      hi: 'प्रेरणादायक',
    },
  },
  {
    id: 'mindBlowing',
    icon: 'brain-circuit',
    emoji: '🤯',
    name: {
      en: 'Interesting',
      tr: 'İlginç',
      es: 'Interesante',
      zh: '有趣',
      fr: 'Intéressant',
      hi: 'दिलचस्प',
    },
  },
  {
    id: 'productivity',
    icon: 'zap',
    emoji: '⚡',
    name: {
      en: 'Productivity',
      tr: 'Üretkenlik',
      es: 'Productividad',
      zh: '生产力',
      fr: 'Productivité',
      hi: 'उत्पादकता',
    },
  },
  {
    id: 'educational',
    icon: 'graduation-cap',
    emoji: '🎓',
    name: {
      en: 'Educational',
      tr: 'Eğitici',
      es: 'Educativo',
      zh: '教育',
      fr: 'Éducatif',
      hi: 'शैक्षिक',
    },
  },
  {
    id: 'crazy',
    icon: 'laugh',
    emoji: '😂',
    name: {
      en: 'Crazy',
      tr: 'Uçuk',
      es: 'Ideas Locas',
      zh: '疯狂',
      fr: 'Idées Folles',
      hi: 'पागलपन',
    },
  },
  {
    id: 'perspective',
    icon: 'glasses',
    emoji: '🕶️',
    name: {
      en: 'Perspective',
      tr: 'Bakış Açısı',
      es: 'Perspectiva',
      zh: '视角',
      fr: 'Perspective',
      hi: 'दृष्टिकोण',
    },
  },
  {
    id: 'ai',
    icon: 'cpu',
    emoji: '🤖',
    name: { en: 'AI', tr: 'YZ', es: 'IA', zh: '人工智能', fr: 'IA', hi: 'एआई' },
  },
  {
    id: 'ideas',
    icon: 'lightbulb',
    emoji: '💡',
    name: {
      en: 'Ideas',
      tr: 'Fikirler',
      es: 'Ideas',
      zh: '创意',
      fr: 'Idées',
      hi: 'विचार',
    },
  },
  {
    id: 'video',
    icon: 'video',
    emoji: '🎬',
    name: { en: 'Video', tr: 'Video', es: 'Video', zh: '视频', fr: 'Vidéo', hi: 'वीडियो' },
  },
  {
    id: 'image',
    icon: 'image',
    emoji: '🖼️',
    name: { en: 'Image', tr: 'Görsel', es: 'Imagen', zh: '图像', fr: 'Image', hi: 'छवि' },
  },
  {
    id: 'hellprompts',
    icon: 'skull',
    emoji: '💀',
    name: {
      en: 'Hellprompts',
      tr: 'Hellprompts',
      es: 'Hellprompts',
      zh: '地狱提示',
      fr: 'Hellprompts',
      hi: 'हेलप्रॉम्प्ट्स',
    },
  },
];

export const ICON_FALLBACKS = {
  'brain-circuits': 'brain-circuit',
};

export const loadCategory = async (lang, cat) => {
  loadedPrompts[lang] = loadedPrompts[lang] || {};
  const cached = loadedPrompts[lang][cat];
  if (cached) {
    if (!cached.structure) {
      loadedPrompts[lang][cat] = {
        ...cached,
        structure: structures[catMap[cat]],
      };
    }
    return loadedPrompts[lang][cat];
  }
  const preloaded =
    window.prompts && window.prompts[lang] && window.prompts[lang][cat];
  let data;
  if (preloaded) {
    // copy preloaded data so global window.prompts is never mutated
    data = { ...preloaded };
  } else {
    const res = await fetch(`prompts/${lang}/${cat}.json`);
    data = await res.json();
  }

  data = { ...data, structure: structures[catMap[cat]] };
  loadedPrompts[lang][cat] = data;
  return data;
};

export const generatePrompt = async () => {
  appState.isGenerating = true;
  let selectedCatId = appState.selectedCategory;

  if (selectedCatId === 'random') {
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
    appState.isGenerating = false;
    throw new Error('Invalid category data');
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
  const newPrompt = categoryData.structure
    ? categoryData.structure(promptParts)
    : promptParts.join(' ');

  appState.generatedPrompt = newPrompt;
  appState.isGenerating = false;
  return { prompt: newPrompt, categoryId: selectedCatId };
};
