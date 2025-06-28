export const calls = [];
export const sendNotification = (...args) => {
  calls.push(args);
};
export const reset = () => {
  calls.length = 0;
};
