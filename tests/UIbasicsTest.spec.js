//const { test, expect } = require("@playwright/test"); //Importing test & assert annotation from playwright node_modules package
import { test, expect } from "@playwright/test";

//Playwright code Test Format
test("Playwright test title", function () {
    // Test Isolation - every test gets a fresh browser environment
    console.log("Test format");
});

//JS is asyncronous (each syntax try to execute parallelly) - to execute syncronously use async before function to use await() method

test("@smoke Browser Context playwright test", async ({ browser }) => {
    //{browser} fixture - Global variable which are available in entire project
    //Each test execute in isolated BrowserContext with fresh environment
    //Create new context/fresh instance of browser (without shared plugin/cookies/cache)
    const context = await browser.newContext(); // Where ever the action is performed - await should be there
    const page = await context.newPage(); //New tab instance
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // await page.close(); //Close the tab
    console.log("✅ Smoke test passed.");
});

test("Page Context playwright test", async ({ page }) => {
    // The { page } argument tells Playwright Test to setup the page fixture and provide it to your test function.
    // Fixtures help to define reusable setup/teardown code that can be used across multiple tests - page, browser fixtures are used to establish the environment for each test
    await page.goto("https://playwright.dev/docs/intro");
    //get page title - Assertion
    await expect(page).toHaveTitle("Installation | Playwright");
    console.log(await page.title());
});

test("Login page test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("Bhavya");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    //Playwright automatically wait until this locator shown up on page - no implicit wait needed
    await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //negative scenario

    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitle.first().textContent()); //first element - This method/action will wait 30s timeout until element shows up
    console.log(await cardTitle.nth(1).textContent()); //second element

    console.log(await cardTitle.allTextContents()); //This method/action does not wait 30s timeout (until all elements are showing up)
});

test("UI controls test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");

    await userName.fill("username");

    //Select last Radio button then click on alert button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    //Select dropdown option
    const dropdown = await page.locator("select.form-control");
    dropdown.selectOption("Teacher");

    //Check/Uncheck terms & conditions checkbox
    await page.locator("#terms").check(); //or use .click() method
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); //To expact whether checkbox is unchecked | Action performed inside expect bracket -So, await is inside

    //Blicking text is present on not - Element with particular attribute is present or not
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    //   await page.pause();
});

test("Child window handle", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");

    //Array of promises - Wrap in one array - Wait until multiple steps are successfully accomplieshed - needed when multiple steps to be executed asyncronously/parallely
    const [newPage] = await Promise.all([
        //If 2 new page opens use -> [newPage1, newPage2]
        context.waitForEvent("page"), //Wait for event of new page opening in bg (It will return new page promise - 'pending')
        documentLink.click(), //New page is opened
    ]); //This block keep iterating until both promises successfully fulfilled
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);

    //   await page.pause(); //To debug
});

/*
page.locator('span').filter({ hasText: /^test$/ }).first().click();
Playwright suggest to use CSS locator instead of xpath - #id | .class | [attribute='value'] | text=abc | tag:has-text('abc')

Every operation return status of step/operation called 'Promise' {Pending / Rejected / Fulfilled}

Use test.only helper attribute with test to execute only particular test annotation
Use test.skip to skip the selected test
*/
