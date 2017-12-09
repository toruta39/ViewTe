export const android = JSON.parse(`{
  "browserName": "",
  "appium-version": "1.7",
  "platformName": "Android",
  "platformVersion": "7.1.1",
  "deviceName": "Android Emulator",
  "app": "tests/appium/artifacts/app-release.apk"
}`);

export const ios = JSON.parse(`{
  "browserName": "",
  "appium-version": "1.7",
  "platformName": "iOS",
  "platformVersion": "11.1",
  "deviceName": "iPhone Simulator",
  "app": "tests/appium/artifacts/WebviewTester.app",
  "automationName": "XCUITest"
}`);
