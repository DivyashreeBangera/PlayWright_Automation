const { test, expect } = require('@playwright/test');

test('Handle Single Page, Multiple Pages & Popups', async ({ browser }) => {
    // **Create a new browser context**
    const context = await browser.newContext();

    // **Single Page Interaction**
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/windows');
    console.log('Main Page URL:', page.url());

    // **Handle Multiple Pages (New Tab)**
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),  // Waits for new tab to open
        page.getByText('Click Here').click() // Clicks on the link to open new tab
    ]);

    await newTab.waitForLoadState();  // Wait for tab to load
    console.log('New Tab URL:', newTab.url());
    await expect(newTab).toHaveURL('https://the-internet.herokuapp.com/windows/new');

    // Close the new tab
    await newTab.close();


    // **Clean up**
    await page.close();
    await context.close();
});
