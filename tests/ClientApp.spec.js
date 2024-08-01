const { test, expect } = require("@playwright/test");

test("Wait dynamically for new page in service based app", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("bhavya4official@gmail.com");
  await page.locator("#userPassword").fill("Test@123");
  await page.locator("[value='Login']").click();

  //await page.waitForLoadState("networkidle"); //wait until network comes to idle state - So all elements are fully loaded
  await page.locator(".card-body b").first().waitFor(); //Recommanded wait instead of networkidle - to wait until element filly loaded
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

test("E-commerce E2E work flow", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("bhavya4official@gmail.com");
  await page.locator("#userPassword").fill("Test@123");
  await page.locator("[value='Login']").click();

  const product = page.locator(".card-body");
  const productName = "Zara Coat 3";

  for (let i = 0; i < (await product.count()); i++) { //Find product on home page & add it to card
    if ((await product.nth(i).locator("b")) === productName) {
      await product.nth(i).locator("text= Add To Cart").click();
      break;
    }
    await page.locator("[routerlink*='cart']").click(); //Click on Cart button
    page.locator("div li").waitFor(); //.first().waitFor(); It waits for mentioned elements to appear - because auto-wait is not present for isVisible() action in playwright
    const bool = await page.locator("h3:has-text='ZARA COAT 3'").isVisible(); //Using Psudo class - Find text which have h3 tag
    await expect(bool).toBeTruthy();

  }
});
