const optimizedPrompts = require('../optimized_prompts');

function getRandomElement(array, history = []) {
    if (!array || array.length === 0) return '';
    const available = array.filter(item => !history.includes(item));
    if (available.length > 0) {
        return available[Math.floor(Math.random() * available.length)];
    }
    return array[Math.floor(Math.random() * array.length)];
}

function generatePrompt(language = 'en', categoryId = 'random', history = []) {
    let selectedCatId = categoryId;

    if (selectedCatId === 'random') {
        const availableCategories = Object.keys(optimizedPrompts[language]).filter(c => c !== 'random');
        selectedCatId = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    }

    const categoryData = optimizedPrompts[language][selectedCatId];
    if (!categoryData || !categoryData.parts || !Array.isArray(categoryData.parts)) {
        throw new Error(`Invalid data for category: ${selectedCatId}`);
    }

    const promptParts = categoryData.parts.map(partArray => getRandomElement(partArray, history));
    const newPrompt = categoryData.structure(promptParts);

    history.push(newPrompt);
    if (history.length > 50) {
        history.shift();
    }

    return newPrompt;
}

module.exports = { getRandomElement, generatePrompt, optimizedPrompts };
