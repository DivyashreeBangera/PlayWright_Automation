const { test, expect } = require('@playwright/test');

test.describe.serial('Sequential Test Execution', () => { //tests inside this block run one after another in the exact order they are defined

test('Single File Upload', async ({ page }) => {

    const filePaths = ['tests/uploadFiles/sample1.pdf']

    await page.goto('https://practice.expandtesting.com/upload');
    await page.locator('#fileInput').setInputFiles(filePaths[0])
    await page.waitForTimeout(5000)
    await page.locator('#fileSubmit').click();

     // Extract filenames displayed on the page
    const uploadedFilename = await page.locator('#uploaded-files').textContent();

     // Get the expected filenames from the file paths
     const expectedFilename = filePaths.map(path => path.split('/').pop()); //Extracts the filename from each file path in the filePaths array.
    // Assert after trimming spaces
    expect(uploadedFilename.trim()).toContain(expectedFilename[0]);
})


test('Multiple File Upload', async ({ page }) => {

    const filePaths = ['tests/uploadFiles/sample1.pdf','tests/uploadFiles/sample2.pdf' ]

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.locator('#filesToUpload').setInputFiles(filePaths)
    await page.waitForTimeout(5000)
    
    // Extract filenames (only filenames, not paths)
    const expectedFilenames = filePaths.map(path => path.split('/').pop());

    const uploadedFilenames = await page.locator('#fileList li').allTextContents();
    console.log('Uploaded Filenames:', uploadedFilenames);

    //  Assert filenames are displayed correctly
    expect(uploadedFilenames).toEqual(expectedFilenames);

})
})

  