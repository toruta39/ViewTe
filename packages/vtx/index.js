const wd = require('wd');
const path = require('path');
const testUtils = require('./test-utils');

module.exports = (testFn, config) => {
  const serverConfig = {
    host: config.host || 'localhost',
    port: config.port || 4444
  };

  const capabilities = config.capabilities;

  capabilities.forEach(capability =>
    describe('userAgent: TODO', () => {
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
        global.capability = capability;
        global.driver = await testUtils.getDriver(serverConfig, capability);

        if (typeof beforeAllFn === 'function') {
          await beforeAllFn();
        }

        done();
      });

      originalAfterAll(async (done) => {
        if (typeof afterAllFn === 'function') {
          await afterAllFn();
        }

        global.capability = null;
        global.driver = null;

        done();
      });

      testFn();

      global.beforeAll = originalBeforeAll;
      global.afterAll = originalAfterAll;
      global.describe = originalDescribe;
    }),
  );
};
