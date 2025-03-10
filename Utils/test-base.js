const base = require('@playwright/test');

// Custom test behavior
exports.customTest = base.test.extend( // Extending the default object with any customized properties
    { // customized options
        testDataForOrder: {
            email: "bhavya4official@gmail.com",
            password: "Test@123",
            productName: "ZARA COAT 3"
        }
    }
);