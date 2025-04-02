const { test, expect } = require('@playwright/test'); //importing test and expect 2 packages from the playright/test module 

test('Handling Textbox, Radio Button and Check boxes', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form'); //method used to open the URL

    // Textbox Handling: First Name and Last Name
    const firstNameInput = await page.locator('#firstName'); 
    const lastNameInput = await page.locator('#lastName');

    const firstName = 'John';
    const lastName = 'Doe';

    await firstNameInput.fill(firstName); //Enters the specified firstName into the textbox.
    await lastNameInput.fill(lastName); //Enters the specified lastName into the textbox.
    //Asserts that the value of the input field matches the entered text. inputValue() gets the current value.
    expect(await firstNameInput.inputValue()).toBe(firstName); 
    expect(await lastNameInput.inputValue()).toBe(lastName);
    console.log(`Textbox test passed: First Name '${firstName}' and Last Name '${lastName}' filled and verified.`);

    // Radio Button Handling: Gender
    const maleRadio = await page.locator('#gender-radio-1'); //Locates the "Male" radio button by its ID.
    const maleRadioLabel = await page.locator('label[for="gender-radio-1"]'); //Locates the label associated with the radio button

    await maleRadioLabel.click(); // Clicks the label to select the radio button.
    expect(await maleRadio.isChecked()).toBe(true); //Asserts that the radio button is checked. isChecked() returns a boolean.
    console.log("Radio button test passed: 'Male' gender selected and verified.");

    // Checkbox Handling: Hobbies
    const hobbySportsCheckbox = await page.locator('#hobbies-checkbox-1'); //Locates the "Sports" hobby checkbox by its ID.
    const hobbyReadingCheckbox = await page.locator('#hobbies-checkbox-2');
    const hobbySportsLabel = await page.locator('label[for="hobbies-checkbox-1"]'); //Locates the label associated with the checkbox.
    const hobbyReadingLabel = await page.locator('label[for="hobbies-checkbox-2"]');

    await hobbySportsLabel.click(); //Clicks the label to toggle the checkbox state.
    expect(await hobbySportsCheckbox.isChecked()).toBe(true); //Asserts that the checkbox is checked.
    console.log("Checkbox test passed: 'Sports' hobby selected and verified.");

    await hobbyReadingLabel.click();
    expect(await hobbyReadingCheckbox.isChecked()).toBe(true);
    console.log("Checkbox test passed: 'Reading' hobby selected and verified.");
})



test('Dropdown Actions', async ({ page }) => {

  await page.goto('https://demoqa.com/select-menu');
    const oldSelectMenu = page.locator('#oldSelectMenu');

    // Selecting by visible text
  await oldSelectMenu.selectOption('Blue');
  await expect(oldSelectMenu).toHaveValue('1');  // Blue has value '1'
  console.log("Dropdown test passed: 'Blue' selected and verified.");

  // Selecting by value
  await oldSelectMenu.selectOption({ value: '4' });
  await expect(oldSelectMenu).toHaveValue('4');  // Purple has value '4'
  console.log("Dropdown test passed: 'Purple' selected and verified.");

  // Selecting by index
  await oldSelectMenu.selectOption({ index: 2 });  
  await expect(oldSelectMenu).toHaveValue('2');  // Green has value '2'
  console.log("Dropdown test passed: 'Green' selected and verified.");

});



test('Mouse Click Actions', async ({ page }) => {

    await page.goto('https://demoqa.com/buttons');
    await page.waitForLoadState('domcontentloaded'); //Waits until the DOM is fully loaded before interacting.

   // Simple Click
   const clickMeButton = page.getByRole('button', { name: 'Click Me', exact: true }); //finds the exact text 'Click Me'
   await clickMeButton.click();
   await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
   console.log('Simple click performed and verified.');
 
   // Double Click
   const doubleClickButton = page.locator('#doubleClickBtn'); 
   await doubleClickButton.dblclick(); //performs double click
   await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
   console.log('Double click performed and verified.');
 
   // Right Click
   const rightClickButton = page.locator('#rightClickBtn');
   await rightClickButton.click({ button: 'right' }); //performs right click
   await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');
   console.log('Right click performed and verified.');
 });



test('Type Characters', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  const fullNameInput = page.locator('#userName');
  const emailInput = page.locator('#userEmail');
  const currentAddressInput = page.locator('#currentAddress');
  const permanentAddressInput = page.locator('#permanentAddress');
  const submitButton = page.locator('#submit');

  const fullName = 'John Doe';
  const email = 'john.doe@example.com';
  const currentAddress = '123 Main St';
  const permanentAddress = 'Same as current address';

  await fullNameInput.type(fullName);
  await emailInput.type(email);
  await currentAddressInput.type(currentAddress);
  await permanentAddressInput.type(permanentAddress);
  await submitButton.click();

  await expect(page.locator('#name')).toHaveText(`Name:${fullName}`);
  await expect(page.locator('#email')).toHaveText(`Email:${email}`);
  console.log('Typed characters and submitted form.');
});



