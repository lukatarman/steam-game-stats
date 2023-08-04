export function createLoggerMock() {
  return jasmine.createSpyObj("Logger", ["info", "warn", "error", "fatal"]);
}
