const { test, expect } = require("@playwright/test"); //Importing test & assert annotation from playwright node_modules package
//console.log(">"+{test});

test("Playwright test Fomat", function () {
  //Playwright code -
  console.log("Test format");
});

//{browser} fixture - Global variable which are available in entire project
//JS is asyncronous (each syntax try to execute parallelly) - use async before function to use await()

test("Browser Context playwright test", async ({ browser }) => {
  //Create new context/fresh instance of browser (without shared plugin/cookies/cache)
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Page Context playwright test", async ({ page }) => {
  await page.goto("https://playwright.dev/docs/intro");
  //get title - Assertion
  await expect(page).toHaveTitle("Installation | Playwright");
  console.log(await page.title());
});

test("Login page test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const username = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitle = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //Playwright suggest to use CSS locator instead of xpath - #id .class [attribute='value']
  await username.fill("rahulshetty");
  await page.locator("[type='password']").fill("learning");
  await signIn.click();
  //Playwright automatically wait until this locator shown up on page - no implicit wait needed
  await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //negative scenario

  await username.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitle.first().textContent()); //first element - This method/action will wait 30s timeout until element shows up
  console.log(await cardTitle.nth(1).textContent()); //second element

  console.log(await cardTitle.allTextContents()); //This method/action does not wait 30s timeout (until all elements are showing up)
});

/*
use .only helper attribute with test to execute only particular test annotation
*/
