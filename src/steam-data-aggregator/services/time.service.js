export function moreThanXhoursPassedSince(x, date) {
  if(!date) return true;
  
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

export function runFuncInLoopWithDelayOfXhours(func, x) {
  // todo: pass in lastUpdate time in hours maybe?
  const tillNextRun = hours > x ? hours - x : x - hours;
  await delay(tillNextRun * 36e5);

  while(true) {
    func();
    await delay(x * 36e5);
  }
}
