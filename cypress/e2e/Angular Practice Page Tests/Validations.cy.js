describe('Validations', () => {
   
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
    })

    it("Validation Test 1", () => {
        //check if the same text appears in the second box too 
        cy.xpath('/html/body/app-root/form-comp/div/form/div[1]/input').as('NameInputTextBox')
        cy.xpath('/html/body/app-root/form-comp/div/form/div[5]/select').as('Gender')
        cy.fixture('example.json').then((fixtureData) => {
            cy.get('@NameInputTextBox')
                .type(fixtureData.name)
            cy.get('@Gender')
                .select(fixtureData.gender)

            cy.xpath('/html/body/app-root/form-comp/div/h4/input').as('SecondTextBox')
            cy.get('@SecondTextBox')
                .should('have.value', fixtureData.name)
        })
    })

    it("Validation Test 2", () => {
        //check if min length property for the name text box is 2

        cy.xpath('/html/body/app-root/form-comp/div/form/div[1]/input').as('nameTextBox')
        cy.get('@nameTextBox').should('have.attr', 'minlength', '2')
    })

    it.only('Validate Radio buttton is disabled', () => {
        cy.xpath('/html/body/app-root/form-comp/div/form/div[6]/div[3]/input').as('DisabledRB')
        cy.get('@DisabledRB').should('be.disabled')
        //set radio button to be able
        cy.get('@DisabledRB')
            .should('have.attr', 'disabled')
        cy.get('@DisabledRB')
            .invoke('removeAttr', 'disabled')    //enables the button
        cy.get('@DisabledRB')
            .should('be.enabled')
    })
})