// @ts-check
import { test, expect } from "@playwright/test";

test("@smoke getByLabel - Playwright special locators", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").click();

    await page.getByPlaceholder("Password").fill("test@123");
    await page.getByRole("button", { name: 'Submit' }).click();
    await expect.soft(page.getByText("Success! The Form has been submitted successfully!."), 'Success message displayed.').toBeVisible();
    //By default, failed assertion will terminate test execution. Soft assertions do not terminate test execution even when failed.
    //Custom expect message as a second argument to the expect function - it will shown in reporters

    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button").click();

});
