import { delay } from "../../shared/time.utils.js";

export function moreThanXhoursPassedSince(x, date) {
  return (msPassedSince(date)) > x;
}

export function msPassedSince(date) {
  const now = new Date().getTime();
  const dateInMs = date.getTime();
  return Math.abs(now - dateInMs);
}

//TODO: add to test
export async function runFuncInLoopWithDelayOfXmsFromDate(func, x, date, stopAfterXiterations = Number.POSITIVE_INFINITY) {
  const ms = msPassedSince(date);
  const tillNextRun = ms > x ? 0 : x - ms;
  await delay(tillNextRun);

  while(stopAfterXiterations--) {
    func();
    await delay(x);
  }
}
