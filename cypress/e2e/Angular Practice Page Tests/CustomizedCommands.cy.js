describe('Customizing commands', () => {
    //based upon the text(product name), we have to add this to cart, so we need a common function to add products
    //will add multiple products too
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        //reach the shop page
        cy.xpath('/html/body/app-root/app-navbar/div/nav/ul/li[2]/a').click()
    })

    it('Test 1', () => {
        /*grab all texts using a locator then will iterate through the text to find our desired text to add to cart
        parent-child chaining, index to reach the add button within the same element
        the following code will find a specific product and add that to card, i.e function to add to cart
        so we can build customized command for that

        //add the code in commands.js with cypress.commands.add
            cy.get('app-card-list').find('app-card')
            .each(($productcard, index, $list) => {
                const productName = $productcard.text()
                //  cy.log(productName)
                if (productName.includes('Nokia Edge')) {
                    cy.log(productName)

                    cy.get('app-card-list').find('app-card').eq(index)
                        .find('button')
                        .click()
                }
            })

            */

        //will call the function(customized command) now for all the inputs
        cy.AddProductToCart('Nokia Edge')
        cy.AddProductToCart('Black').debug()


    })

    it("Iterate through multiple products using json file", () => {
        //now we want to add multiple products so we will use json file and create an array of the productname
        cy.fixture('example.json').then((fixtureData) => {
           //product name is an array
            fixtureData.productName.forEach((product)=>{
                cy.AddProductToCart(product)
            })
        })
    })

})