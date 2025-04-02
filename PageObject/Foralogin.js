class ForaLoginPage {
    constructor(page) {
        this.page = page;
        this.signin= page.getByText("Sign in here.")
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]')
        this.errorMessage = page.locator('.my-1 text-sm text-error');
        this.successMessage = page.locator('.font-medium text-headerFS24 text-primary')
    }

    async goto() {
        await this.page.goto('https://advisor.forastaging.net/');
    }

    async login(username, password) {
        await this.signin.click()
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return this.errorMessage.innerText();
    }

    async getErrorMessage() {
        return this.successMessage.innerText();
    }

}


module.exports = { ForaLoginPage};
