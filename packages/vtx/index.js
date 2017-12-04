const wd = require('wd');
const path = require('path');
const testUtils = require('./test-utils');

module.exports = (fn, config) => {
  const serverConfig = {
    host: config.host || 'localhost',
    port: config.port || 4444
  };

  const capabilities = config.capabilities;

  capabilities.forEach(capability =>
    describe('userAgent: TODO', () => {
      let driver;

      let beforeAllFn;
      let afterAllFn;

      const originalBeforeAll = global.beforeAll;
      const originalAfterAll = global.afterAll;
      const originalDescribe = global.describe;
      
      const registerBeforeAllFn = fn => beforeAllFn = fn;
      const registerAfterAllFn = fn => afterAllFn = fn;
      const describeWithOriginalGlobals = fn => {
        global.beforeAll = originalBeforeAll;
        global.afterAll = originalAfterAll;
        
        describe(fn);

        global.beforeAll = registerBeforeAllFn;
        global.afterAll = registerAfterAllFn;
      };

      global.beforeAll = registerBeforeAllFn;
      global.afterAll = registerAfterAllFn;
      global.describe = describeWithOriginalGlobals;

      originalBeforeAll(async (done) => {
        driver = await testUtils.getDriver(serverConfig, capability);

        if (typeof beforeAllFn === 'function') {
          await beforeAllFn(done);
        } else {
          done();
        }
      });

      originalAfterAll(async (done) => {
        if (typeof afterAllFn === 'function') {
          await afterAllFn(done);
        } else {
          done();
        }
      });

      fn(driver);

      global.beforeAll = originalBeforeAll;
      global.afterAll = originalAfterAll;
      global.describe = originalDescribe;
    }),
  );
};