test('Keys and Shortcuts', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  const currentAddressInput = page.locator('#currentAddress');
  const permanentAddressInput = page.locator('#permanentAddress');
  const emailInput = page.locator('#userEmail');

  const currentAddress = 'This is my current address.';
  await currentAddressInput.type(currentAddress);

  // Simulate Ctrl+A (Select All) and Ctrl+C (Copy)
  await currentAddressInput.press('Control+A');
  await currentAddressInput.press('Control+C');

  // Move focus to the permanent address field
  await permanentAddressInput.focus();

  // Simulate Ctrl+V (Paste)
  await permanentAddressInput.press('Control+V');

  await expect(permanentAddressInput).toHaveValue(currentAddress);
  console.log('Used keyboard shortcuts (Ctrl+A, Ctrl+C, Ctrl+V).');

  // Simulate Tab key for navigation
  await page.locator('#userName').focus();
  await page.press('#userName', 'Tab');
  await expect(emailInput).toBeFocused();
  console.log('Used Tab key for navigation.');
});



test('Focus Element', async ({ page }) => {
    
  await page.goto('https://demoqa.com/text-box');

  const fullNameInput = page.locator('#userName');
  const emailInput = page.locator('#userEmail');

  await fullNameInput.focus();
  await expect(fullNameInput).toBeFocused();
  console.log('Focused on the Full Name input field.');

  await emailInput.focus();
  await expect(emailInput).toBeFocused();
  console.log('Focused on the Email input field.');
});



test('Drag and Drop', async ({ page }) => {
  await page.goto('https://jqueryui.com/droppable/');
  
  // The draggable and droppable elements are inside an iframe, so we need to select the iframe first
  const frame = page.frameLocator('iframe.demo-frame'); //allow enter the inframe and allow select elements inside the  iframe

  // Locate the draggable and droppable elements inside the iframe
  const draggable = frame.locator('#draggable');
  const droppable = frame.locator('#droppable');

  // Perform the drag-and-drop action
  await draggable.dragTo(droppable); //draging from source to target

  // Verify the text change after dropping
  await expect(droppable).toHaveText('Dropped!');
});



test('Dragging Manually (Observing)', async ({ page }) => {
  await page.goto('https://jqueryui.com/droppable/');

  // Switch to the iframe containing the drag-and-drop elements
  const frame = page.frameLocator('iframe.demo-frame');

  // Locate draggable and droppable elements inside the iframe
  const draggable = frame.locator('#draggable');
  const droppable = frame.locator('#droppable');

  // Get bounding boxes for precise dragging
  const dragBox = await draggable.boundingBox(); //Gets the element's position and dimensions.
  const dropBox = await droppable.boundingBox();

  if (!dragBox || !dropBox) {
    throw new Error('Draggable or droppable element not found.');
  }

  // Perform manual drag-and-drop using mouse events
  await page.mouse.move(dragBox.x + dragBox.width / 2, dragBox.y + dragBox.height / 2);//moves to the center of x and y position
  await page.mouse.down(); //pressing the left mouse button
  await page.mouse.move(dropBox.x + dropBox.width / 2, dropBox.y + dropBox.height / 2, { steps: 10 }); //Breaks the movement into 10 small steps,
  await page.mouse.up(); //releasing the left mouse button

  // Verify that the drop action was successful
  await expect(droppable).toHaveText('Dropped!');
});



test('Scrolling', async ({ page }) => {
  await page.goto('https://demoqa.com/infinite-scroll');

  // Scroll to the bottom of the page multiple times to load more content
  for (let i = 0; i < 3; i++) { //scroll to the bottom 3 times
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000); // Wait for content to load
  }

  // Check if more list items have loaded
  const listItems = await page.locator('.vertical-list-container li');
  const itemCount = await listItems.count(); //returns the total number of elements in the locator
  console.log(`Scrolled down and found ${itemCount} list items.`); 

  // Scroll to a specific element (if needed)
  await page.goto('https://demoqa.com/dynamic-properties');
  const visibleAfterButton = page.locator('#visibleAfter');
  await visibleAfterButton.scrollIntoViewIfNeeded(); //scroll the page to make it visible
  await expect(visibleAfterButton).toBeVisible({ timeout: 10000 });
  console.log('Scrolled to a specific element and verified its visibility.');
});

