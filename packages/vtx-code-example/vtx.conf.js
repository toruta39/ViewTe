module.exports = {
  // server configuration
  // selenium grid/selenium standalone/appium are accepted
  host: '192.168.3.7',
  port: '4444',

  // capabilities to be tested against
  capabilities: [
    {
      browserName: 'vt',
      'appium-version': '1.7',
      platformName: 'iOS',
      platformVersion: '11.1',
      deviceName: 'iPhone X',
      automationName: 'XCUITest',
      wdaLocalPort: 8101,
      vtEnv: 'UIWebView'
    },
    // {
    //   browserName: 'safari',
    //   'appium-version': '1.7',
    //   platformName: 'iOS',
    //   platformVersion: '11.1',
    //   deviceName: 'iPhone X',
    //   automationName: 'XCUITest',
    //   wdaLocalPort: 8102
    // },
    // {
    //   browserName: 'vt',
    //   'appium-version': '1.7',
    //   platformName: 'Android',
    //   platformVersion: '7.1.1',
    //   deviceName: 'Android Emulator',
    //   avd: 'P_25',
    //   vtEnv: 'WebView'
    // },
    // {
    //   browserName: 'chrome',
    //   'appium-version': '1.7',
    //   platformName: 'Android',
    //   platformVersion: '7.1.1',
    //   deviceName: 'Android Emulator',
    //   avd: 'P2_25'
    // }
  ]
};
