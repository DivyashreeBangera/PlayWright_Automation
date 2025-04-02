const { test, expect } = require('@playwright/test');

test('Assertions Demo', async ({ page }) => {
  // Navigate to the DemoQA Elements page
  await page.goto('https://demoqa.com/text-box');

  // Locate the full name input field and type a name
  const nameInput = page.locator('#userName');
  await nameInput.fill('John Doe');

  // Assert that the input field contains the typed text
  await expect(nameInput).toHaveValue('John Doe');

  // Locate and click the submit button
  await page.locator('#submit').click();

  // Assertion: Check if the output is visible
  const outputBox = page.locator('#output');
  await expect(outputBox).toBeVisible();

  // Assertion: Check if output contains the correct text
  const nameOutput = page.locator('#name');
  await expect(nameOutput).toHaveText('Name:John Doe');

  // Assertion: Check if the URL contains "text-box" after form submission
  await expect(page).toHaveURL(/text-box/);

  // Assertion: Check if the submit button is enabled
  const submitButton = page.locator('#submit');
  await expect(submitButton).toBeEnabled();

  console.log('All assertions passed!');
});


test('Handle Frames in Playwright', async ({ page }) => {
    // Navigate to the DemoQA frames page
    await page.goto('https://demoqa.com/frames');
  
    // Switch to the first frame using frameLocator()
    const frame = page.frameLocator('#frame1'); //command to interact eith iframe
  
    // Locate and extract text from an element inside the iframe
    const heading = frame.locator('#sampleHeading');
    await expect(heading).toBeVisible(); // Verify visibility
    const text = await heading.textContent();
  
    console.log('Text inside the frame:', text);
    expect(text).toContain('This is a sample page');
  });


  test('Handle Web Table in Playwright', async ({ page }) => {
    // Navigate to the DemoQA Web Tables page
    await page.goto('https://demoqa.com/webtables');
  
    // Locate the table rows
    const rows = page.locator('.rt-tbody .rt-tr-group');
  
    // Get the total row count
    const rowCount = await rows.count();
    console.log('Total Rows:', rowCount);
  
    // Loop through table rows and extract text
    for (let i = 0; i < rowCount; i++) {
      const rowText = await rows.nth(i).textContent(); //selects ith row and gets the textcontent of that row 
      console.log(`Row ${i + 1}:`, rowText);
  
      // Check if the row contains "Cierra" (Example Name)
      if (rowText.includes('Cierra')) {
        console.log('Found Cierra in row:', i + 1);
  
        // Click the Edit button in that row
        await rows.nth(i).locator('[title="Edit"]').click(); //Selects the element with title="Edit"
        console.log('Edit button clicked for Cierra');
        break; //Exits the loop after finding and clicking on "Cierra"
      }
    }
  
    // Assertion: Ensure the edit modal appears
    await expect(page.locator('.modal-content')).toBeVisible();
  });


  test('Handle Date Picker in Playwright', async ({ page }) => {
    // Navigate to the DemoQA Date Picker page
    await page.goto('https://demoqa.com/date-picker');
  
    // Locate and click the date input field to open the calendar
    const dateInput = page.locator('#datePickerMonthYearInput');
    await dateInput.click();
  
    // Select a specific month and year
    await page.locator('.react-datepicker__month-select').selectOption('5'); // June (0-based index)
    await page.locator('.react-datepicker__year-select').selectOption('2025'); // Select 2025
  
    // Click on the specific date (e.g., 15th)
    await page.locator('.react-datepicker__day--015').click();
  
    // Verify the selected date
    await expect(dateInput).toHaveValue('06/15/2025'); // MM/DD/YYYY format
  
    console.log('Date successfully selected and verified.');
  });