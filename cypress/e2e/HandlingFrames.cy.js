import 'cypress-iframe'

describe("Handling Frames", () => {
    it('Handle Frame Test 1', () => {

        //cypress doesn't give screenshots for frame within the fram
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //use id of frame inside the frame loaded function
        cy.frameLoaded('#courses-iframe')
        //switch to iframe, then find locators
        cy.iframe().xpath('/html/body/div/header/div[3]/div/div/div[2]/nav/div[2]/ul/li[5]/a').as('Mentorship')
        cy.get('@Mentorship').click()


    })

    it.only('Count the mentorship programs inside the frame', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //use id of frame inside the frame loaded function
        cy.frameLoaded('#courses-iframe')
        //switch to iframe, then find locators
        cy.iframe('#courses-iframe').should('be.visible')
            .xpath('/html/body/div/header/div[3]/div/div/div[2]/nav/div[2]/ul/li[5]/a').as('Mentorship')
            .click()
        cy.wait(6000)
        // cy.iframe().should('contain','The academy is led')
        // cy.iframe('#courses-iframe').url().should('equal','https://rahulshettyacademy.com/mentorship')
        //cy.xpath('/html/body/div[1]/div[2]/div/div[1]/div[2]').should('be.visible')
        //   cy.iframe('#courses-iframe').should('be.visible').within(()=>{
        //     cy.xpath('/html/body/div[1]/div[2]/div/div[1]/div[2]',{timeout:10000}).should('be.visible');
        //   })
     
        cy.iframe('#courses-iframe')
        .should('be.visible')
        .xpath('/html/body/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/div/h1').should('have.length', 1)
    })
})