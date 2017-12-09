import wd from 'wd';
import serverConfigs from './helpers/servers';
import { ios as cap } from './helpers/caps';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

var driver;
var allPassed = true;

beforeAll(() => {
  var serverConfig = process.env.npm_package_config_sauce ?
    serverConfigs.sauce : serverConfigs.local;

  driver = wd.promiseChainRemote(serverConfig);

  var desired = Object.assign({}, cap);
  if (process.env.npm_package_config_sauce) {
    desired.name = 'ios - simple';
    desired.tags = ['sample'];
  }
  return driver.init(desired);
});

afterAll(() => {
  return driver
    .quit()
    .finally(function () {
      if (process.env.npm_package_config_sauce) {
        return driver.sauceJobStatus(allPassed);
      }
    });
});

it("ios should switch environment", function () {
  return driver
    .resolve()
    .then(async function () {
      await driver.sleep(1000);
      let menuButton = await driver.elementByXPath('//XCUIElementTypeOther[@name="menu-button"]');
      await driver.sleep(1000);
      await menuButton.tap();
      await driver.sleep(1000);
      let wkWebViewButton = await driver.elementByXPath('//XCUIElementTypeOther[@name="environment-list"]//XCUIElementTypeOther[@name="WKWebView"]');
      await wkWebViewButton.tap();
      await driver.sleep(1000);

      let browserEnvironment = await driver.elementByXPath('//XCUIElementTypeStaticText[@name="environment-name"]');
      let text = await browserEnvironment.text();
      expect(text).toBe('WKWebView');
    });
});

it("ios should navigate", function () {
  return driver
    .resolve()
    .then(async function () {
      await driver.sleep(1000);
      let input = await driver.elementByXPath('//XCUIElementTypeTextField[@name="address-input"]');
      await driver.sleep(1000);
      await input.clear();
      await driver.sleep(1000);
      await input.sendKeys('www.google.com/ncr\n');
      await driver.sleep(1000);

      let text = await input.text();
      expect(text.indexOf('https://www.google.com/')).toBe(0);
    });
});
