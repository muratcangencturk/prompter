const fs = require('fs');

// Look for question JSON files in the current directory.  Files follow the
// pattern `questions.json` or `new_questions_batch<N>.json`.
const files = fs
  .readdirSync('.')
  .filter(
    (f) =>
      (/^questions(\.|$)/.test(f) || /^new_questions_batch\d+\.json$/.test(f)) &&
      f.endsWith('.json'),
  );

files.forEach((file) => {
  const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
  arr.forEach(q => {
    if (q && q.impact && q.impact.right && q.impact.left) {
      const sum = obj => Object.values(obj).reduce((a, b) => a + b, 0);
      const rightSum = sum(q.impact.right);
      const leftSum = sum(q.impact.left);
      if (rightSum < 0 && leftSum > 0) {
        [q.rightResponse, q.leftResponse] = [q.leftResponse, q.rightResponse];
        [q.impact.right, q.impact.left] = [q.impact.left, q.impact.right];
      }
    }
  });
  fs.writeFileSync(file, JSON.stringify(arr, null, 2) + '\n');
});
