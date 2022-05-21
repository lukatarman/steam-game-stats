export function delay(ms = 2000) {
  return new Promise(done => setTimeout(done, ms));
}

export function hoursToMs(hours) {
  return hours * 60 * 60 * 1000;
}

export function moreThanXhoursPassedSince(x, date) {
  return (msPassedSince(date)) > x;
}

export function msPassedSince(date) {
  const now = new Date().getTime();
  const dateInMs = date.getTime();
  return Math.abs(now - dateInMs);
}