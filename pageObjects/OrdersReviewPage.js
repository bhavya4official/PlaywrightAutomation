import { expect } from "@playwright/test";

class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async searchCountryAndSelect(countyCode, countyName) {
        await this.country.type(countyCode, { delay: 100 });
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countyName) {
                await this.dropdown.locator("button").nth(i).click();
                console.log("Inside loop - Country selected: " + text);
                break;
            }
        }
        await expect(this.country).toHaveValue(countyName); // Verify Select Country dropdown selected value
    }

    async verifyEmailId(email) {
        await expect(this.emailId).toHaveText(email);
    }

    async submitAndGetOrderId() {
        await this.submit.click(); // Click on Submit button
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. "); // Verify Thankyou message
        return await this.orderId.textContent(); // Getting & storing order id
    }


}
module.exports = { OrdersReviewPage };