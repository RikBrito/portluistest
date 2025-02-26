const puppeteer = require("puppeteer");

async function openBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    defaultViewport: null,
    args: ["--start-maximized"]
  });
  const page = (await browser.pages())[0]; // Pega a primeira página aberta (sem abrir uma nova)  
  await page.setViewport({ width: 1920, height: 1080 });
  return { browser, page };
}

async function closeBrowser(browser) {
  await browser.close();
}

module.exports = { openBrowser, closeBrowser };
