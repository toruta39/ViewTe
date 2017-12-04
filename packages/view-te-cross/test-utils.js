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

  // all params are case-sensitive
  //
  // platform: IOS|ANDROID|MAC|WIN10
  // browser: chrome|safari|firefox|internet explorer|MicrosoftEdge|app
  // appOptions?: {
  //   viewTe?: {
  //     env: WebView|UIWebView|WKWebView|SFSafariViewController
  //   }   
  // }
  async initDriver(platform, browser, appOptions = {}) {
    if (this.driver !== null) {
      console.error('driver can be inited only once per test');
      return this.driver;
    }

    this.platform = platform;
    this.browser = browser;
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
    if (platform === 'MAC') {
      return {
        browserName: browser,
        version: '',
        platform: 'MAC'
      };
    } else if (platform === 'WIN10') {
      return {
        browserName: browser,
        version: '',
        platform: 'WIN10'
      };
    } else if (platform === 'IOS') {
      if (browser === 'app') {
        if (typeof appOptions.viewTe === 'object') {
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
    } else if (platform === 'ANDROID') {
      if (browser === 'app') {
        if (typeof appOptions.viewTe === 'object') {
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
    if (typeof this.appOptions.viewTe === 'object') {
      await this.setNativeContext();

      const env = this.appOptions.viewTe.env;

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