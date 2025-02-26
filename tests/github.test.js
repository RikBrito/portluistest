require("dotenv").config();
const { openBrowser, closeBrowser } = require("../utils/browser");
const { login, navigateToRepositories, createNewRepository, logout } = require("../utils/actions")

describe("Fluxo Completo de Testes no GitHub", () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Inicia o navegador antes de cada teste
    ({ browser, page } = await openBrowser());
    await page.goto("https://github.com/login");
  });
  

  afterAll(async () => {
    // Fecha o navegador após cada teste
    await closeBrowser(browser);
  });

  // 🔹 Teste 1: Login com sucesso
  test("Deve efetuar login com sucesso", async () => {
    await login(page, process.env.EMAIL, process.env.PASSWORD);

    // ✅ Verifica se o login foi bem-sucedido
    try {
      await page.waitForSelector('[aria-label="Open global navigation menu"]', { visible: true, timeout: 5000 });
    } catch (error) {
      throw new Error("Autenticação falhou" + error.message);
    }
  });
  test("Deve navegar até a aba 'Repositories' e acessar um repositorio existente", async () => {
    try {
      await navigateToRepositories(page);

      // Acessa um repositório específico
      await page.waitForSelector("a[href='/riqsbrito/repositoriotest']", { visible: true });
      await page.click("a[href='/riqsbrito/repositoriotest']");

      // Acessa a aba de pull requests
      await page.waitForSelector("#pull-requests-tab", { visible: true });
      await page.click("#pull-requests-tab");
      
      // Espera pela página de comparação de pull requests
      await page.waitForSelector('a[href="/riqsbrito/repositoriotest/compare"]', { visible: true });
    } catch (error) {
      throw new Error("Erro ao navegar até a aba 'Repositories' ou acessar Pull Requests: " + error.message);
    }
  });

  test("Deve criar um novo repositório", async () => {
    try {      
      // Acessa a página de criação de repositório e cria o repositório
      const newRepoName = `repo-${Date.now().toString().slice(-6)}`;
      

      await createNewRepository(page, newRepoName);

      // Clica no botão "Create repository"
      await page.waitForSelector('.Box-sc-g0xbh4-0.dlBivO button', { visible: true });
      await page.click('.Box-sc-g0xbh4-0.dlBivO button');

      // Espera a página do repositório carregar
      await page.waitForNavigation({ waitUntil: "networkidle2" });

      await page.waitForNavigation({ waitUntil: "networkidle2" });

      // Aguarda o elemento que contém o nome do repositório
      await page.waitForSelector("#repo-title-component strong a", { visible: true, timeout: 10000 });

      // Captura o nome do repositório exibido na página
      const repoTitle = await page.$eval("#repo-title-component strong a", el => el.innerText.trim());

      console.log("Nome do repositório na página:", repoTitle);

      // Valida se o nome exibido na página é o esperado
      if (repoTitle !== newRepoName) {
          throw new Error(`Nome do repositório incorreto! Esperado: ${newRepoName}, Obtido: ${repoTitle}`);
      } else {
          console.log("Nome do repositório validado com sucesso!");
      }
      
      // Tira uma captura de tela final após a criação do repositório
      await page.screenshot({ path: './screenshots/github_new_repo_after_creation.png' });



    } catch (error) {
      // Em caso de erro, tira uma captura de tela e lança a exceção
      await page.screenshot({ path: './screenshots/github_new_repo_error.png' });
      throw new Error("Erro ao criar um novo repositório: " + error.message);
    }
  });
  test("Deslogar do github", async () => {
    try {
      await logout(page);
    } catch (error) {
      throw new Error("Não foi possivel seguir com a solicitação " + error.message);
    }
    
  })
});