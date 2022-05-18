export function delay(ms = 2000) {
  return new Promise(done => setTimeout(done, ms));
}

export function hoursToMs(hours) {
  return hours * 60 * 60 * 1000;
}