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

it("should navigate", async () => {
  await testUtils.navigate('www.google.com/ncr');
  const text = await testUtils.getUrl();

  expect(text.indexOf('https://www.google.com/')).toBe(0);
});

it("should search", async () => {
  // TODO: search a keyword and test the page content
  expect(null).toBe(true);
});
