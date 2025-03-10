class CartPage {
    constructor(page) {
        this.page = page;
        this.checkOut = page.locator("text=Checkout");
    }

    async isProductPresent(productName) {
        const bool = await this.page.locator("h3:has-text('pruductName')").isVisible(); //Using Psudo class - Find text which have h3 tag
        return bool;
    }

    async navigateToCheckout() {
        await this.checkOut.click();
    }
}
module.exports = { CartPage };