import { test, expect, request } from '@playwright/test';

test("@Security test - Request intercept", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("bhavya4official@gmail.com");
    await page.locator("#userPassword").fill("Test@123");
    await page.locator("[value='Login']").click(); // 'button:has-text("Log in"), button:has-text("Sign in")' psudo-class method  
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    /* Reading API response */
    const response = await page.waitForResponse(response => response.url().includes('order/get-orders-for-customer') && response.status() === 200);
    const jsonResponse = await response.json();
    console.log('First Order ID in RESPONSE: ' + jsonResponse.data[0]._id); // ((await response.json()).data._id)

    await page.on('request', request=>console.log(request.url())); // Listner - invoke when an request event occur -> then action will be executed
    await page.on('response', response=> console.log(response.url(), response.status())); // Network tab made a response

    // Keep an eye on this API hit and intercept
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=66c04478ae2afd4c0boed821" }) // Continue route's request with optional overrides
    );
    await page.locator("button:has-text('View')").first().click();
    // await page.pause(); // Should show unauthorized page
    // await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await expect(page.locator('app-order-details')).toContainText('You are not authorize to view this order');

    page.route("**/*.css", route=>route.abort()); // Block all network request URL ending with .css extension
    page.route("**/*{png, jpg, jpeg}", route=>route.abort()); // Block all images to load in browser

});