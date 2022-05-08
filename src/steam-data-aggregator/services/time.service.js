export function moreThanXhoursPassedSince(x, date) {
  return (msPassedSince(date) / 36e5) > x;
}

export function msPassedSince(date) {
  const now = new Date();
  return Math.abs(now - date);
}

export function delay(ms) {
  ms = ms || 2000;
  return new Promise(done => setTimeout(done, ms));
}

export function runFuncInLoopWithDelayOfXmsFromDate(func, x, date) {
  const ms = msPassedSince(date);
  const tillNextRun = ms > x ? x : x - ms;
  await delay(tillNextRun);

  while(true) {
    func();
    await delay(x);
  }
}
