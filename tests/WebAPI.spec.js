/* Generating login token & orderID using API in before Hook then using in test by injecting token in browser session */

const { test, expect, request } = require("@playwright/test");

const loginPayload = { userEmail: "bhavya4official@gmail.com", userPassword: "Test@123" }; //Store payload in JS object format - at runtime it will convert to JSON format
const orderPayload = { orders: [{ country: "Indonesia", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] };
let token;
let orderId;

test.beforeAll("API execution", async () => {
    /* Login API */
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", // Hit login API & get response
        {
            data: loginPayload
        });
    /* Verify the Response is successful 200 */
    expect(await loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json(); // Get JSON body from response object
    token = loginResponseJson.token;
    console.log(token);

    /* Hit Create-Order API to setup data - orderId */
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];

});

test.beforeEach(() => {

});

test("Login & place order using API before hook", async ({ page }) => {
    // To execute JS code - Insert a value in browser session (local storage)
    page.addInitScript(value => {
        window.localStorage.setItem("token", value); // Setting key-value to store token in Dev-tool>Application>Storage>local Storage
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor(); //Recommanded wait instead of networkidle - to wait until element fully loaded
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    /* Orders Page WF using orderId generated via API hook */
    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor(); // Wait until whole table body is shown up
    const orders = page.locator("tbody > tr");

    for (let i = 0; i < await orders.count(); i++) {
        if (orderId.includes(await orders.nth(i).locator("th").textContent())) {
            await orders.nth(i).locator("button").first().click();  // View order that match orderId
            break;
        }
    }
});
