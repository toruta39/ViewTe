import testUtils from './test-utils';

let driver;

beforeAll(async (done) => {
  driver = await testUtils.initDriver('ios', 'WKWebView');
  done();
});

afterAll(async () => {
  try {
    await driver.quit()
  } catch(e) {
    console.error(e);
  }
});

it("should get url", async () => {
  await testUtils.navigate('www.google.com/ncr');
  await driver.sleep(2000);
  const url = await driver.url();

  expect(url.indexOf('https://www.google.com/')).toBe(0);
});

it("should search", async () => {
  const input = await driver.elementByXPath('//input[@id="lst-ib"]');
  await input.sendKeys('ViewTe');
  const button = await driver.elementByXPath('//button[@id="tsbb"]');
  await button.tap();
  await driver.sleep(2000);
  const title = await driver.title();
  expect(title).toBe('ViewTe - Google Search');
});
