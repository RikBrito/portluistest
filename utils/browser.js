const puppeteer = require("puppeteer");

async function openBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    defaultViewport: null,
    args: ["--start-maximized"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  return { browser, page };
}

async function closeBrowser(browser) {
  await browser.close();
}

module.exports = { openBrowser, closeBrowser };
