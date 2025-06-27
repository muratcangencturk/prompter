const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadQuestions() {
  const dir = path.resolve(__dirname, '..');
  const files = fs.readdirSync(dir).filter(f =>
    /^questions/.test(f) || /^new_questions_batch\d+/.test(f)
  );
  const all = [];
  files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const start = content.indexOf('[');
    const end = content.lastIndexOf(']');
    const arrayCode = content.slice(start, end + 1);
    const context = {};
    vm.createContext(context);
    vm.runInContext(`result = ${arrayCode}`, context);
    all.push(...context.result);
  });
  return all;
}

describe('questions data', () => {
  const questions = loadQuestions();

  test('each question has required fields', () => {
    questions.forEach((q, idx) => {
      expect(typeof q.text).toBe('string');
      expect(typeof q.leftResponse).toBe('string');
      expect(typeof q.rightResponse).toBe('string');
      expect(Array.isArray(q.emojis)).toBe(true);
      expect(q.emojis.length).toBeGreaterThan(0);
      expect(q).toHaveProperty('impact');
      expect(q.impact).toHaveProperty('left');
      expect(q.impact).toHaveProperty('right');
    });
  });

  test('no empty text or responses', () => {
    questions.forEach(q => {
      expect(q.text.trim().length).toBeGreaterThan(0);
      expect(q.leftResponse.trim().length).toBeGreaterThan(0);
      expect(q.rightResponse.trim().length).toBeGreaterThan(0);
    });
  });

  test('impact values are numbers within -30 and 30', () => {
    questions.forEach(q => {
      ['left', 'right'].forEach(side => {
        const impacts = q.impact[side];
        for (const key in impacts) {
          const value = impacts[key];
          expect(typeof value).toBe('number');
          expect(value).toBeLessThanOrEqual(30);
          expect(value).toBeGreaterThanOrEqual(-30);
        }
      });
    });
  });
});
