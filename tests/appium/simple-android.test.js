import wd from 'wd';
import serverConfigs from './helpers/servers';
import { android as cap } from './helpers/caps';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

var driver;
var allPassed = true;

beforeAll(() => {
  var serverConfig = process.env.npm_package_config_sauce ?
    serverConfigs.sauce : serverConfigs.local;

  driver = wd.promiseChainRemote(serverConfig);

  var desired = Object.assign({}, cap);
  if (process.env.npm_package_config_sauce) {
    desired.name = 'android - simple';
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

it("android should navigate", function () {
  return driver
    .resolve()
    .then(async function () {
      await driver.sleep(1000);
      let input = await driver.elementByXPath('//android.widget.EditText[@content-desc="address-input"]');
      await driver.sleep(1000);
      await input.clear();
      await driver.sleep(1000);
      await input.sendKeys('www.google.com/ncr\n');
      await driver.sleep(1000);

      let text = await input.text();
      expect(text.indexOf('https://www.google.com/')).toBe(0);
    });
});
