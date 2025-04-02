const { test, expect } = require('@playwright/test');

test('Minimize Window & Scroll Horizontally and Vertically', async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Web_scraping');

    // Simulate minimized window by setting a small viewport
    //await page.setViewportSize({ width: 500, height: 500 });
    await page.waitForTimeout(2000); // Wait to observe

    // Scroll right by 500 pixels
  // await page.evaluate(() => window.scrollBy({ left: 500, behavior: 'smooth' }));
   // await page.waitForTimeout(2000);

    // Scroll to the far right
   // await page.evaluate(() => window.scrollTo({ left: document.body.scrollWidth, behavior: 'smooth' }));
   // await page.waitForTimeout(2000);

    // Scroll back to the left
   // await page.evaluate(() => window.scrollTo({ left: 0, behavior: 'smooth' }));
   // await page.waitForTimeout(2000);

   //  Scroll down by 500 pixels
    
   // await page.waitForTimeout(2000);

    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    
    await page.waitForTimeout(2000);

    // Scroll back to the top
   // await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));

    await page.evaluate(() => window.scrollTo( 0, 500 ));
    await page.waitForTimeout(2000);
    //window.scrollTo(0, 500);

    console.log("Window resized, horizontal and vertical scrolling performed");
});
