async function login(page, email, password) {
    await page.type("#login_field", email);
    await page.type("#password", password);
    await page.click("[name='commit']");
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
    // Verifica se o login foi bem-sucedido
    try {
      await page.waitForSelector('[aria-label="Open global navigation menu"]', { visible: true, timeout: 5000 });
      await page.click("button[aria-label='Open user navigation menu']");
      await page.waitForSelector('div[title="Henrique brito"]', { visible: true, timeout: 10000 });
      const texto = await page.evaluate(() => {
        return document.querySelector('div[title="Henrique brito"]').textContent.trim();
      });
    } catch (error) {
      //throw new Error("Autenticação falhou");
    }
  }
  
  async function navigateToRepositories(page) {
    // Aguarda e clica no link de "Repositories"
    await page.waitForSelector("a[href*='?tab=repositories']", { visible: true });
    await page.click("a[href*='?tab=repositories']")
  
    // Aguarda que algum elemento exclusivo da página carregue
    await page.waitForSelector("#repositories-tab", { visible: true, timeout: 10000 });
  }
  
  module.exports = {
    navigateToRepositories,
  };
  
  module.exports = { login, navigateToRepositories };
  