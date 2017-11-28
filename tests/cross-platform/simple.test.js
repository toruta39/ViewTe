import testUtils from './test-utils';

let driver;
var allPassed = true;

beforeAll((done) => {
  console.log(-1);
  return Promise
    .resolve()
    .then(async () => {
      driver = await testUtils.initDriver('ios', 'WKWebView');
      done();
    });
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

it("should navigate", function () {
  return Promise
    .resolve()
    .then(async function () {
      await testUtils.navigate('www.google.com/ncr');
      let text = await testUtils.getUrl();

      expect(text.indexOf('https://www.google.com/')).toBe(0);
    });
});

it("should search", function () {
  return Promise
    .resolve()
    .then(async function () {
      // TODO: search a keyword and test the page content
    });
});
