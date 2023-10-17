describe("API TESTING", () => {
    it("Api request repsonse test 1", () => {
        //first call the request method
        //cy.request(method, url, body);
        cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
            "name": "Learn Appium Automation with Java",
            "isbn": "bcd",
            "aisle": "227",
            "author": "John foe"
        }).then((response)=>{//checked from the output json
            expect(response.body).to.have.property('Msg', 'successfully added') // true
            expect(response.status).to.eq(200)
        })
    })
})