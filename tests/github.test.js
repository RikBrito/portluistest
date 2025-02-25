require("dotenv").config();
const { openBrowser, closeBrowser } = require("../utils/browser");
const { login, navigateToRepositories } = require("../utils/actions")

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
      throw new Error("Autenticação falhou");
    }
  });
  test("Deve navegar até a aba 'Repositories'", async () => {
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
});