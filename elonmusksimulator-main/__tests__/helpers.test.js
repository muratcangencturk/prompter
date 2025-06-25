// Tests for shuffleArray and addInnovationImpactToQuestions
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadFunctions() {
  const file = path.resolve(__dirname, '..', 'main.js');
  const code = fs.readFileSync(file, 'utf8');

  function extract(name) {
    const start = code.indexOf(`function ${name}`);
    if (start === -1) throw new Error('function not found');
    let brace = 0;
    let end = code.indexOf('{', start);
    for (; end < code.length; end++) {
      if (code[end] === '{') brace++;
      else if (code[end] === '}') {
        brace--;
        if (brace === 0) {
          end++;
          break;
        }
      }
    }
    return code.slice(start, end);
  }

  const context = { Math, JSON };
  vm.createContext(context);
  const extracted = `${extract('shuffleArray')}; ${extract('addInnovationImpactToQuestions')}`;
  vm.runInContext(extracted, context);
  return {
    shuffleArray: context.shuffleArray,
    addInnovationImpactToQuestions: context.addInnovationImpactToQuestions,
  };
}

describe('helper functions', () => {
  const { shuffleArray, addInnovationImpactToQuestions } = loadFunctions();

  test('shuffleArray uses Fisher-Yates algorithm', () => {
    const arr = [1, 2, 3, 4];
    const spy = jest.spyOn(Math, 'random');
    spy.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0);
    const result = shuffleArray(arr);
    expect(result).toBe(arr);
    expect(result).toEqual([2, 3, 4, 1]);
    expect(spy).toHaveBeenCalledTimes(3);
    spy.mockRestore();
  });

  test('addInnovationImpactToQuestions adds innovation impact to tech questions', () => {
    const q = {
      text: 'New AI technology for Tesla',
      leftResponse: '',
      rightResponse: '',
      emojis: [],
      impact: {
        left: { tesla: 5, spacex: 0, ai_bots: 1 },
        right: { tesla: -2, spacex: -1, ai_bots: -1 },
      },
    };
    const [res] = addInnovationImpactToQuestions([q]);
    expect(res).not.toBe(q);
    expect(res.impact.left.innovation).toBe(10);
    expect(res.impact.right.innovation).toBe(-10);
    expect(q.impact.left.innovation).toBeUndefined();
  });

  test('addInnovationImpactToQuestions leaves non-tech questions unchanged', () => {
    const q = {
      text: 'Invite everyone to a picnic',
      leftResponse: '',
      rightResponse: '',
      emojis: [],
      impact: { left: {}, right: {} },
    };
    const [res] = addInnovationImpactToQuestions([q]);
    expect(res.impact.left.innovation).toBeUndefined();
    expect(res.impact.right.innovation).toBeUndefined();
  });
});
