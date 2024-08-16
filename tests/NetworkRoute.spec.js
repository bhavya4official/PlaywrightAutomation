/* Intercept network response: API response -> {insert fake response in browser} -> Browser render data on FE */

const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/APIutils");

const loginPayload = { userEmail: "bhavya4official@gmail.com", userPassword: "Test@123" }; //Store payload in JS object format - at runtime it will convert to JSON format
const orderPayload = { orders: [{ country: "Indonesia", productOrderedId: "6581cade9fd99c85e8ee7ff5" }] };

let response;
let fakePayloadOrders = { data: [], message: "No Orders" };

test.beforeAll("API execution in ApiUtils file", async () => {
    /* Login API */
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test("Login using API token & Test empty order scenario using intercepting response", async ({ page }) => {

    // To execute JS code - Insert a value in browser session (local storage)
    page.addInitScript(value => {
        window.localStorage.setItem("token", value); // Setting key-value to store token in Dev-tool>Application>Storage>local Storage
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    /* Intercepting network response or mocking order API response */
    // Route the API to fake response (which URL network call need to route, route to which response)
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const response = await page.request.fetch(route.request()); // page.request - Switching browser page to API testing helper mode
            // Fetching response whenever route URL API call occur
            // Injecting fake payload
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({ // Fulfill - giving response to browser
                response,
                body, // Overiding existing body that route have to fake one
            });
        });

    /* Navigate to Orders Page */
    await page.locator("button[routerlink*='myorders']").click();
    // await page.pause();

    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    // To resolve Request context disposed error (channel is still open) - immediately sending fake response before getting actual response when response is sligtly delayed

    console.log(await page.locator('.mt-4').textContent());
    await expect(page.getByText("No Orders"), "Verify no order exist").toBeVisible();

});