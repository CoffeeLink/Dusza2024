export function countDown(deadline: Date) {
  const now = new Date();
  const timeLeft = deadline.getTime() - now.getTime();

  if (timeLeft <= 0) {
    return "Lejárt az idő!";
  }

  const seconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} nap`;
  }

  if (hours > 0) {
    return `${hours} óra`;
  }

  if (minutes > 0) {
    return `${minutes} perc`;
  }

  if (seconds > 0) {
    return `${seconds} másodperc`;
  }
}

export function formatDateToStupidRustFormat(date: string) {
  // Remove trailing Z
  return new Date(Date.parse(date)).toISOString().slice(0, -1);
}
