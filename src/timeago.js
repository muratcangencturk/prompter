export function timeAgo(timestamp, lang = 'en') {
  const now = Date.now();
  const diff = now - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  const tr = {
    minute: 'dk',
    hour: 'sa',
    day: 'g',
    week: 'hf',
    month: 'ay',
    year: 'yıl',
    ago: 'önce',
    now: 'az önce',
  };
  const en = {
    minute: 'm',
    hour: 'h',
    day: 'd',
    week: 'w',
    month: 'mo',
    year: 'y',
    ago: 'ago',
    now: 'just now',
  };
  const t = lang === 'tr' ? tr : en;
  if (diff >= year) return `${Math.floor(diff / year)} ${t.year} ${t.ago}`;
  if (diff >= month) return `${Math.floor(diff / month)} ${t.month} ${t.ago}`;
  if (diff >= week) return `${Math.floor(diff / week)} ${t.week} ${t.ago}`;
  if (diff >= day) return `${Math.floor(diff / day)} ${t.day} ${t.ago}`;
  if (diff >= hour) return `${Math.floor(diff / hour)} ${t.hour} ${t.ago}`;
  if (diff >= minute) return `${Math.floor(diff / minute)} ${t.minute} ${t.ago}`;
  return t.now;
}
