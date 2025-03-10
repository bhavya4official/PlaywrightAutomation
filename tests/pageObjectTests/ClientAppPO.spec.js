const { test, expect } = require("@playwright/test");
// const { LoginPage } = require('../../pageObjects/LoginPage'); // Importing LoginPage class to use in this file

const {POManager} = require('../../pageObjects/POManager'); // Importing POManager class to use all object pages in this file

test("Client app login", async ({ page }) => {

    const poManager = new POManager(page); //This object holds all the objects of page classes

    const email = "bhavya4official@gmail.com";
    const password = "Test@123";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");

    // const loginPage = new LoginPage(page); // Creating LoginPage object by sending 'page' value as argument to constructor
    const loginPage = poManager.getLoginPage(); // Creating LoginPage object using POManager object

    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    const dashboardPage = poManager.getDashboardPage(); // Creating DashboardPage object

    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(); // Creating CartPage object

    const bool = cartPage.isProductPresent(productName);
    await expect(bool).toBeTruthy();
    cartPage.navigateToCheckout();     /* Navigate to Checkout page */

    /* Validating email id on checkout page */
    const checkout = poManager.getCheckoutPage(); // Creating CheckoutPage object
    await checkout.validateEmail(email);
    console.log("Email validated successfully");

    /* Select Country dropdown - Handling auto suggestive dropdown options */
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind"); //To enter value one-by-one

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        if ((await dropdown.locator("button").nth(i).textContent()) === " India") {
            //text.trim() OR text.includes()
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator("[placeholder='Select Country']")).toHaveValue('India'); // Verify Select Country dropdown selected value

    await page.locator(".action__submit").click(); // Click on Submit button

    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order."); // Verify Thankyou message
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // Getting & storing order id
    console.log('Order ID: '+orderId);

    /* Orders Page WF */
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor(); // Wait until whole table body is shown up
    const orders = page.locator("tbody > tr");

    for (let i = 0; i < await orders.count(); i++) {
        if (orderId.includes(await orders.nth(i).locator("th").textContent())) {
            await orders.nth(i).locator("button").first().click();  // View order that match orderId
            break;
        }
    }

    /* Order Summary page */
    const orderIdDetails = await page.locator(".col-text").textContent(); // waitFor() is not needed because textContext have auto-wait capability

    await expect(orderId.includes(orderIdDetails)).toBeTruthy(); // Verify orderId on Order Summary page

    //   await page.pause();
});
