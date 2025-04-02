const { test: base , expect } = require('@playwright/test');
const { ForaLoginPageLoginPage } = require('../PageObject/Foralogin')

// Define custom fixture
const customTest = base.extend({
    ForauserData: async ({}, use) => {
        const user = { username: "reenaz+user5710@team899982.testinator.com", password: "Qaoncloud@01", successmessage:"Welcome, reenaz5710!",
             WrongUser: "wrong Username", WrongPass: "Wrong Password", ErrorMessage: "Unable to log in with provided credentials." };
        await use(user);  // Provide user credentials to test cases
    }
});

customTest.describe('Fora Login Tests', () => {
    let ForaLoginPage;

    customTest.beforeEach(async ({ page }) => {
        ForaLoginPage = new ForaLoginPage(page);
        await ForaLoginPage.goto();
    });

    customTest('Successful Login', async ({ page, userData }) => {
        await ForaLoginPage.login(ForauserData.username, ForauserData.password);
        await expect(await ForaLoginPage.successmessage()).toContain(ForauserData.successmessage);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    customTest('Invalid Login', async ({ page }) => {
        await ForaLoginPage.login(ForauserData.WrongUser, ForauserData.WrongPass);
        await expect(await ForaLoginPage.getErrorMessage()).toContain(ForauserData.ErrorMessage);
    });
});
