/* Create object of ApiUtils class to generate login token & orderId */
const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/ApiUtils");
// const { ApiUtils } = require("./Utils/ApiUtils");
// import { ApiUtils } from "./Utils/ApiUtils";

const loginPayload = { userEmail: "bhavya4official@gmail.com", userPassword: "Test@123" }; //Store payload in JS object format - at runtime it will convert to JSON format
const orderPayload = { orders: [{ country: "Indonesia", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] };

let response;

test.beforeAll("API execution in ApiUtils file", async () => {
    /* Login API */
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test("Login & place order using before hook - Util", async ({ page }) => {

    // To execute JS code - Insert a value in browser session (local storage)
    page.addInitScript(value => {
        window.localStorage.setItem("token", value); // Setting key-value to store token in Dev-tool>Application>Storage>local Storage
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    /* Orders Page WF using orderId generated via API hook */
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor(); // Wait until whole table body is shown up
    const orders = page.locator("tbody > tr");

    for (let i = 0; i < await orders.count(); i++) {
        if (response.orderId.includes(await orders.nth(i).locator("th").textContent())) {
            await orders.nth(i).locator("button").first().click();  // View order that match orderId
            break;
        }
    }
});
