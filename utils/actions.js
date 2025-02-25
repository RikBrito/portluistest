async function login(page, email, password) {
    await page.type("#login_field", email);
    await page.type("#password", password);
    await page.click("[name='commit']");
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
    // Verifica se o login foi bem-sucedido
    try {
      await page.waitForSelector('[aria-label="Open global navigation menu"]', { visible: true, timeout: 5000 });
    } catch (error) {
      throw new Error("Autenticação falhou");
    }
  }
  
  async function navigateToRepositories(page) {
    await page.click("button[aria-label='Open user navigation menu']");
    await page.waitForSelector('a[data-tab-item="repositories-tab"]', { visible: true });
    await page.click('a[data-tab-item="repositories-tab"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  }
  
  module.exports = { login, navigateToRepositories };
  