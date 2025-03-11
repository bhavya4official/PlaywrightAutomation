import { expect } from '@playwright/test';

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first(); 
        this.checkOut = page.locator("text=Checkout");
    }

    async verifyProductPresent(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible(); 
        expect(bool).toBeTruthy();
    }

    getProductLocator(productName) {
        // return this.cartProducts.locator("text="+productName);
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async navigateToCheckout() {
        await this.checkOut.click();
    }

}
module.exports = { CartPage };