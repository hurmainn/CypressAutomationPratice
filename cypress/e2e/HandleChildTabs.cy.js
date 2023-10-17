describe("Handle Child Tabs", ()=>{
   beforeEach(()=>{
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
   }) 
   it("Remove target",()=>{
       cy.xpath('/html/body/div[2]/div[2]/fieldset/a').as('openTab')
    //    cy.get('@openTab')
    //    .click()      //moves to next tab
    //    cy.get('@openTab')
       .invoke('removeAttr','target') //removes the target attribute
       .click()         //will open the link in the sme tab
    })

    it.only("Cross domain issue",()=>{
        cy.xpath('/html/body/div[2]/div[2]/fieldset/a').as('openTab')
        .invoke('removeAttr','target')
        .click()        //moved to the next website in the same tab

        //now can't access the elements of that websote becaue domain changed we swietched from the domain of rahuk shetty academy to qa click
        // CYPRESS DOESN'T SUPPORT CROSS DOMAIN
        //cy.xpath('/html/body/header/div[3]/div/div/div[1]/nav/div/ul/li[4]/a').click()    //error

        //.ORIGIN
        //all the operations to be performed on origin should be inside this method, outside this method exists the previous domain
        // cy.origin('https://www.qaclickacademy.com/',()=>{
        //     cy.xpath('/html/body/header/div[3]/div/div/div[1]/nav/div/ul/li[4]/a').click()
        //     cy.should('contain.text','Welcome to')
        // })

        //it still failed because of security issues
    })
})