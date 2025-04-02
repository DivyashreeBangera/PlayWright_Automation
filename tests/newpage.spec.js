const { test, expect } = require('@playwright/test');

test('Handle new pages', async ({ browser }) => {
    const page1 = await browser.newPage(); // creates a new browser tab
    
    await page1.goto('https://example.com');
    console.log('First Page URL:', page1.url());

    // **Open a New Page**
    const page2 = await browser.newPage();
    await page2.goto('https://playwright.dev');
    console.log('Second Page URL:', page2.url());

    // Close pages
    await page1.close();
    await page2.close();
})