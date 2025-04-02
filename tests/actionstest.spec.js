import { test, expect, chromium } from '@playwright/test';

test('Automate DemoQA Practice Form', async () => { // Rename the test function
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://demoqa.com/automation-practice-form'); //Navigates the page to the URL

    // Textbox Handling: First Name and Last Name
    const firstNameInput = await page.$('#firstName'); 
    const lastNameInput = await page.$('#lastName');

    const firstName = 'John';
    const lastName = 'Doe';

    await firstNameInput.fill(firstName); //Enters the specified firstName into the textbox.
    await lastNameInput.fill(lastName); //Enters the specified lastName into the textbox.
    //Asserts that the value of the input field matches the entered text. inputValue() gets the current value.
    expect(await firstNameInput.inputValue()).toBe(firstName); 
    expect(await lastNameInput.inputValue()).toBe(lastName);
    console.log(`Textbox test passed: First Name '${firstName}' and Last Name '${lastName}' filled and verified.`);

    // Radio Button Handling: Gender
    const maleRadio = await page.$('#gender-radio-1'); //Locates the "Male" radio button by its ID.
    const maleRadioLabel = await page.$('label[for="gender-radio-1"]'); //Locates the label associated with the radio button

    await maleRadioLabel.click(); // Clicks the label to select the radio button.
    expect(await maleRadio.isChecked()).toBe(true); //Asserts that the radio button is checked. isChecked() returns a boolean.
    console.log("Radio button test passed: 'Male' gender selected and verified.");

    // Checkbox Handling: Hobbies
    const hobbySportsCheckbox = await page.$('#hobbies-checkbox-1'); //Locates the "Sports" hobby checkbox by its ID.
    const hobbyReadingCheckbox = await page.$('#hobbies-checkbox-2');
    const hobbySportsLabel = await page.$('label[for="hobbies-checkbox-1"]'); //Locates the label associated with the checkbox.
    const hobbyReadingLabel = await page.$('label[for="hobbies-checkbox-2"]');

    await hobbySportsLabel.click(); //Clicks the label to toggle the checkbox state.
    expect(await hobbySportsCheckbox.isChecked()).toBe(true); //Asserts that the checkbox is checked.
    console.log("Checkbox test passed: 'Sports' hobby selected and verified.");

    await hobbyReadingLabel.click();
    expect(await hobbyReadingCheckbox.isChecked()).toBe(true);
    console.log("Checkbox test passed: 'Reading' hobby selected and verified.");


  } catch (error) {//This block handles potential errors during the test execution and ensures that the browser is closed even if an error occurs.
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }


})