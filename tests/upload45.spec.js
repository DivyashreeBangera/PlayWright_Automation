const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs'); // File system module to read files

test('Handle multiple pages', async ({ page }) => {

    // Navigate to a file upload demo site 
    await page.goto('https://www.file.io/');

    // Define the folder where files are stored
    const uploadFolder = path.join(__dirname, 'uploadFiles');

    // Generate file paths dynamically
   // const filePaths = Array.from({ length: 45 }, (_, i) => path.join(uploadFolder, `sample${i + 1}.pdf`));//Creates an array of 45 file paths

    // Read all files in the folder
    let filePaths = fs.readdirSync(uploadFolder) // Read files
        .map(file => path.join(uploadFolder, file)) // Convert to full file paths
        .slice(0, 45); // Take only 45 files

    // Upload multiple files
    await page.setInputFiles('input[type="file"]', filePaths);

    await page.waitForTimeout(20000);

    console.log("45 files uploaded successfully!");
  
})
