import wd from 'wd';
import serverConfigs from '../appium/helpers/servers';
import * as caps from '../appium/helpers/caps';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

const CMD_WAIT_TIME = 500;

const testUtils = {
  driver: null,
  platform: null,

  async initDriver(platform = 'ios', env = 'WKWebView') {
    if (!this.driver) {
      const serverConfig = process.env.npm_package_config_sauce ?
        serverConfigs.sauce : serverConfigs.local;
  
      this.driver = wd.promiseChainRemote(serverConfig);
      this.platform = platform;
  
      const desired = Object.assign({}, caps[this.platform]);
  
      await this.driver.init(desired);
    }
    
    await this.switchEnv(env);
  
    return this.driver;
  },

  async switchEnv(env) {
    // TODO: handle android case
    await this.setNativeContext();
    const menuButton = await this.driver.elementByXPath('//XCUIElementTypeOther[@name="menu-button"]');
    await menuButton.tap();
    const envButton = await this.driver.elementByXPath(`//XCUIElementTypeOther[@name="environment-list"]//XCUIElementTypeOther[@name="${env}"]`);
    await envButton.tap();
  
    const browserEnvironment = await this.driver.elementByXPath('//XCUIElementTypeStaticText[@name="environment-name"]');
    const text = await browserEnvironment.text();
  
    if (text !== env) throw new Error('env doesn\'t match');

    await this.setWebviewContext();
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