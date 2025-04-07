class ForaLoginPage {
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

        this.addclient= page.getByRole('button', { name: 'Add Client' })

        this.addclientheader=page.locator("//h3[text()='Add a new client']");
        this.firstnamelabel=page.getByLabel('First name')
        this.middlenamelabel=page.getByLabel('Middle name')
        this.lastnamelabel=page.getByLabel('Last name')
        this.preferrednamelabel=page.getByLabel('Preferred name')
        this.addnewclientbutton=page.getByRole('button', { name: 'Add new client' })
        this.firstnameerrorMessage = page.locator("span.mt-px").nth(0);
        this.lastnameerrorMessage = page.locator("span.mt-px").nth(1);

        this.firstNameInput = page.locator('#first_name')
        this.middleNameInput = page.locator('#middle_name');
        this.lastNameInput = page.locator('#last_name');
        this.preferredNameInput = page.locator('#preferred_name');

        this.closeButton = page.locator('[data-testid="close-modal"]')

        this.clientname = page.locator('h1.text-left')

        this.backtoclients=page.getByText('Back to Clients')

        this.searchbutton=page.getByPlaceholder('Search by names')

        this.clickfirstresult=page.locator('a[href^="/clients/"]').first();

        this.creditcard=page.locator('button:text("Credit Cards")')
        this.creditcardheader=page.locator('h3:text("Credit Cards")')
        this.addcard=page.locator('button:text("Add Card")');
        this.addclientscardheader=page.locator('//div[contains(text(), "Securely add client’s credit card")]');
        this.copyLinkText = page.locator('text="Copy this link and send to clients"');
        this.cardEntryLink = page.locator('text="Card entry link"');
        this.expirationMessage = page.locator('text="Link will expire in 48 hours"');
        this.copyLinkButton = page.locator('text="Copy Link"');
        this.enterManuallyLink = page.locator('text="Enter manually"');
        this.linkParagraph = page.locator('p.border.rounded-xl.overflow-hidden.text-ellipsis');
        this.creditcloseButton = page.locator('text="Close"');
        this.copiedLinkButton = page.locator('text="Copied"');

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
        this.cardNumberInput = page.locator('input[name="cardNumber"]');
        this.expiringDateInput = page.locator('input[name="expiringDate"]');
        this.cvcInput = page.locator('input[name="Data"]');
        this.cardHolderInput = page.locator('input[name="cardHolder"]');
        this.nicknameInput = page.locator('input[placeholder="Enter card label"]');
        this.countryInput = page.locator('#country_id');
        this.address=page.locator('#address')
        this.additionaladdress=page.locator('#address_additional')
        this.city=page.locator('#city')
        this.state=page.locator('#state')
        this.zipcode=page.locator('#postal_code')

        //
        this.cardsuccessMessage=page.locator('div:text("Successfully added credit card")')
        this.cardsecurelyadded=page.locator('div:text("Your card is securely added to the credit card section")')
        this.gotit=page.locator('button:text("Got it")')

        this.threedot=page.locator('button >> svg >> xpath=//*[name()="circle"]').first()
        this.deleteclient=page.getByRole('button', { name: 'Delete Client' })

        //verying fields in the delete client
        this.deleteheader =page.getByRole('heading', { name: 'Delete Client' })
        this.confirmationtext=page.locator('div', {hasText: 'Are you sure you want to delete client, xyz 123? This action is permanent.'})
        this.cancelbutton=page.getByRole('button', { name: 'No, keep client' })
        this.okbutton=page.locator('button', { hasText: 'Yes, delete client' })

        this.nosearchresults=page.locator('h3', { hasText: 'No clients found' })
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

    async managebutton(){
        return this.page.getByText("Manage").click()
        //locator(".text-mediumFS16.font-medium").click()
    }

    async clientbutton(){
        return this.clientsButton.click({ force: true });
       //return this.page.getByText("Clients").click()
        
    }

    async validateClientsPage(){
    return this.clientsheader.textContent()
    }

    async addclientbutton(){
    return this.addclient.click()
    }

    async clickaddnewclientbutton(){
    return this.addnewclientbutton.click()
    }

    async fillingaddnewclient(firstname, middlename, lastname, preferredname){
    await this.firstNameInput.fill(firstname)
    await this.middleNameInput.fill(middlename)
    await this.lastNameInput.fill(lastname)
    await this.preferredNameInput.fill(preferredname)
    }

    async clickclosebutton(){
        return this.closeButton.click()
        }


    async clickbacktoclients(){
            return this.backtoclients.click()
            }
    async searchclient(searchname){
            return this.searchbutton.fill(searchname)
            }
    async clickfirstsearchresult(){
        await this.clickfirstresult.waitFor({ state: "visible" })
        return this.clickfirstresult.click()
                }
async clickcreditcards(){
 return this.creditcard.click({ force: true })
}

async clickaddcard(){
return this.addcard.click()
} 

async clickcopylink(){
await this.copyLinkButton.click()
}   
async clickentermanually(){
 await this.enterManuallyLink.click()
}

async clickgobacklink(){
return this.goBackButton.click()
}

async clicksaveandadd(){
return this.saveAndAddButton.click()
}

async fillcarddetails(cardnumber, expiringDate, CVC, Cardholder,nickname,Address, Apt, City, State,zipcode){
await this.cardNumberInput.fill(cardnumber)
await this.expiringDateInput.fill(expiringDate)
await this.cvcInput.fill(CVC)
await this.cardHolderInput.fill(Cardholder)
await this.nicknameInput.fill(nickname)
await this.address.fill(Address)
await this.additionaladdress.fill(Apt)
await this.city.fill(City)
await this.state.fill(State)
await this.zipcode.fill(zipcode)
}

async clickcreditclosebutton(){
return this.creditcardcloseButton.click()
}

async clickgotitbutton(){
return this.gotit.click()
}

async clickthreedotitbutton(){
return this.threedot.click()
}

async clickdeleteclientbutton(){
return this.deleteclient.click()
}

async clicknokeepclientbutton(){
return this.cancelbutton.click()
 }

async clickyesdeleteclientbutton(){
return this.okbutton.click()
}

}


module.exports = { ForaLoginPage};
