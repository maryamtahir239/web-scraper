const puppeteer = require('puppeteer');

class PuppeteerScrapper {
    async scrape(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
      
        const headings = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText);
        });
      
        const tableData = await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll('table tr'));
          return rows.map(row => {
            const cells = row.querySelectorAll('td, th');
            return Array.from(cells).map(cell => cell.innerText);
          });
        });
      
        await browser.close();
        return {
          headings,
          tableData
        };
      }
      

  async interact(url, action) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
  
    if (action.type === 'click') {
      await page.click(action.selector);
    } else if (action.type === 'type') {
      await page.type(action.selector, action.value);
    } else if (action.type === 'select') {
      await page.select(action.selector, action.value);
    }
  
    await page.waitForTimeout(60000); // wait for 1 second to ensure the action completes
    const result = await page.evaluate(() => document.body.innerHTML);
  
    await browser.close();
    return result;
  }
  
}

module.exports = PuppeteerScrapper;