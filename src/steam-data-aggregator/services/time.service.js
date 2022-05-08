export function moreThanXhoursPassedSince(x, date) {
  return hoursPassedSince(date) > x;
}

export function hoursPassedSince(date) {
  const now = new Date();
  const milliseconds = Math.abs(now - date);
  const hours = milliseconds / 36e5;

  return hours;
}

export function delay(ms) {
  ms = ms || 2000;
  return new Promise(done => setTimeout(done, ms));
}

export function runFuncInLoopWithDelayOfXhoursFromDate(func, x, date) {
  const hours = hoursPassedSince(date);
  const tillNextRun = hours > x ? x : x - hours;
  await delay(tillNextRun * 36e5);

  while(true) {
    func();
    await delay(x * 36e5);
  }
}