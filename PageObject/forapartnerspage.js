class ForaPartnersPage {
    constructor(page) { //initialize the object
        this.page = page;
        this.signin= page.getByText("Sign in here.")
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]')
        this.errorMessage = page.locator('.my-1 text-sm text-error');
        this.successMessage = page.locator('.font-medium text-headerFS24 text-primary')
        this.clientsheader = page.locator("h1.font-medium.text-headerFS24.text-primary")
        this.clientsButton = page.locator("span.flex-grow.truncate").filter({ hasText: "Clients" }).nth(1)


        this.clientname = page.locator('h1.text-left')

        this.searchbutton=page.getByPlaceholder('Search by names')

        this.clickfirstresult=page.locator('a[href^="/clients/"]').first();


        this.goBackButton = page.locator('span:text("Go back")')
        this.addPaymentCardHeader = page.locator('div:text("Add payment card")')
        this.vaultText = page.locator('div:text("All items are safely and securely stored within vault")');
        this.cardInfoText = page.locator('span:text("Card information")');
        this.cardholderLabel = page.locator('label:text("Cardholder name")');
        this.cardLabel = page.locator('label:text("Card label (optional)")');
        this.billingAddress = page.locator('div:text("Billing Address")');
        this.countryLabel = page.locator('label:text("Country or region")');
        this.addressLabel = page.locator('label:text("Address")');
        this.cityLabel = page.locator('label:text("City")');
        this.stateLabel = page.locator('label:text("State")');
        this.zipCodeLabel = page.locator('label:text("Zip code (postcode)")');
        this.creditcardcloseButton = page.locator('button:text("Close")');
        this.saveAndAddButton = page.locator('button:text("Save and add")');

        // Validating error messages when clicked on 'Save and Add' without filling mandatory fields
        this.cardnumbererrorMessage = page.locator('div.text-error', { hasText: 'Card number is required.' })
        this.expiryErrorMessage = page.locator('div:text("Expiring date is required.")');
        this.cvcErrorMessage = page.locator('div:text("CVC is required.")');
        this.cardholderfieldRequiredError = page.locator('div:text("This field is required.")');

        //Enter valid details in the required fields and click the "Save and add" button
        this.cardIframe = page.frameLocator('#tx_iframe_card-tokenex-element');
        this.cvcIframe = page.frameLocator('#tx_iframe_cvv-tokenex-element');
        this.cardNumberInput = this.cardIframe.locator('input[name="cardNumber"]');
        this.expiringDateInput = page.locator('input[name="expiringDate"]');
        this.cvcInput = this.cvcIframe.locator('input[placeholder="CVC"]');
        this.cardHolderInput = page.locator('input[name="cardHolder"]');
        this.nicknameInput = page.locator('input[placeholder="Enter card label"]');
        this.countryInput = page.locator('#country_id');
        this.address=page.locator('#address')
        this.additionaladdress=page.locator('#address_additional')
        this.city=page.locator('#city')
        this.state=page.locator('#state')
        this.zipcode=page.locator('#postal_code')

         }

    async goto() {
        await this.page.goto('https://advisor.forastaging.net/');
    }

    async login(username, password) {
        await this.signin.click()
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return this.errorMessage.innerText();
    }

    async getsuccessMessage() {
        return this.successMessage.innerText();
    }

    async bookbutton() {
        return this.page.locator('a[href^="/partners/hotels"]').click();
    }

    async searchclienticon(){
    this.hotelsSearchButton = this.page.locator('[data-testid="hotels-search-button"]');
    return this.hotelsSearchButton.click()
    }

    async selectCheckInAndOut() {
    this.dateInput = this.page.locator('[data-test-id="search-input-when"]');           
    await this.dateInput.click({ force: true }); // Open the date picker

    await this.page.getByRole('button', { name: 'Tuesday, April 15th, 2025' }).click();
    await this.page.getByRole('button', { name: 'Sunday, April 20th, 2025' }).click();
     }


    async clickhotelname(){
        this.hotelName = this.page.locator('text=The Roxy Hotel New York');
        return this.hotelName.click(); 
    }

    async clickhotelRateCard(){
        this.priceLocator = this.page.locator('div.text-medium.font-medium.whitespace-nowrap').first();
        return this.priceLocator.click(); 
    }

    async clickScrolltobook(){
        this.scrollToBookBtn = this.page.locator('button#scrollToBook');
        return this.scrollToBookBtn.click(); 
    }

    async clickcontinue(){
        this.continueBtn = this.page.locator('button.btn-primary', { hasText: 'Continue' });
    return this.continueBtn.click()
    }

    async selectClientName(clientinput) {
        this.clientInput = this.page.getByPlaceholder('Select a client');    
        await this.clientInput.fill(clientinput);
        await this.clientInput.click() // simulate Enter key
    }

    async clickselectedclientname(){
        this.selectedclient=this.page.getByText('BdTKlZD5ht test 7R0jEPnfAI (new)')
    return this.selectedclient.click()
    }

    async clickaddcard(){
        this.addcard=this.page.getByText('Add card')
    return this.addcard.click()
    }


async fillcarddetails(cardnumber, expiringDate, CVC, Cardholder,nickname,Address, Apt, City, State,zipcode){
await this.cardNumberInput.waitFor({ state: 'visible' });

//await this.cardNumberInput.scrollIntoViewIfNeeded();
await this.cardNumberInput.click({ force: true });
//await this.cardNumberInput.fill(''); // Clear first
//await this.cardNumberInput.type(cardnumber, { delay: 100 });
//await this.cardNumberInput.fill(cardnumber);

//*************for firefox
//await this.cardNumberInput.fill(''); // Clear input
await this.page.waitForTimeout(500);
for (const digit of cardnumber) {
    await this.cardNumberInput.type(digit, { delay: 200 });
    await this.page.waitForTimeout(200); // Slow typing
}
//await this.cardNumberInput.click()
//await this.page.waitForTimeout(100);
//await this.cardNumberInput.type(cardnumber, { delay: 200 });
//await this.cardNumberInput.fill(cardnumber);
await this.expiringDateInput.click()
await this.expiringDateInput.fill(expiringDate)
await this.cvcInput.waitFor({ state: 'visible' });

await this.cvcInput.fill(CVC);
await this.cardHolderInput.fill(Cardholder)
await this.nicknameInput.fill(nickname)
await this.address.fill(Address)
await this.additionaladdress.fill(Apt)
await this.city.fill(City)
await this.state.fill(State)
await this.zipcode.fill(zipcode)
}

async clicksaveandadd(){
    return this.saveAndAddButton.click()
    }

async clickcard(nickname) {
 this.selectcard = this.page.locator(`label:has-text("${nickname}") input[type="radio"]`);
return this.selectcard.first().check();
}

async completebooking(){
    this.completebook=this.page.getByRole('button', { name: 'Complete Booking' })
    await this.completebook.scrollIntoViewIfNeeded();
return this.completebook.click()
}

async clickviewbooking(){
    this.viewbooking=this.page.locator('div.btn-primary', { hasText: 'View Bookings' })
return this.viewbooking.click()
}

async clientbutton(){
    return this.clientsButton.click({ force: true });
   //return this.page.getByText("Clients").click()
    
}

async searchclient(clientname){
    return this.searchbutton.fill(clientname)
    }

async clickfirstsearchresult(){
await this.clickfirstresult.waitFor({ state: "visible" })
return this.clickfirstresult.click()
        }

async clickbookingHyperlink(){
    this.bookingHyperlink=this.page.locator('a.text-link:has-text("Bookings")')
return this.bookingHyperlink.click()
}


}

module.exports = { ForaPartnersPage};
