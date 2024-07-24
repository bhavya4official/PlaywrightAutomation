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
