const { test: base , expect } = require('@playwright/test');
const {ForaLoginPage} = require('../PageObject/Foralogin')

// Define custom fixture
const customTest = base.extend({
    ForauserData: async ({}, use) => {
        const user = { username: "reenaz+user5710@team899982.testinator.com", password: "Qaoncloud@01", successmessage:"Welcome, reenaz5710!",
             WrongUser: "wrong Username", WrongPass: "Wrong Password", ErrorMessage: "Unable to log in with provided credentials.",
            Clientheader: "Clients",
            firstname:"Test6", middlename:"A", lastname:"Doe", preferredname:"Testingqa123458",
            creditcardheader: "Credit Cards",
        cardnumber:"4242424242424242", expiringDate:"12/25", CVC:"123", Cardholder:"Tester", nickname:"test", Address:"123 Main St", Apt:"Apt 4B", City:"Metropolis", State:"NY", zipcode:"10001"};
        await use(user);  // Provides user credentials to test cases
    }
});

customTest.describe('Fora Login Tests', () => {
    let Foraloginpage;
   
// **Run tests in sequence**
customTest.describe.configure({ mode: 'serial' });

    customTest.beforeEach(async ({ page, ForauserData }) => {
        Foraloginpage = new ForaLoginPage(page);
        await Foraloginpage.goto();
        await Foraloginpage.login(ForauserData.username, ForauserData.password);
    });

     /*customTest('Successful Login', async ({ page, ForauserData }) => {
        await Foraloginpage.goto();
        await Foraloginpage.login(ForauserData.username, ForauserData.password);
       // await expect(await Foraloginpage.getsuccessMessage()).toContain(ForauserData.successmessage);
        await expect(page).toHaveURL('https://advisor.forastaging.net/');
    });

      customTest('Invalid Login', async ({ page, ForauserData }) => {
        await Foraloginpage.login(ForauserData.WrongUser, ForauserData.WrongPass);
        await expect(await Foraloginpage.getErrorMessage()).toContain(ForauserData.ErrorMessage);
    });*/

    customTest('Click on the "Clients" tab from manage Tab', async ({ page, ForauserData }) => {
        //Click on the "Manage" tab 
        await Foraloginpage.managebutton()
        await page.waitForTimeout(2000);
        //Click on the "Clients" tab from manage Tab
        await Foraloginpage.clientbutton()
        await page.waitForTimeout(2000);
        //validating the client header in the clients page
        await expect(await Foraloginpage.validateClientsPage()).toContain(ForauserData.Clientheader);       
    
        //Click on the "add client" button
    await Foraloginpage.addclientbutton()
        await page.waitForTimeout(2000);

        //validating the fields in the add new client pop-up window
        await expect(Foraloginpage.addclientheader).toBeVisible(); 
        await expect(Foraloginpage.firstnamelabel).toBeVisible();  
        await expect(Foraloginpage.middlenamelabel).toBeVisible();  
        await expect(Foraloginpage.lastnamelabel).toBeVisible();  
        await expect(Foraloginpage.preferrednamelabel).toBeVisible();  
        await expect(Foraloginpage.addnewclientbutton).toBeVisible();  

        //validating close button
        await Foraloginpage.clickclosebutton()

        await Foraloginpage.addclientbutton()
        await page.waitForTimeout(2000);

        //validating error messages clicking 'add new button' without filling the mandatory fields
        await Foraloginpage.clickaddnewclientbutton()

        // First name and Last name fields should show validation error messages
        await expect(Foraloginpage.firstnameerrorMessage).toHaveText("First name is required");
        await expect(Foraloginpage.lastnameerrorMessage).toHaveText("Last name is required");

        //filling the fields 
        await Foraloginpage.fillingaddnewclient(ForauserData.firstname, ForauserData.middlename, ForauserData.lastname, ForauserData.preferredname);

        //click add new client (submit) button
        await Foraloginpage.clickaddnewclientbutton()
        await page.waitForTimeout(4000);


        //validating the client name after creation
        await expect(Foraloginpage.clientname).toContainText(`${ForauserData.preferredname} ${ForauserData.lastname}`)

        //Click on any one client in client list page.
        await Foraloginpage.clickbacktoclients() //clicking back button*/
        await Foraloginpage.searchclient(ForauserData.preferredname)//seaching by prefrerred client name
        await page.waitForTimeout(2000)
        await Foraloginpage.clickfirstsearchresult() //clicking first search result
        await page.waitForTimeout(2000);
    await expect(Foraloginpage.clientname).toContainText(`${ForauserData.preferredname} ${ForauserData.lastname}`)//validating the client name in the details page

        //Click on the "Credit Cards" tab on the client detail page
        await Foraloginpage.clickcreditcards()
        await page.waitForTimeout(2000);
        await expect(Foraloginpage.creditcardheader).toHaveText(ForauserData.creditcardheader);

        //Click the "Add Card" button.
        await Foraloginpage.clickaddcard()

        //validate the fields in the 'Add client's credit card
        await expect(Foraloginpage.addclientscardheader).toBeVisible();
        await expect(Foraloginpage.copyLinkText).toBeVisible();
        await expect(Foraloginpage.cardEntryLink).toBeVisible();
        await expect(Foraloginpage.expirationMessage).toBeVisible();
        await expect(Foraloginpage.copyLinkButton).toBeVisible();
        await expect(Foraloginpage.enterManuallyLink).toBeVisible();
        await expect(Foraloginpage.linkParagraph).toBeVisible();
        await expect(Foraloginpage.creditcloseButton).toBeVisible();

        //Click on the "Copy link" button.
        await Foraloginpage.clickcopylink()
        await expect(Foraloginpage.copiedLinkButton).toBeVisible(); //button should be changed to copied

        //Click on the "Add Card" button, then click on the "Enter manually" button.
        await Foraloginpage.clickentermanually()
        await page.waitForTimeout(2000);

        //validate fields in the 'Add payment card' page
        await expect(Foraloginpage.goBackButton).toBeVisible();
        await expect(Foraloginpage.addPaymentCardHeader).toBeVisible();
        await expect(Foraloginpage.vaultText).toBeVisible();
        await expect(Foraloginpage.cardInfoText).toBeVisible();
        await expect(Foraloginpage.cardholderLabel).toBeVisible();
        await expect(Foraloginpage.cardLabel).toBeVisible();
        await expect(Foraloginpage.billingAddress).toBeVisible();
        await expect(Foraloginpage.countryLabel).toBeVisible();
        await expect(Foraloginpage.addressLabel).toBeVisible();
        await expect(Foraloginpage.cityLabel).toBeVisible();
        await expect(Foraloginpage.stateLabel).toBeVisible();
        await expect(Foraloginpage.zipCodeLabel).toBeVisible();
        await expect(Foraloginpage.closeButton).toBeVisible();
        await expect(Foraloginpage.saveAndAddButton).toBeVisible();

        //validating close icon
     await Foraloginpage.clickclosebutton()
   await Foraloginpage.clickaddcard()
    await Foraloginpage.clickentermanually()


        // validate goback link
        await Foraloginpage.clickgobacklink()
       // await page.waitForTimeout(2000);
        await Foraloginpage.clickentermanually()
        //await page.waitForTimeout(2000);

        // Validating error messages when clicked on 'Save and Add' without filling mandatory fields
        await Foraloginpage.clicksaveandadd() //clicking save and add button
        await expect(Foraloginpage.cardnumbererrorMessage).toBeVisible();
        await expect(Foraloginpage.expiryErrorMessage).toBeVisible();
        await expect(Foraloginpage.cvcErrorMessage).toBeVisible();
        //await expect(Foraloginpage.cardholderfieldRequiredError).toBeVisible();
        await expect(Foraloginpage.cardholderfieldRequiredError.nth(0)).toBeVisible(); // Expiry
        await expect(Foraloginpage.cardholderfieldRequiredError.nth(1)).toBeVisible(); // CVC
        await expect(Foraloginpage.cardholderfieldRequiredError.nth(2)).toBeVisible(); // Cardholder

        //validating close button
        await Foraloginpage.clickcreditclosebutton()
        await expect(Foraloginpage.addcard).toBeVisible(); //verifying the add card button is visible 
        await Foraloginpage.clickaddcard()
        await page.waitForTimeout(2000);
        await Foraloginpage.clickentermanually()
        await page.waitForTimeout(2000);


        //Enter valid details in the required fields and click the "Save and add" button
        await Foraloginpage.fillcarddetails(ForauserData.cardnumber, ForauserData.expiringDate, ForauserData.cvc, ForauserData.Cardholder,ForauserData.nickname,ForauserData.Address,ForauserData.Apt,ForauserData.City, ForauserData.State, ForauserData.zipcode)
        await Foraloginpage.clicksaveandadd()

        //The credit card details should be saved successfully, with a confirmation message appearing
        await expect(Foraloginpage.cardsuccessMessage).toBeVisible();
        await expect(Foraloginpage.cardsecurelyadded).toBeVisible();
        await expect(Foraloginpage.gotit).toBeVisible();

        //Click the "Got it" button on the confirmation popup.
        await Foraloginpage.clickgotitbutton()

        //Click on the three-dot icon next to the client name on the client detail page.
        await Foraloginpage.clickthreedotitbutton()
        await expect(Foraloginpage.deleteclient).toBeVisible(); //A popup should appear with the option to "Delete Client."

        //click on "Delete Client."
        await Foraloginpage.clickdeleteclientbutton()
        await expect(Foraloginpage.deleteheader).toBeVisible(); //verifying the fields in the delete client 
        await expect(Foraloginpage.confirmationtext).toBeVisible();
        await expect(Foraloginpage.cancelbutton).toBeVisible();
        await expect(Foraloginpage.okbutton).toBeVisible();

        //Click on "No, keep client"
        await Foraloginpage.clicknokeepclientbutton()
        await expect(Foraloginpage.deleteheader).not.toBeVisible(); //pop up is not visible
        //await expect(Foraloginpage.clientname).toContainText(`${ForauserData.preferredname} ${ForauserData.lastname}`)//validating the The client is visible and not deleted.

       // Click on "Yes, delete client"
       await Foraloginpage.clickyesdeleteclientbutton()
       await page.waitForTimeout(3000);
       await expect(await Foraloginpage.validateClientsPage()).toContain(ForauserData.Clientheader); //verying the client is deleted and page is navigated to clients page
       await Foraloginpage.searchclient(ForauserData.preferredname)//seaching by DELETED client name
       await expect(Foraloginpage.deleteheader).not.toBeVisible(); //verying the no results found after searching the deleted client name
    });

})

