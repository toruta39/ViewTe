const path = require('path');
const wd = require('wd');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

const CMD_WAIT_TIME = 5000;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

const getDriver = async (serverConfig, capability) => {
  const driver = wd.promiseChainRemote(serverConfig);

  try {
    const desired = {
      ...capability
    };

    if (desired.browserName === 'vt') {
      if (desired.platformName === 'iOS') {
        desired.app = path.resolve(__dirname, '../artifacts/WebviewTester.app');
      } else if (desired.platformName === 'Android') {
        desired.app = path.resolve(__dirname, '../artifacts/app-release.apk');
      } else {
        throw new Error('invalid platformName, use iOS or Android');
      }

      desired.browserName = 'app';
      delete desired.vtEnv;
    }

    console.log(JSON.stringify(desired));
    
    await driver.init(desired);
    await driver.sleep(CMD_WAIT_TIME);
    
    if (capability.browserName === 'vt') {
      await bootstrapVt(driver, capability);
    }
  } catch(e) {
    console.error(e);
  }

  return driver;
};

const bootstrapVt = async (driver, { vtEnv, platformName } = {}) => {
    await setNativeContext(driver);

    if (platformName === 'iOS') {
      const browserEnvironment = await driver.elementByXPath('//XCUIElementTypeStaticText[@name="environment-name"]');
      const text = await browserEnvironment.text();

      if (text !== vtEnv) {
        const menuButton = await await driver.elementByXPath('//XCUIElementTypeOther[@name="menu-button"]');
        await menuButton.tap();
        const envButton = await driver.elementByXPath(`//XCUIElementTypeOther[@name="environment-list"]//XCUIElementTypeOther[@name="${vtEnv}"]`);
        await envButton.tap();
        await driver.sleep(CMD_WAIT_TIME);
      }
    } else if (platformName === 'Android') {
      // noop because android has only 1 type of webview
    }

    await setWebviewContext(driver);
};

const setWebviewContext = async (driver) => {
  const contexts = await driver.contexts();
  driver.context(contexts[contexts.length - 1]); 
  await driver.sleep(CMD_WAIT_TIME);
};

const setNativeContext = async (driver) => {
  const contexts = await driver.contexts();
  driver.context(contexts[0]);
  await driver.sleep(CMD_WAIT_TIME);
};

module.exports = {
  getDriver,
  bootstrapVt,
  setWebviewContext,
  setNativeContext
};
