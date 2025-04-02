const { test, expect } = require('@playwright/test');

test('Extract Chrome CPU usage from Dynamic Table', async ({ page }) => {
    // Navigate to the dynamic table page
    await page.goto('https://practice.expandtesting.com/dynamic-table');

    // Wait for the table to appear
    await page.waitForSelector("div[role='row']", { timeout: 10000 });

    // Locate the Chrome row dynamically
    const chromeRow = page.locator("div[role='row']:has-text('Chrome')");

    // Ensure the Chrome row is visible before proceeding
    await expect(chromeRow).toBeVisible();

    // Locate the CPU column for Chrome
    const cpuValue = await chromeRow.locator("div:nth-child(4)").textContent();

    // Log the extracted CPU usage
    console.log("Chrome CPU Usage:", cpuValue.trim());

    // Validate the extracted value is not empty
    expect(cpuValue.trim()).not.toBe("");
});
