const vtx = require('vtx');
const config = require('../../vtx.conf');

vtx((driver) => {
  beforeAll(() => {
    this.platform = driver.capability.platformName;
    this.browser = driver.capability.browserName;

    if (this.browser === 'vt') {
      this.vtEnv = driver.capability.vtxOpts.vtEnv;
    }
  });
  
  afterAll(async (done) => {
    try {
      await driver.quit();
    } catch(e) {
      console.error(e);
    }

    done();
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
    expect(title.indexOf('ViewTe')).toBe(0);
  });
}, config);