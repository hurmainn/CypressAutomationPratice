import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../../../PageObjects/AngularPracticePage/ProductPage";
import HomePage from "../../../PageObjects/AngularPracticePage/HomePage";

const productPage = new ProductPage();
const homePage = new HomePage();
// let name=dataTable.rawTable[1][0]
// let gender=dataTable.rawTable[1][1]
Given('I open Ecommerce Page', () => {
    cy.visit(Cypress.env('url'))    //url in config.js
})
When('I add items to cart', () => {
    homePage.getShopTab().click()
    cy.fixture('example.json').then((fixtureData) => {
        //product name is an array
        fixtureData.productName.forEach((product) => {
            cy.AddProductToCart(product)

        })
    })
})

Then('select the country, submit and verify the success message', () => {

    productPage.getCheckoutButtonMain().click() //reached the checkout view
    productPage.getCheckoutButtonInside().click()   //clcked the checkout button inside the checkout view,reached location page
    productPage.getLocationTextBox().type('A')
    cy.wait(7000)
    productPage.getLocationDiv().should('be.visible')
    productPage.getLocationDivElements().each(($locationName, index, $list) => {
        cy.log($locationName.text())
        cy.fixture('example.json').then((fixtureData) => {
            if (($locationName).text() === fixtureData.location) {
                cy.wrap($locationName).click({ force: true })
            }
        })

    })
    productPage.getCheckBox().check({ force: true })
    //productPage.getAlertDiv().should('not.be.visible')
    productPage.getPurchaseButton().click()
    productPage.getAlertDiv().should('be.visible').should('include.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')

})

//second scenario
When('I fill the form details', (dataTable) => {
    // cy.fixture('example.json').then((fixtureData) => {
    //     homePage.getNameTextBox().type(fixtureData.name)
    //     homePage.getGenderSelector().select(fixtureData.gender)
    // })
    homePage.getNameTextBox().type(dataTable.rawTable[1][0])
    homePage.getGenderSelector().select(dataTable.rawTable[1][1])

})
When('Validate the form behavior', (dataTable) => {
    // cy.fixture('example.json').then((fixtureData) => {
    //     homePage.getTwoWayBindingTextBox().should('have.value', fixtureData.name)
    //     homePage.getEntrepreneurRadioButton().should('be.disabled')
    // })
    //convert the data table to array by.rawTable method - that converts your databale into multi dimensional array
    homePage.getTwoWayBindingTextBox().should('have.value',dataTable.rawTable[1][0] )   //1st row , 0th index contains name
    homePage.getEntrepreneurRadioButton().should('be.disabled')
})
Then('Select the Shop Page', () => {
    homePage.getShopTab().click()
})