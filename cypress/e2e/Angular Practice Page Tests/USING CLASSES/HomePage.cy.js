import HomePage from "../../../PageObjects/AngularPracticePage/HomePage"
beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/')
})
describe("Tests", () => {
    it("Test 1", () => {
        cy.fixture('example.json').then((fixtureData) => {
            const homePage = new HomePage();
            homePage.getNameTextBox().type(fixtureData.name)
            homePage.getGenderSelector().select(fixtureData.gender, { force: true })
        })
    })

    it("Validation", () => {
        cy.fixture('example.json').then((fixtureData) => {
            const homePage = new HomePage();
            homePage.getNameTextBox().type(fixtureData.name)
            homePage.getGenderSelector().select(fixtureData.gender)
            homePage.getTwoWayBindingTextBox().should('have.value', fixtureData.name)

            homePage.getEntrepreneurRadioButton().should('be.disabled')
        })
    })
})