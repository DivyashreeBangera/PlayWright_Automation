const { test, expect } = require('@playwright/test');

test('Handle multiple pages', async ({ page }) => {

    await page.goto('https://demoqa.com/browser-windows');

    // **Handle New Tab**
    const [newTab] = await Promise.all([ //ensures both actions happen simultaneously:
        page.waitForEvent('popup'), // Waits for a new tab to open
        page.locator('#tabButton').click() // Clicks the "New Tab" button.
    ]);
    await newTab.waitForLoadState(); // Wait until page is loaded
    console.log('New Tab URL:', newTab.url());

    // Close all windows
    await newTab.close();

})
