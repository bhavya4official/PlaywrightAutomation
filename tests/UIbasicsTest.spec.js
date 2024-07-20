const { test } = require("@playwright/test"); //Importing test annotation from playwright node_modules package
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
  await page.goto("https://www.w3schools.com/js/");
});
