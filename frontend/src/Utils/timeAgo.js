export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = { d: 86400, h: 3600, m: 60 };

  for (let key in intervals) {
    const val = Math.floor(seconds / intervals[key]);
    if (val > 0) return `${val}${key} ago`;
  }
  return "just now";
};