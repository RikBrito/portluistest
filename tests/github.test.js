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
    // 🔹 Teste 2: Acessar a aba "Repositories"
  test("Deve navegar até a aba 'Repositories'", async () => {
    await page.waitForSelector("button[aria-label='Open user navigation menu']", { visible: true, timeout: 8000 });
    await page.click("button[aria-label='Open user navigation menu']");

    // Aguarda e clica no link de "Repositories"
    await page.waitForSelector("a[href*='?tab=repositories']", { visible: true });
    
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click("a[href*='?tab=repositories']")
  ]);
  // Aguarda que algum elemento exclusivo da página carregue
    await page.waitForSelector("#repositories-tab", { visible: true, timeout: 10000 });

    let currentUrl = await page.url();
    console.log("URL atual:", currentUrl);
    expect(currentUrl).toContain("/riqsbrito?tab=repositories");
  });
});