
const { test, expect } = require('@playwright/test');
const fs = require('fs'); //To manage local file operations
const path = require('path'); //To handle file paths in a cross-platform way.


test('Download File', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');


    // Define the download directory
    const downloadFolder = 'D:\\PlayWright\\tests\\downloadFolder';

    // Ensure the directory exists
    if (!fs.existsSync(downloadFolder)) { //Checks if the folder exists
        fs.mkdirSync(downloadFolder, { recursive: true }); //If not, creates it
    }


     // Select all download links
     const downloadLinks = await page.$$('a[href^="download/"]'); // Finds all files in the download list

     const totalFiles = Math.min(downloadLinks.length, 10); // Ensure we download only 10 files

    // Loop through the first 10 files and download them
    //for (const link of downloadLinks) {
    for (let i = 0; i < totalFiles; i++) {
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            downloadLinks[i].click()
        ]);

        // Get the suggested filename
        const filename = download.suggestedFilename();
        const filepath = path.join(downloadFolder, filename);

        // Save the file
        await download.saveAs(filepath);

        // Verify that the file exists
        expect(fs.existsSync(filepath)).toBeTruthy();
        console.log(` File Downloaded: ${filename}`);
    }

    console.log(" 10 files downloaded successfully!");
});