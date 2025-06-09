(function attachStructureFunctions(prompts) {
    const join = arr => arr.join(' ').replace(/\s+([,.!?])/g, '$1').replace(/\s+\n/g, ' ').trim();
    const punctuate = str => /[.!?]$/.test(str) ? str : str + '.';

    const structures = {
        singleSentence: parts => join(parts),
        twoSentence: parts => {
            const first = punctuate(join(parts.slice(0, 3)));
            return `${first} ${parts[3].trim()}`;
        },
        questionThenInstruction: parts => {
            const first = punctuate(join(parts.slice(0, 2)));
            return `${first} ${parts[2].trim()} ${parts[3].trim()}`;
        },
        imageStructure: parts => {
            const first = punctuate(join(parts.slice(0, 2)));
            return `${first} ${parts[2].trim()} ${parts[3].trim()}`;
        }
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
        hellprompts: 'twoSentence'
    };

    ['en', 'tr'].forEach(lang => {
        const langPrompts = prompts[lang];
        if (!langPrompts) return;
        Object.keys(catMap).forEach(cat => {
            if (langPrompts[cat]) {
                langPrompts[cat].structure = structures[catMap[cat]];
            }
        });
    });
})(window.prompts);
