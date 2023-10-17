import ProductPage from "../../../PageObjects/AngularPracticePage/ProductPage";

describe('Product Page Tests', () => {
    beforeEach(() => {
       //cy.visit('https://rahulshettyacademy.com/angularpractice/')
       //after creating url as an environment variable in config.js
       cy.visit(Cypress.env('url'))
       
        cy.get('body > app-root > app-navbar > div > nav > ul > li:nth-child(2) > a').click()
    })
    it.skip("Test 1", () => {
        const productPage = new ProductPage();
        cy.fixture('example.json').then((fixtureData) => {
            //product name is an array
            fixtureData.productName.forEach((product) => {
                cy.AddProductToCart(product)

            })

            productPage.getCheckoutButtonMain().click() //reached the checkout view
            productPage.getCheckoutButtonInside().click()   //clcked the checkout button inside the checkout view,reached location page
            productPage.getLocationTextBox().type('A')
            cy.wait(7000)
            productPage.getLocationDiv().should('be.visible')
            productPage.getLocationDivElements().each(($locationName, index, $list) => {
                cy.log($locationName.text())
                if (($locationName).text() === fixtureData.location) {


                    cy.wrap($locationName).click({ force: true })
                }
            })
            productPage.getCheckBox().check({ force: true })
            //productPage.getAlertDiv().should('not.be.visible')
            productPage.getPurchaseButton().click()
            productPage.getAlertDiv().should('be.visible').should('include.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')

        })


    })
    //find sum
    it.only("Find Sum", () => {


        const productPage = new ProductPage();
        cy.fixture('example.json').then((fixtureData) => {
            //product name is an array
            fixtureData.productName.forEach((product) => {
                cy.AddProductToCart(product)

            })

            productPage.getCheckoutButtonMain().click() //reached the checkout view
            var sum = 0
            productPage.getAmountDivElements().each(($amountElement, index, $list) => {
                var amountDivText = $amountElement.text()
                cy.log('Amount Div text:', amountDivText)
                var amountIntegers = amountDivText.split(" ")
                var amount = amountIntegers[1]
                amount = amount.trim()
                amount = Number(amount)
                sum = sum + amount

            }).then(() => {
                    //check if the same sum is appeared on the screen
                    productPage.getSumDiv()
                        .then((sumDiv) => {
                            var sumDivText = sumDiv.text()
                            cy.log('sumDivText', sumDivText)
                            var totalSumIntegers=sumDivText.split(" ")
                            var totalSumAmount=totalSumIntegers[1].trim()
                            totalSumAmount=Number(totalSumAmount)
                            cy.log('Total Sum Amount',totalSumAmount)
                            expect(totalSumAmount).to.equal(sum)
                            
                        })
                })
        })
    })
})