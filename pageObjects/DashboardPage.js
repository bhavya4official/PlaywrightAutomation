class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    /* Find product on home page & add it to card */
    async searchProductAddCart(productName) {
            const titles = await this.productsText.allTextContents();
            console.log('Titles: '+titles);
            const count = await this.products.count();      
            for (let i = 0; i < count; ++i) {
                console.log("> Inside for loop");
                if (await this.products.nth(i).locator("b").textContent() === productName) {
                    await this.products.nth(i).locator("text = Add To Cart").click();
                    break;
                }
            }
    }

    /* Navigate to Cart page */
    async navigateToCart() {
    await this.cart.click();
    await this.page.locator("div li").first().waitFor(); // It waits for mentioned elements to appear - because auto-wait capability is not present for isVisible() action in playwright
    }
}
module.exports = { DashboardPage };