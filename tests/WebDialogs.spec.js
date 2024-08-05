import {test, expect} from '@playwright/test';

test("Popup ", async ({page}) => {
   await page.goto("https://google.com");
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   await page.goBack();
   await page.goForward();

   await expect(page.locator("#displayed-text"), "Element visibility check").toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text"), "Verify the element is hidden").toBeHidden();
});