const { test: base , expect } = require('@playwright/test');
const { LoginPage } = require('../PageObject/login')

// Define custom fixture
const customTest = base.extend({
    userData: async ({}, use) => {
        const user = { username: "standard_user", password: "secret_sauce" };
        await use(user);  // Provide user credentials to test cases
    }
});

customTest.describe('SauceDemo Login Tests', () => {
    let loginPage;

    customTest.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    customTest('Successful Login', async ({ page, userData }) => {
        await loginPage.login(userData.username, userData.password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    customTest('Invalid Login', async ({ page }) => {
        await loginPage.login('wrong_user', 'wrong_pass');
        await expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Username and password do not match');
    });
});
