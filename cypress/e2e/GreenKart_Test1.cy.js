/// <reference types="Cypress"/>

describe('My First Test Suite', () => {


    it('My First Test Case', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        //cy.get('.product:visible').should('have.length',4)
        // cy.xpath('//*[@id="root"]/div/div[1]/div/div[1]')
        //.should('have.length',4)
        cy.xpath('//*[@id="root"]/div/div[1]/div/*')
            .should('have.length', 4)
        //find method 
        cy.xpath('//*[@id="root"]/div/div[1]/div').find('.product').should('have.length', 4)

        // to click on add to cart for the second element
        cy.xpath('//*[@id="root"]/div/div[1]/div').find('.product')     //got the 4 elements here
            .eq(2)              //will give the second elemeng
            .contains('ADD TO CART')        //Will search for the particular text inside contains
            .click()
        //will fine ADD TO CART only from the second element, because we have reduced the scope by using get and find, we are not finfding from the whole page

    })

    it('Testing using Each Method', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        //Each method
        //4 products returned
        cy.xpath('//*[@id="root"]/div/div[1]/div').find('.product').each(($e1, index, $list) => {          //iterating through each
            //want to click add to cart for the one containing cashews
            //first check if e1 contains the element with cashews text

            const VegName = $e1.find("h4.product-name").text() //gets the product name div and returns the text in that
            cy.log(VegName)
            // $e1.find("h4.product-name").should('have.text','cashews')

            if (VegName.includes('Cashews')) {
                cy.wrap($e1).find('button').click()      //tag is button, there might be multiple buttons, but we are iterating through the products list and have the check for only cashews, so it wil return the add to cart button of cashews only

                //we can't click without wrapping the element
            }

        });
    })

    it("Understanding cypress commands vs jquery methods", () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.xpath('/html/body/div[1]/div/header/div/div[1]')
            .then((logoElement) => {
                cy.log(logoElement.text())
            })

    })

    it("Use of Alias", () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        //helps in dealing when we have to select the same element multiple times
        //like we want to search again and again by typing in the search input box, we will give an alias to the search text box like
        cy.xpath('/html/body/div[1]/div/header/div/div[2]/form/input').as('searchTextBox');
        cy.xpath('/html/body/div[1]/div/header/div/div[2]/form/button').as('searchButton');
        //Now whenever i have to write something in the search text box, i won't have to copy the full xpath insted use it like this:
        cy.get('@searchTextBox').type('c')
        cy.get('@searchButton').click()

        cy.get('@searchTextBox').type('a')
        cy.get('@searchButton').click()

        cy.get('@searchTextBox').type('b')
        cy.get('@searchButton').click()

        cy.get('@searchTextBox').type('k')
        cy.get('@searchButton').click()

        cy.get('@searchTextBox').type('f')
        cy.get('@searchButton').click()

        cy.get('@searchTextBox').type('g')
        cy.get('@searchButton').click()

        cy.get('@searchTextBox').type('m')
        cy.get('@searchButton').click()

        cy.get('@searchTextBox').type('n')
        cy.get('@searchButton').click()


    })

    it('Assertion Test', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
       // cy.xpath('/html/body/div[1]/div/header/div/div[1]').as('logoElement')
        cy.get('@logoElement').should('have.text', 'GREENKART')  //checks complete string
        cy.get('@logoElement').should('include.text', 'GREEN')  //checks for substring

    })

    it.only('Case Insensitive test', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.xpath('/html/body/div[1]/div/header/div/div[1]').as('logoElement')
        cy.get('@logoElement').should(($element) => {
            const actualText = $element.text().toLowerCase(); // Convert actual text to lowercase
            const expectedText = 'greenkart'.toLowerCase(); // Convert expected text to lowercase
          
            expect(actualText).to.include(expectedText);
          });
          
    })
})
