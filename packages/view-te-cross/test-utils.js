import path from 'path';
import wd from 'wd';
import serverConfigs from './servers';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

const CMD_WAIT_TIME = 5000;

const testUtils = {
  driver: null,
  platform: null,
  browser: null,
  appOptions: null,

  // platform: ios|android case-insensitive
  // browser: chrome|safari|app case-insensitive
  // appOptions?: {
  //   app: ViewTe case-sensitive
  //   env: WebView|UIWebView|WKWebView|SFSafariViewController case-sensitive
  // }
  async initDriver(platform, browser, appOptions = {}) {
    this.platform = platform.toLowerCase();
    this.browser = browser.toLowerCase();
    this.appOptions = appOptions;

    const serverConfig = serverConfigs.local;

    this.driver = wd.promiseChainRemote(serverConfig);

    try {
      const desired = this.getCap(this.platform, this.browser, this.appOptions);

      console.log(`using capability: ${JSON.stringify(desired)}`);
      
      await this.driver.init(desired);
      await this.driver.sleep(CMD_WAIT_TIME);
      
      if (this.browser === 'app') {
        await this.bootstrapApp();
      }
    } catch(e) {
      console.error(e);
    }    

    return this.driver;
  },

  getCap(platform, browser, appOptions) {
    if (platform === 'ios') {
      if (browser === 'app') {
        if (appOptions.app === 'ViewTe') {
          return {
            browserName: 'app',
            'appium-version': '1.7',
            platformName: 'iOS',
            platformVersion: '11.1',
            deviceName: 'iPhone X',
            app: path.resolve(__dirname, 'artifacts', 'WebviewTester.app'),
            automationName: 'XCUITest',
            wdaLocalPort: 8101
          };
        }
      } else if (browser === 'safari') {
        return {
          browserName: 'safari',
          'appium-version': '1.7',
          platformName: 'iOS',
          platformVersion: '11.1',
          deviceName: 'iPhone X',
          automationName: 'XCUITest',
          wdaLocalPort: 8102
        };
      } 
    } else if (platform === 'android') {
      if (browser === 'app') {
        if (appOptions.app === 'ViewTe') {
          return {
            browserName: 'app',
            'appium-version': '1.7',
            platformName: 'Android',
            platformVersion: '7.1.1',
            deviceName: 'Android Emulator',
            avd: 'P_25',
            app: path.resolve(__dirname, 'artifacts', 'app-release.apk'),
          };
        }
      } else if (browser === 'chrome') {
        return {
          browserName: 'chrome',
          'appium-version': '1.7',
          platformName: 'Android',
          platformVersion: '7.1.1',
          deviceName: 'Android Emulator',
          avd: 'P2_25'
        };
      }
    }
  
    throw new Error(`no corresponding cap found for platform: ${platform}, browser: ${browser}, appOptions: ${JSON.stringify(appOptions)}`);
    return null;
  },

  async bootstrapApp() {
    if (this.appOptions.app === 'ViewTe') {
      await this.setNativeContext();

      const env = this.appOptions.env;

      if (this.platform === 'ios') {
        const browserEnvironment = await this.driver.elementByXPath('//XCUIElementTypeStaticText[@name="environment-name"]');
        const text = await browserEnvironment.text();
  
        if (text !== env) {
          const menuButton = await await this.driver.elementByXPath('//XCUIElementTypeOther[@name="menu-button"]');
          await menuButton.tap();
          const envButton = await this.driver.elementByXPath(`//XCUIElementTypeOther[@name="environment-list"]//XCUIElementTypeOther[@name="${env}"]`);
          await envButton.tap();
          await this.driver.sleep(CMD_WAIT_TIME);
        }
      } else if (this.platform === 'android') {
        // noop because android has only 1 type of webview
      }

      await this.setWebviewContext();
    }
  },

  async setWebviewContext() {
    const contexts = await this.driver.contexts();
    this.driver.context(contexts[contexts.length - 1]); 
    await this.driver.sleep(CMD_WAIT_TIME);
  },

  async setNativeContext() {
    const contexts = await this.driver.contexts();
    this.driver.context(contexts[0]);
    await this.driver.sleep(CMD_WAIT_TIME);
  }
};

export default testUtils;