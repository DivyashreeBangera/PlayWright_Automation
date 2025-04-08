const { test: base , expect } = require('@playwright/test');
const {ForaPartnersPage} = require('../PageObject/forapartnerspage')


// Define custom fixture
const customTest = base.extend({
    ForauserData: async ({}, use) => {
        const user = { username: "reenaz+user5710@team899982.testinator.com", password: "Qaoncloud@01", successmessage:"Welcome, reenaz5710!",
             WrongUser: "wrong Username", WrongPass: "Wrong Password", ErrorMessage: "Unable to log in with provided credentials.",
            Clientheader: "Clients", clientname:"new 7R0jEPnfAI",
        cardnumber:"4242424242424242", expiringDate:"12/25", CVC:"123", Cardholder:"Tester", nickname:"test", Address:"123 Main St", Apt:"Apt 4B", City:"Metropolis", State:"NY", zipcode:"10001"};
        await use(user);  // Provides user credentials to test cases
    }
});

customTest.describe('Fora Partners page Tests', () => {

    let ForapartnersPage;
   
// **Run tests in sequence**
customTest.describe.configure({ timeout: 180000, mode: 'serial' });

    customTest.beforeEach(async ({ page, ForauserData }) => {
        ForapartnersPage = new ForaPartnersPage(page);
        await ForapartnersPage.goto();
        await ForapartnersPage.login(ForauserData.username, ForauserData.password);
    });

    customTest('Fora Partners page', async ({ page, ForauserData }) => {

    //Click the Book field

    await ForapartnersPage.bookbutton()
        await page.waitForTimeout(2000);

    //Click on the search icon
    await ForapartnersPage.searchclienticon()

    //Select the check-in date & check-out date from the ""When"" field
    await ForapartnersPage.selectCheckInAndOut()
    
    //Click on any hotel card from the hotel list page
    await ForapartnersPage.clickhotelname()

    //Click on any hotel rate card from the list.
    await ForapartnersPage.clickhotelRateCard()

    //Click on the ""Scroll to Book"" button.
    await ForapartnersPage.clickScrolltobook()

    //Click on the ""Continue"" button at the bottom of the side panel.
    await ForapartnersPage.clickcontinue()

    //Select a client from the ""Client name"" dropdown.
    await ForapartnersPage.selectClientName(ForauserData.clientname) //click search box
    await ForapartnersPage.clickselectedclientname() //select search result

    //Click on add card
    await ForapartnersPage.clickaddcard() 
    await ForapartnersPage.fillcarddetails(ForauserData.cardnumber, ForauserData.expiringDate, ForauserData.CVC, ForauserData.Cardholder,ForauserData.nickname,ForauserData.Address,ForauserData.Apt,ForauserData.City, ForauserData.State, ForauserData.zipcode)
    await ForapartnersPage.clicksaveandadd()

    //Click on newly added payment card in the ""Payment cards"" section.
    await ForapartnersPage.clickcard(ForauserData.nickname) 

    //Click on the ""Complete Booking" button
    await ForapartnersPage.completebooking()
    await page.waitForTimeout(2000);

    //click on view bookings
    await ForapartnersPage.clickviewbooking()
    await page.waitForTimeout(2000);

    //Click on the "Clients" tab.
    await ForapartnersPage.clientbutton()

    //Search that particular client name just now booked and click on the client
    await ForapartnersPage.searchclient(ForauserData.clientname)
    await ForapartnersPage.clickfirstsearchresult() //Click client name

    //Click on the no of Bookings hyperlink
    await ForapartnersPage.clickbookingHyperlink()
    })
})





