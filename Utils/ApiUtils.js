class ApiUtils { /* Pre-condition data setup */

    constructor(apiContext, loginPayload) { // Argument Coming from test file where object is created
        this.apiContext = apiContext; // assigning parameter to local apiContext object to share in this file - instance variable
        this.loginPayload = loginPayload;
    } // this refers to current class - have access to complete class

    async getToken() {
        /* Login API */
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            });
        const loginResponseJson = await loginResponse.json(); // Get JSON body from response object
        let token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    /**
     * @param {JSON} orderPayload
     * @return {object} response
     */
    async createOrder(orderPayload) {
        let response = {}; // Declaring empty js object
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'content-type': 'application/json'
                }
            });
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        let orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}

module.exports = { ApiUtils };