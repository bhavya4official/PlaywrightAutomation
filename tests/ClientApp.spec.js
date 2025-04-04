const { test, expect } = require("@playwright/test");

test("Wait dynamically for new page in service based app", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("bhavya4official@gmail.com");
  await page.locator("#userPassword").fill("Test@123");
  await page.locator("[value='Login']").click(); // 'button:has-text("Log in"), button:has-text("Sign in")' psudo-class method

  //await page.waitForLoadState("networkidle"); //wait until network comes to idle state - So all elements are fully loaded
  await page.locator(".card-body b").first().waitFor(); //Recommanded wait instead of networkidle - to wait until element fully loaded
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});

test("E-commerce E2E work flow", async ({ page }) => {
  const email = "bhavya4official@gmail.com";
  const productName = "ZARA COAT 3";

  /* Login */
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Test@123");
  await page.locator("[value='Login']").click();

  /* Find product on home page & add it to card */
  const products = page.locator(".card-body");

  await page.locator(".card-body").first().waitFor(); // Wait for first element to be visible - need to wait because count() method does not have auto-wait capability
  console.log(await page.locator(".card-body b").allTextContents());
  console.log(">First item: "+await products.nth(0).locator("b").textContent());

  for (let i = 0; i < await products.count(); ++i) {
    console.log("> Inside for loop");
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text = Add To Cart").click();
      break;
    }
  }

  /* Navigate to Cart page */
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor(); // It waits for mentioned elements to appear - because auto-wait capability is not present for isVisible() action in playwright
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //Using Psudo class - Find text which have h3 tag
  await expect(bool).toBeTruthy();

  /* Navigate to Checkout page */
  await page.locator("text=Checkout").click();

  /* Validating email id on checkout page */
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

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
  console.log(orderId);

  /* Orders Page WF */
  await page.locator("button[routerlink*='myorders']").click();

  await page.locator("tbody").waitFor(); // Wait until whole table body is shown up
  const orders = page.locator("tbody > tr");

  for(let i=0; i< await orders.count(); i++) {
    if(orderId.includes(await orders.nth(i).locator("th").textContent())) {
        await orders.nth(i).locator("button").first().click();  // View order that match orderId
        break;
    }
  }

  /* Order Summary page */
  const orderIdDetails = await page.locator(".col-text").textContent(); // waitFor() is not needed because textContext have auto-wait capability

  await expect(orderId.includes(orderIdDetails)).toBeTruthy(); // Verify orderId on Order Summary page

//   await page.pause();
});
