export const promptScore = ({ likes = 0, saveCount = 0, shareCount = 0 } = {}) =>
  likes + saveCount + shareCount;

export const collectorScore = ({ likes = 0, saves = 0, shares = 0 } = {}) =>
  likes + saves + shares;
