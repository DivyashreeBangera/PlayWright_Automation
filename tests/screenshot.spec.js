const { test, expect } = require('@playwright/test');

test('Capture screenshot', async ({ page }) => {

    
    //const page = await browser.newPage();

    // Navigate to the webpage
    await page.goto('https://example.com');

    // Take a full-page screenshot
    //await page.screenshot({ path: 'screenshot.png', fullPage: true });
   // console.log('Screenshot taken successfully!');



    // Capture the screenshot and store it as a Buffer
 //const buffer = await page.screenshot();
    // Convert the Buffer to a Base64 string and log it
   //console.log(buffer.toString('base64'))

    // Capture a screenshot of the specific element (e.g., an element with class "header")
    await page.locator('h1').screenshot({ path: 'h1_screenshot.png' });


   
})
