import testUtils from './test-utils';

const run = (...args) => {
  let driver;
  
  beforeAll(async (done) => {
    driver = await testUtils.initDriver(...args);
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
    await driver.get('https://duckduckgo.com/');
    await driver.sleep(10000);
    const url = await driver.url();
  
    expect(url.indexOf('https://duckduckgo.com/')).toBe(0);
  });
  
  it("should search", async () => {
    const input = await driver.elementByXPath('//input[@id="search_form_input_homepage"]');
    await input.sendKeys('ViewTe');
    const button = await driver.elementByXPath('//input[@id="search_button_homepage"]');
    await button.tap();
    await driver.sleep(10000);
    const title = await driver.title();
    expect(title.indexOf('ViewTe')).toBe(0);
  });  
}

export default run;