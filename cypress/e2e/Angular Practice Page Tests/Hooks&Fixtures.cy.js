describe('Practicing Hooks & Fixtures on Angular Practice page', () => {

    //once before all test blocks
    // before(() => {
    //     let data;
    //     //store the data from fixture file
    //     cy.fixture('example.json').then((fixtureData) => {
    //         // You can work with the loaded fixture data here
    //         // For example, you can make assertions using the loaded data
    //         this.data=fixtureData
    //       });
    // })
    //before every test block
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
    })
    it("Without Fixture", () => {
        cy.xpath('/html/body/app-root/form-comp/div/form/div[1]/input').as('NameInputTextBox')
        cy.get('@NameInputTextBox')
            .type('Hurmain Javaid')
        cy.xpath('/html/body/app-root/form-comp/div/form/div[5]/select').as('Gender')
        cy.get('@Gender')
            .select('Female')
    })

    it("With Fixtures", () => {
        cy.xpath('/html/body/app-root/form-comp/div/form/div[1]/input').as('NameInputTextBox')
        cy.xpath('/html/body/app-root/form-comp/div/form/div[5]/select').as('Gender')
        cy.fixture('example.json').then((fixtureData) => {
            cy.get('@NameInputTextBox')
            .type(fixtureData.name)
            cy.get('@Gender')
                .select(fixtureData.gender)
        })
    })
})