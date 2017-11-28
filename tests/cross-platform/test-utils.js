import wd from 'wd';
import serverConfigs from '../appium/helpers/servers';
import * as caps from '../appium/helpers/caps';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

const testUtils = {
  driver: null,
  platform: null,

  async initDriver(platform = 'ios', env = 'WKWebView') {
    console.log(0);
    if (!this.driver) {
      const serverConfig = process.env.npm_package_config_sauce ?
        serverConfigs.sauce : serverConfigs.local;

      console.log(0.5);
  
      this.driver = wd.promiseChainRemote(serverConfig);
      this.platform = platform;
  
      const desired = Object.assign({}, caps[this.platform]);
      console.log(1);
  
      await this.driver.init(desired);
    }
    
    console.log(2);
    await this.switchEnv(env);

    console.log(3);
  
    return this.driver;
  },

  async switchEnv(env) {
    // TODO: handle android case
    await this.driver.sleep(1000);
    let menuButton = await this.driver.elementByXPath('//XCUIElementTypeOther[@name="menu-button"]');
    await this.driver.sleep(1000);
    await menuButton.tap();
    await this.driver.sleep(1000);
    let envButton = await this.driver.elementByXPath(`//XCUIElementTypeOther[@name="environment-list"]//XCUIElementTypeOther[@name="${env}"]`);
    await envButton.tap();
    await this.driver.sleep(1000);
  
    let browserEnvironment = await this.driver.elementByXPath('//XCUIElementTypeStaticText[@name="environment-name"]');
    let text = await browserEnvironment.text();
  
    if (text !== env) throw new Error('env doesn\'t match');
  },

  async navigate(url) {
    // TODO: handle android case
    await this.driver.sleep(1000);
    let input = await this.driver.elementByXPath('//XCUIElementTypeTextField[@name="address-input"]');
    await this.driver.sleep(1000);
    await input.clear();
    await this.driver.sleep(1000);
    await input.sendKeys(`${url}\n`);
  },

  async getUrl() {
    // TODO: handle android case
    await this.driver.sleep(1000);
    let input = await this.driver.elementByXPath('//XCUIElementTypeTextField[@name="address-input"]');
    let text = await input.text();

    return text;
  }
};

export default testUtils;