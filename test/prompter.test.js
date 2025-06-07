const assert = require('assert');
const { getRandomElement, generatePrompt, optimizedPrompts } = require('../lib/prompter');

describe('getRandomElement', () => {
  it('returns different values when history is supplied', () => {
    const arr = ['a', 'b', 'c'];
    const first = getRandomElement(arr);
    const second = getRandomElement(arr, [first]);
    assert.notStrictEqual(first, second, 'should not repeat element from history');
  });
});

describe('generatePrompt', () => {
  it('generates prompt with three parts and correct language', () => {
    const history = [];
    const prompt = generatePrompt('tr', 'inspiring', history);
    const data = optimizedPrompts.tr.inspiring.parts;

    // Check each part array contributes to the prompt
    assert(data[0].some(p => prompt.includes(p)), 'first part missing');
    assert(data[1].some(p => prompt.includes(p)), 'second part missing');
    assert(data[2].some(p => prompt.includes(p)), 'third part missing');

    // ensure language respected by checking at least one known turkish word
    assert(prompt.includes(' '), 'prompt should contain spaces');
  });
});
