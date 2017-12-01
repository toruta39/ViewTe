import wd from 'wd';
import serverConfigs from '../appium/helpers/servers';
import * as caps from '../appium/helpers/caps';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

const CMD_WAIT_TIME = 3000;

const testUtils = {
  driver: null,
  platform: null,

  async initDriver(platform, env) {
    const serverConfig = process.env.npm_package_config_sauce ?
      serverConfigs.sauce : serverConfigs.local;

    this.driver = wd.promiseChainRemote(serverConfig);
    this.platform = platform;

    const desired = Object.assign({}, caps[this.platform]);

    await this.driver.init(desired);
    await this.driver.sleep(CMD_WAIT_TIME);
    await this.switchEnv(env);
  
    return this.driver;
  },

  async switchEnv(env) {
    await this.setNativeContext();

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
    }

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