export function createLoggerMock() {
  return jasmine.createSpyObj("Logger", [
    "info",
    "error",
    "warn",
    "debug",
    "debugc",
    "fatal",
  ]);
}
