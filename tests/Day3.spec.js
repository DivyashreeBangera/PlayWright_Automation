const { test, expect } = require('@playwright/test');

test.describe.serial('Sequential Test Execution', () => {
  test('Handle various dialog types', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    // register a dialog handler 
    page.on('dialog', async dialog => {  //handle all dialogs that appear during the test execution.
      console.log(`${dialog.type()} message: ${dialog.message()}`); //logs the dialog type and message:

      if (dialog.type() === 'alert') {
        await dialog.accept(); // Accept alerts
      } else if (dialog.type() === 'confirm') {
        await dialog.dismiss(); // Dismiss confirmation dialogs
      } else if (dialog.type() === 'prompt') {
        await dialog.accept('Playwright Test'); // Accept and provide input
      } else {
        await dialog.accept(); // Accept any other dialog types
      }
    });

    // Trigger alert dialog
    await page.locator('#alertButton').click();

    // Trigger confirm dialog
    await page.locator('#confirmButton').click();

    // Trigger prompt dialog
    await page.locator('#promtButton').click();

    // Trigger print dialog
    await page.evaluate(() => window.print());
  });
});
