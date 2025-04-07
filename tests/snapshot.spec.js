const { test, expect } = require('@playwright/test');

test('Full Page Snapshot Test', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://example.com');

    // Capture and compare the snapshot of the entire page
    await expect(page).toHaveScreenshot();
});
