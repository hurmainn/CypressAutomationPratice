const { expect } = require("chai")

describe('Handling Mouse Hovers', () => {
    beforeEach(() => {
       
    })

    //invoke('show) method
    it('Test 1 by invoke method', () => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
         cy.xpath('/html/body/div[4]/div/fieldset/div/div').as('MouseHoverContent')
        cy.get('@MouseHoverContent').invoke('show')  //first we shown the hover, then we will look for its options
        cy.xpath('/html/body/div[4]/div/fieldset/div/div/a[1]').as('Top')
        cy.get('@Top').click()
        //assert by checking url, because we saw that on clicking top the url changes
        cy.url().should('equal', 'https://rahulshettyacademy.com/AutomationPractice/#top')


    })

    //force click method checks for all the hidden elements too
    it('Test 2 by force click method', () => {
        cy.xpath('/html/body/div[4]/div/fieldset/div/div').as('MouseHoverContent')
        cy.xpath('/html/body/div[4]/div/fieldset/div/div/a[1]').as('Top')
        cy.get('@Top').click({force:true})
        //assert by checking url, because we saw that on clicking top the url changes
        cy.url().should('equal', 'https://rahulshettyacademy.com/AutomationPractice/#top')

    })

   
})