/* Login via UI -> Store session state (local storage+Session+Cookies) in .json file */
/* Inject .json file data into test's new Browser context */

import { test, expect } from '@playwright/test';

let webContext;
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill('bhavya4official@gmail.com');
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'Utils/browserState.json' }); // Capturing App storage settings of browser context level not for page/tab level
    webContext = await browser.newContext({ storageState: 'Utils/browserState.json' });
});

test("Client app login using session storage", async () => {
    console.log(webContext);

    const page = await webContext.newPage(); // Creating new page based upon webContext (containing login storage state created in beforeAll hook)
    await page.goto("https://rahulshettyacademy.com/client");

    /* Place Orders WF using login session generated via login hook */
    const products = page.locator(".card-body");
    //   await page.locator(".card-body").first().waitFor(); // Wait for first element to be visible - need to wait because count() method does not have auto-wait capability
    console.log(await page.locator(".card-body b").allTextContents());
    for (let i = 0; i < await products.count(); ++i) {
        console.log("> Inside for loop");
        if (await products.nth(i).locator("b").textContent() === "ZARA COAT 3") {
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }
});