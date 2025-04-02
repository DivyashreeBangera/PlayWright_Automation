const { test, expect } = require('@playwright/test');

test('Find Chrome CPU usage in a dynamic table', async ({ page }) => {
    // Navigate to the dynamic table page
    await page.goto('https://practice.expandtesting.com/dynamic-table');

    // Wait for the table to load
    await page.waitForSelector('table');


    // Find and validate a specific value in the table dynamically
    const specificCell = await page.locator('tbody tr:has-text("Chrome") td:nth-child(3)').textContent();
    console.log('Value for Chrome in Column 2:', specificCell);

    // Assertion to check if "Chrome" exists in the table
    await expect(page.locator('tbody tr:has-text("Chrome")')).toBeVisible();

    // Locate the Chrome row and get the CPU value from the correct column
    const chromeCpuUsage = await page.locator('tbody tr:has-text("Chrome") td:nth-child(4)').textContent();

    console.log(`Chrome CPU Usage: ${chromeCpuUsage}`);

    // Assertion to ensure the CPU usage value is retrieved
    expect(chromeCpuUsage).not.toBeNull();
});
