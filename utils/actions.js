async function login(page, email, password) {
    await page.type("#login_field", email);
    await page.type("#password", password);
    await page.click("[name='commit']");
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
    // Verifica se o login foi bem-sucedido
    
    await page.waitForSelector('[aria-label="Open global navigation menu"]', { visible: true, timeout: 5000 });
    await page.click("button[aria-label='Open user navigation menu']");
    await page.waitForSelector('div[title="Henrique brito"]', { visible: true, timeout: 10000 });
    const texto = await page.evaluate(() => {
      return document.querySelector('div[title="Henrique brito"]').textContent.trim();
    });   
  }
  
  async function navigateToRepositories(page) {
    // Aguarda e clica no link de "Repositories"
    await page.waitForSelector("a[href*='?tab=repositories']", { visible: true });
    await page.click("a[href*='?tab=repositories']")
  
    // Aguarda que algum elemento exclusivo da página carregue
    await page.waitForSelector("#repositories-tab", { visible: true, timeout: 10000 });
  }
  
  async function createNewRepository(page, repoName) {
    // Acessa a página de criação de novo repositório
    await page.waitForSelector("a[aria-label='Homepage']", { visible: true });
    await page.click("a[aria-label='Homepage']", { visible: true });

    //Acessa o botão de criar novo repositorio 
    await page.waitForSelector('a[href="/new"]', { visible: true });
    await page.click('a[href="/new"]');
  
    // Preenche o nome do repositório
    await page.waitForSelector('input[aria-describedby="RepoNameInput-is-available RepoNameInput-message"]', { visible: true });
    await page.type('input[aria-describedby="RepoNameInput-is-available RepoNameInput-message"]', repoName);
  }

  async function logout(page) {
    await page.waitForSelector('[aria-label="Open global navigation menu"]', { visible: true, timeout: 5000 });
    await page.click("button[aria-label='Open user navigation menu']");

    await page.waitForSelector("a[href='/logout']", { visible: true });
    await page.click("a[href='/logout']");
    
  }
  
  module.exports = { login, navigateToRepositories, createNewRepository, logout };
  