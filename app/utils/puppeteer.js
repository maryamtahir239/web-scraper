const puppeteer = require('puppeteer');

async function interact(url, action, selector) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  switch (action) {
    case 'click':
      await page.click(selector);
      break;
    case 'fill':
      await page.fill(selector, 'example text');
      break;
    // Add more actions as needed
    default:
      throw new Error(`Unsupported action: ${action}`);
  }

  await browser.close();
}

module.exports = { interact };