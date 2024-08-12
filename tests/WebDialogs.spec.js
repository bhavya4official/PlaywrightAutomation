import {test, expect} from '@playwright/test';

test("Popup validations", async ({page}) => {
   await page.goto("https://google.com");
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   await page.goBack();
   await page.goForward();

   /* Hidden/visible element assertion */
   await expect(page.locator("#displayed-text"), "Element visibility check").toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text"), "Verify the element is hidden").toBeHidden();

   page.on('dialog', dialog => dialog.accept()); // Control will come at line 14 when Alert even occur
   // Listening event to occur - Dialog box to open - ('event name', action to perform - accept/dismiss)
   await page.locator("#confirmbtn").click();

   /* Hover method example */
   await page.locator('#mousehover').hover();
});

test("Handle & automate frames", async ({page})=>{
page.goto("https://rahulshettyacademy.com/AutomationPractice/");

const framesPage = page.frameLocator('#courses-iframe'); // Switch main frame to child frame - get new page object
await framesPage.locator("li a[href*='lifetime']:visible").click(); // Focus only on visible locator
const textCheck = await framesPage.locator(".text h2").textContent();
await expect(textCheck.split(" ")[1], "Verify the text present in iframe").toContain('13,522');
});