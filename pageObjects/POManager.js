const { LoginPage } = require('./LoginPage.js');
const { DashboardPage } = require('./DashboardPage.js');
const { CartPage } = require('./CartPage.js');
const { OrdersHistoryPage } = require('./OrdersHistoryPage.js');
const { OrdersReviewPage } = require('./OrdersReviewPage.js');
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrderReviewPage() {
        return this.ordersReviewPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }
}
module.exports = { POManager };