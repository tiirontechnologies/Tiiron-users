export const timeAgo = (date: string | Date): string => {
  const now = new Date().getTime();
  const created = new Date(date).getTime();

  const diff = Math.floor((now - created) / 1000);

  if (diff < 60) return "now";

  const min = Math.floor(diff / 60);
  if (min < 60) return `${min}m`;

  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}h`;

  const day = Math.floor(hour / 24);
  if (day < 7) return `${day}d`;

  const week = Math.floor(day / 7);
  if (week < 4) return `${week}w`;

  const month = Math.floor(day / 30);
  if (month < 12) return `${month}mo`;

  const year = Math.floor(day / 365);
  return `${year}y`;
};