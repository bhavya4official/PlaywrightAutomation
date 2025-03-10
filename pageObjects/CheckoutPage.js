import { expect } from "@playwright/test";
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator(".user__name [type='text']");
        this.country = page.locator("[placeholder*='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.submit = page.locator(".action__submit");
        this.thankyou = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orders = page.locator("tbody > tr");
        this.orderIdDetails = page.locator(".col-text");
        this.myOrders = page.locator("button[routerlink*='myorders']");
    }
    async validateEmail(email) {
        await expect(this.email.first()).toHaveText(email);
    }
}
module.exports = { CheckoutPage };