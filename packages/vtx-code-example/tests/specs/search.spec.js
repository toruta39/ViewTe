const vtx = require('vtx');
const config = require('../../vtx.conf');

vtx(() => {
  beforeAll(() => {
    this.platform = capability.platformName || capability.platform;
    this.browser = capability.browserName;

    if (this.browser === 'vt') {
      this.vtEnv = capability.vtEnv;
    }
  });
  
  afterAll(async () => {
    try {
      await driver.quit();
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
    if (this.platform === 'MAC' || this.platform === 'WIN10') {
      await button.click();
    } else {
      await button.tap();
    }
    await driver.sleep(10000);
    const title = await driver.title();
    expect(title).toBe('ViewTe at DuckDuckGo');
  });
}, config);
