/*checkbox option 1 = cbo1
 dropdown click = dropdown
 Dynamic dropdown type= dynamicDropDownInputBox
 */

const { expect } = require("chai")

describe("Practice Page Tests", () => {
    beforeEach(() => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    })
    //checkboxes
    it("Handling Checkboxes", () => {
        cy.xpath('/html/body/div[1]/div[4]/fieldset/label[1]/input').as('cbo1')
        //check by then
        cy.get('@cbo1').check().then((cbo1) => {
            cy.wrap(cbo1).should('be.checked').and('have.value', 'option1')
        })
        //check simply
        cy.get('@cbo1').should('be.checked').and('have.value', 'option1')

        //uncheck
        // cy.get('@cbo1').uncheck().should('be.checked')   //will fail because we have unchecked it
        cy.get('@cbo1').uncheck().should('not.be.checked')

        //multiple checkboxes
        cy.get('input[type="checkbox"]').check().should('be.checked')   //checks all
        cy.log("Checked all")

        cy.get('input[type="checkbox"]').uncheck()
        cy.log("unchecked all")

        //check selective by giving value attribute inside check
        cy.get('input[type="checkbox"]').check(['option1', 'option3']).should('be.checked')
        cy.log("checked option 1 and option 3")
        cy.get('input[type="checkbox"]').uncheck()  //uncheck all

        //by parent child chaining (myself)
        cy.log("checking by parent-child chaining")
        cy.xpath('//*[@id="checkbox-example"]/fieldset').find('input[type="checkbox"]').each(($checkboxElement, index, $list) => {
            cy.wrap($checkboxElement).check()
        })


    })
    //dropdowns
    it('Handling static dropdowns', () => {
        //select method
        //by option name/value
        cy.xpath('/html/body/div[1]/div[3]/fieldset/select').as('dropdown')
        cy.get('@dropdown').select('option1')
            .should('have.value', 'option1')

    })

    it('Handling dynamic dropdowns', () => {
        cy.xpath('/html/body/div[1]/div[2]/fieldset/input').as('dynamicDropDownInputBox')
        cy.get('@dynamicDropDownInputBox').type('ba')
        //parent child chaining
        cy.xpath('/html/body/ul').find('.ui-menu-item div')    //will give all the children (suggestions on typing ba)
            .each(($cityName, index, $list) => {
                cy.log($cityName.text())
                if ($cityName.text() === 'Azerbaijan') {
                    cy.wrap($cityName).click()
                }
            })
        //$cityname stores the div that contains the city name
        //$cityname.text() will give the text in that div
        //forgot to use text function, so it was not working, using cy.log helped me to know that i am not getting the text, i am getting the clkass, that's why it was not coming equal and not being clicked

    })

    it('Handling visibilty and invisibilty', () => {
        cy.xpath('/html/body/div[3]/div[2]/fieldset[1]/input[3]').as('HideShowExampleBox')
        cy.xpath('/html/body/div[3]/div[2]/fieldset[1]/input[1]').as('HideButton')
        cy.xpath('/html/body/div[3]/div[2]/fieldset[1]/input[2]').as('ShowButton')

        cy.get('@HideShowExampleBox').should('be.visible')

        cy.get('@HideButton').click()
        cy.get('@HideShowExampleBox').should('not.be.visible')

        cy.get('@ShowButton').click()
        cy.get('@HideShowExampleBox').should('be.visible')

    })


    //popups/alerts
    it.only("Handling pop-ups", () => {

        
        //alert button
        cy.xpath('/html/body/div[2]/div[3]/fieldset/input[2]').as('AlertButton')
        cy.get('@AlertButton').click()
        //confirm button
        cy.xpath('/html/body/div[2]/div[3]/fieldset/input[3]').as('ConfirmButton')
        cy.get('@ConfirmButton').click()

        //cy.on method / event handling
        //window:  alert triggers the event, then the response i.e the string is stored in str, we can now perform operations on the str
        cy.on('window:alert', (str) => {
            //console.log('Alert message',str)

            //str.should('eq', 'Hello , share this practice page and share your knowledge');

            console.log('Alert message', str)
            expect(str).to.contain('Hello')
            expect(true).to.be.true
        })


        cy.on('window:confirm', (stru) => {
            expect(stru).to.equal('Hello , Are you sure you want to confirm?');
        })
    })

    //expect assertion not working
    it("Expect method",()=>{
        const str='hello'
        expect(str).to.equal('hello')
        expect(str).to.contain('h')
        cy.xpath('/html/body/div[2]/div[3]/fieldset/input[2]').as('AlertButton')
        cy.get('@AlertButton').should('contain.text','a')
    })
})