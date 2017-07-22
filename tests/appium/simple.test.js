import wd from 'wd';
import serverConfigs from './helpers/servers';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

var driver;
var allPassed = true;

beforeAll(() => {
  var serverConfig = process.env.npm_package_config_sauce ?
    serverConfigs.sauce : serverConfigs.local;

  driver = wd.promiseChainRemote(serverConfig);
  require("./helpers/logging").configure(driver);

  var desired = Object.assign({}, require("./helpers/caps").ios92);
  desired.app = require("./helpers/apps").iosTestApp;
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

it("should compute the sum", function () {
  return driver
    .resolve().then(function (sum) {
      return driver.
        elementByAccessibilityId('ComputeSumButton')
          .click().sleep(1000)
        .elementByAccessibilityId('Answer')
          .text().should.become("" + sum);
    });
});
