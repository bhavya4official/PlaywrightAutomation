/*Page class is a class that has all the locators of a page & methods to perform actions on those locators*/
// Encapsulates the elements and actions of the Login Page in a class, following the Page Object Model design pattern.
class LoginPage { // Class name should be same as the file name
    // A constructor is a special method of a class, which is called when the object of the class is created. It is used to initialize the class variables 
    constructor(page) { // Automatically invoked when the object of a class is created (Catch the page details)
        // this variable is a class varible (Global) -> these automatically initialize once object of this class is created
        this.page = page; // this refers to current class
        // Define locators for the login page elements
        this.userEmail = page.locator("#userEmail"); //page objects
        this.password = page.locator("#userPassword");
        this.signInbutton = page.locator("[value='Login']");
    }

    // Action Methods for the Login Page
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userEmail, password) {
        await this.userEmail.fill(userEmail);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle'); // After login - Wait for next page to load
    }

}

module.exports = { LoginPage } // make this class public & availble to whole framework
