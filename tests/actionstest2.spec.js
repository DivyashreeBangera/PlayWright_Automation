const { test, expect } = require('@playwright/test');

test('Dropdown Actions', async ({ page }) => {

  await page.goto('https://demoqa.com/select-menu');
    const oldSelectMenu = page.locator('#oldSelectMenu');
    await oldSelectMenu.selectOption('Blue');
    await oldSelectMenu.selectOption({ value: '4' });
    await oldSelectMenu.selectOption({ index: 2 });
});

test.skip('Mouse Click Actions', async ({ page }) => {

    await page.goto('https://demoqa.com/buttons');
    await page.waitForLoadState('domcontentloaded');

   // Simple Click
   const clickMeButton = page.getByRole('button', { name: 'Click Me', exact: true });
await clickMeButton.click();
   await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
   console.log('Simple click performed and verified.');
 
   // Double Click
   const doubleClickButton = page.locator('#doubleClickBtn');
   await doubleClickButton.dblclick();
   await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
   console.log('Double click performed and verified.');
 
   // Right Click
   const rightClickButton = page.locator('#rightClickBtn');
   await rightClickButton.click({ button: 'right' });
   await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');
   console.log('Right click performed and verified.');
 });


test.skip('Type Characters', async ({ page }) => {
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

test.skip('Keys and Shortcuts', async ({ page }) => {
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

test.skip('Focus Element', async ({ page }) => {
    
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

test.skip('Drag and Drop', async ({ page }) => {
  await page.goto('https://jqueryui.com/droppable/');

  
  // The draggable and droppable elements are inside an iframe, so we need to select the iframe first
  const frame = page.frameLocator('iframe.demo-frame'); //allow enter the inframe and allow select elements inside the  iframe

  // Locate the draggable and droppable elements inside the iframe
  const draggable = frame.locator('#draggable');
  const droppable = frame.locator('#droppable');

  // Perform the drag-and-drop action
  await draggable.dragTo(droppable);

  // Verify the text change after dropping
  await expect(droppable).toHaveText('Dropped!');
});

test.skip('Dragging Manually (Observing)', async ({ page }) => {
  await page.goto('https://jqueryui.com/droppable/');

  // Switch to the iframe containing the drag-and-drop elements
  const frame = page.frameLocator('iframe.demo-frame');

  // Locate draggable and droppable elements inside the iframe
  const draggable = frame.locator('#draggable');
  const droppable = frame.locator('#droppable');

  // Get bounding boxes for precise dragging
  const dragBox = await draggable.boundingBox();
  const dropBox = await droppable.boundingBox();

  if (!dragBox || !dropBox) {
    throw new Error('Draggable or droppable element not found.');
  }

  // Perform manual drag-and-drop using mouse events
  await page.mouse.move(dragBox.x + dragBox.width / 2, dragBox.y + dragBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(dropBox.x + dropBox.width / 2, dropBox.y + dropBox.height / 2, { steps: 10 });
  await page.mouse.up();

  // Verify that the drop action was successful
  await expect(droppable).toHaveText('Dropped!');
});

test.skip('Scrolling', async ({ page }) => {
  await page.goto('https://demoqa.com/infinite-scroll');

  // Scroll to the bottom of the page multiple times to load more content
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000); // Wait for content to load
  }

  // Check if more list items have loaded
  const listItems = await page.locator('.vertical-list-container li');
  const itemCount = await listItems.count();
  console.log(`Scrolled down and found ${itemCount} list items.`);

  // Scroll to a specific element (if needed)
  await page.goto('https://demoqa.com/dynamic-properties');
  const visibleAfterButton = page.locator('#visibleAfter');
  await visibleAfterButton.scrollIntoViewIfNeeded();
  await expect(visibleAfterButton).toBeVisible({ timeout: 10000 });
  console.log('Scrolled to a specific element and verified its visibility.');
});

