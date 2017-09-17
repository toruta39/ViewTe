# ViewTe

![](docs/assets/screenshot-2.0.0.png)

A minimalistic webview tester designed for web developers

## App Download

iOS: https://itunes.apple.com/us/app/viewte-the-webview-tester/id1237657148
Android: https://play.google.com/store/apps/details?id=com.webviewtester

## E2E Test in Emulator

![](docs/assets/e2e-2.1.0.gif)

Testability is powered by `appium` and `wd`.

### Instructions:

You need to connect an Android Virtual Device via emulator cli or genymotion before test. Then run the command below:

```
$ npm run start:appium # start appium server, listening at 0.0.0.0:4723
$ # open a new terminal window
$ npm run test:appium # start jest to run e2e tests
```
