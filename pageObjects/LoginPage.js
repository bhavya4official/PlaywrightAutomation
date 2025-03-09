/*Page class is a class which have all the locators of a page & methods to perform actions on those locators*/
class LoginPage { // Class name should be same as file name

    // Constructor is a special method of a class, which is called when the object of the class is created - It is used to initialize the class variables 
    constructor(page) { // Automatically invoked when the object of a class is created (Catch the page details)
        // this variable is a class varible (Global) -> these automatically initialize once object of this class is created
        this.page = page; // this refers to current class
        this.userEmail = page.locator("#userEmail"); //page objects
        this.password = page.locator("#userPassword");
        this.signInbutton = page.locator("[value='Login']");
    }

    // Action methods
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(userEmail, password) {
        await this.userEmail.fill(userEmail);
        await this.password.fill(password);
        await this.signInbutton.click();
    }

}

module.exports = { LoginPage } // make this class public & availble to whole framework