export function delay(ms = 2000) {
  return new Promise(done => setTimeout(done, ms));
}