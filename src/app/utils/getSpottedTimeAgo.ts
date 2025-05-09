export function getSpottedTimeAgo(dateString: string): string {
  const spottedDate = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - spottedDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 5) return "spotted 5+ years ago";
  if (years >= 1) return `spotted ${years} year${years > 1 ? "s" : ""} ago`;
  if (months >= 1) return `spotted ${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks >= 1) return `spotted ${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days >= 1) return `spotted ${days} day${days > 1 ? "s" : ""} ago`;
  if (hours >= 1) return `spotted ${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes >= 1)
    return `spotted ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "spotted just now";
}
