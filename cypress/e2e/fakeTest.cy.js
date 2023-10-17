describe("Test Suite for http responses", () => {
    it("First Intercept Test", () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        // cy.intercept({requestObject}, {responseObject})
        //response and request as json objects, request object keeps an eye over the request call
        cy.intercept(
            {
                //request object - details from network tab
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
            },
            {
                //response object - we can mock the response, and can also send the defaukt response
                //we are setting mock response right now
                statusCode: 200,
                //from the response tab in network tab
                //mock data
                body: [{
                    "book_name": "RestAssured with Java",
                    "isbn": "LSA",
                    "aisle": "2303"
                }]
            }).as('bookRetrievals') //yeilds a promise that we store in bookRetrievals
        //virtual library button
        cy.xpath('/html/body/app-root/app-landingpage/div/button').click()
        //validating the integration between backend and ui
        cy.wait('@bookRetrievals').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length+1)  //+1 for row header
        })  //wait until the promise is resolved
        cy.xpath('/html/body/app-root/app-library-dashboard/p').should('have.text', 'Oops only 1 Book available')
    })
})