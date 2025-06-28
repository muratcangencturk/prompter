module.exports = async function runTest(name, fn) {
  try {
    await fn();
    console.log(`\u2713 ${name}`);
  } catch (err) {
    console.error(`\u2717 ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
};
