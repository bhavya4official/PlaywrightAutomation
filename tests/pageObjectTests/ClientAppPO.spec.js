const { test, expect } = require("@playwright/test");
const { customTest } = require("../../Utils/test-base"); // Importing customTest function to use test data 

// const { LoginPage } = require('../../pageObjects/LoginPage'); // Importing LoginPage class to use in this file
const { POManager } = require('../../pageObjects/POManager'); // Importing POManager class to use all object pages in this file
// convert json->string->js object
const dataset = JSON.parse(JSON.stringify(require("../../utils/placeOrderTestData.json"))); // Importing JSON file to use test data & converting it to JS object

test("Client app login", async ({ page }) => {

    const poManager = new POManager(page); //This object holds all the objects of page classes

    // const email = "bhavya4official@gmail.com"; // Using test data from external JSON file instead of these hard coded values
    // const password = "Test@123";
    // const productName = "ZARA COAT 3";

    // const loginPage = new LoginPage(page); // Creating LoginPage object by sending 'page' value as argument to constructor
    const loginPage = poManager.getLoginPage(); // Creating LoginPage object using POManager object
    await loginPage.goTo();
    await loginPage.validLogin(dataset.email, dataset.password);

    const dashboardPage = poManager.getDashboardPage(); // Creating DashboardPage object
    await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage(); // Creating CartPage object
    await cartPage.verifyProductPresent(dataset.productName);
    await cartPage.navigateToCheckout();     /* Navigate to Checkout page */

    /* Select Country dropdown - Handling auto suggestive dropdown options */
    const orderReviewPage = poManager.getOrderReviewPage(); // Creating OrderReviewPage object
    await orderReviewPage.searchCountryAndSelect(dataset.countryCode, dataset.countryName);
    await orderReviewPage.verifyEmailId(dataset.email);
    const orderId = await orderReviewPage.submitAndGetOrderId();
    console.log("Order ID: " + orderId);
    await dashboardPage.navigateToOrders();

    /* Orders Page WF */
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    // expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    //   await page.pause();
});

// Pass test data as fixture
customTest("Client app login using customTest for test data", async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page); //This object holds all the objects of page classes

    // const loginPage = new LoginPage(page); // Creating LoginPage object by sending 'page' value as argument to constructor
    const loginPage = poManager.getLoginPage(); // Creating LoginPage object using POManager object
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
    await page.close();
});
