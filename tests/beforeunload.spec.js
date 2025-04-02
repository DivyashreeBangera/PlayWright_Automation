const { test, expect } = require('@playwright/test');

test('Handle before unload dialogs', async ({ page }) => {
 
    await page.goto('https://demoqa.com/browser-windows'); // Replace with a site that triggers beforeunload

    // Inject beforeunload event to simulate behavior
    await page.evaluate(() => {
        window.onbeforeunload = () => 'Are you sure you want to leave?'; 
    });

    // Listen for beforeunload dialog
    page.on('dialog', async dialog => {
        console.log(`BeforeUnload message: ${dialog.message()}`);
        await dialog.accept(); // Accept the leave confirmation
    });

    // Attempt to close the page (this should trigger beforeunload)
    await page.close({ runBeforeUnload: true });

});
