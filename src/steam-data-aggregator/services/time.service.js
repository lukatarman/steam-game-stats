export function moreThanXhoursPassedSince(x, date) {
  const now = new Date();
  const milliseconds = Math.abs(now - date);
  const hours = milliseconds / 36e5;

  return hours > x;
}

export function delay(ms) {
  ms = ms || 2000;
  return new Promise(done => setTimeout(done, ms));
}

export function runFuncInLoopWithDelayOfXhours(func, x) {
  let firstRun = true;
  while(true) {
    if (firstRun) {
      firstRun = false;
      // todo: set hours variable
      const tillNextRun = hours > x ? hours - x : x - hours;
      await delay(tillNextRun * 36e5);
    }

    func();

    await delay(x * 36e5);
  }
}
