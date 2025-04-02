const { test, expect } = require('@playwright/test');

test.describe.serial('Sequential Test Execution', () => {
  test('Handle various dialog types', async ({ page }) => {
    await page.goto('https://freelance-learn-automation.vercel.app/login');

// Click the 'New user? Signup' button
    await page.getByText("New user? Signup").click(); //finding plain text elements on a page.

    // Fill in the 'Full Name' field
    await page.locator('[placeholder="Name"]').fill('John Doe');

    // Fill in the 'Email' field
    await page.locator('//html/body/div/div/div[2]/div/div[1]/form/div/input[2]').fill('johndoe@example4.com');
    //await page.locator('[aria-label="Email"]').fill('johndoe@example.com');

    // Fill in the 'Password' field
    await page.locator('[name="password"]').fill('SecurePassword123');


    // Click on the first checkbox
    await page.locator('(//input[@type="checkbox"])').nth(0).click(); //index value

    // Click the 'Selenium Grid' checkbox using text-based locator
    await page.getByLabel('Selenium Grid').check();

    // Select a value from the dropdown (alternative approach)
    await page.locator('#hobbies').selectOption(['Reading', 'Playing'], { force: true });

    // Select state using value
    await page.locator('#state').selectOption({ index: 1 });

    // Click the 'Sign Up' button
    await page.getByRole('button', { name: 'Sign Up' }).click(); //when interacting with buttons, inputs

    // Wait for navigation or success message
    await page.waitForURL('https://freelance-learn-automation.vercel.app/login');

  });
});
