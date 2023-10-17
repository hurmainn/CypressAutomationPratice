describe('Page Reload',()=>{
    //on rahul shetty academy practice page
    it('Page Reload Test 1',()=>{
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.xpath('/html/body/div[4]/div/fieldset/div/div/a[2]').as('Reload')
       
        // mark our window object to "know" when it gets reloaded
        cy.window().then(w => w.beforeReload = true)
        // initially the new property is there
        cy.window().should('have.prop', 'beforeReload', true)
        cy.get('@Reload').click({force:true})
        // after reload the property should be gone
        cy.window().should('not.have.prop', 'beforeReload')


    })

    })
