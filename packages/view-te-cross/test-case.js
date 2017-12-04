import testUtils from './test-utils';

const run = (...args) => {
  
  beforeAll(async (done) => {
    this.driver = await testUtils.initDriver(...args);

    this.platform = testUtils.platform;
    this.browser = testUtils.browser;
    this.appOptions = testUtils.appOptions;

    done();
  });
  
  afterAll(async () => {
    try {
      await this.driver.quit()
    } catch(e) {
      console.error(e);
    }
  });
  
  it("should get url", async () => {
    await this.driver.get('https://duckduckgo.com/');
    await this.driver.sleep(10000);
    const url = await this.driver.url();
  
    expect(url.indexOf('https://duckduckgo.com/')).toBe(0);
  });
  
  it("should search", async () => {
    const input = await this.driver.elementByXPath('//input[@id="search_form_input_homepage"]');
    await input.sendKeys('ViewTe');
    const button = await this.driver.elementByXPath('//input[@id="search_button_homepage"]');
    if (this.platform === 'MAC' || this.platform === 'WIN10') {
      await button.click();
    } else {
      await button.tap();
    }
    await this.driver.sleep(10000);
    const title = await this.driver.title();
    expect(title.indexOf('ViewTe')).toBe(0);
  });  
}

export default run;