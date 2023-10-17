//security tests by mocking http responses
describe('Mock http requests', () => {
    it("Test 1", () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');

        //  cy.intercept(method, url, rputeHndler)
        //the details are captured in req then; url the method etc
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) => {
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=Hurmain"   //modify request
                req.continue((resp) => {
                    //now with the modified request, the reposne should generate an error message as the user is unaithorized now
                   // expect(resp.statusCode).to.equal(403)   //403 error is for unauthorized
                })  //this method will hit the server with modifed request
                //resp object contais the response
            }
        ).as("dummyUrl")
       
        //we only intercepted, we still need to click the button  to make the req call happen
        cy.xpath('/html/body/app-root/app-landingpage/div/button').click()
        cy.wait('@dummyUrl')
    })
})