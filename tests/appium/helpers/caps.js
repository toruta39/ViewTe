export const android = JSON.parse(`{
  "browserName": "",
  "appium-version": "1.6",
  "platformName": "Android",
  "platformVersion": "5.1",
  "deviceName": "Android Emulator",
  "app": "tests/appium/artifacts/app-release.apk"
}`);

export const ios = JSON.parse(`{
  "browserName": "",
  "appium-version": "1.6",
  "platformName": "iOS",
  "platformVersion": "10.3",
  "deviceName": "iPhone Simulator",
  "app": "tests/appium/artifacts/WebviewTester.app",
  "automationName": "XCUITest"
}`);
