// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("AddProductToCart", (productName) => {
    cy.get('app-card-list').find('app-card')
        .each(($productcard, index, $list) => {
            const productNameText = $productcard.text()
            //  cy.log(productName)
            if (productNameText.includes(productName)) {
                cy.log('Product found: ', productNameText)

                cy.get('app-card-list').find('app-card').eq(index)
                    .find('button')
                    .click()
            }
        })

})


//for api test token
//login and set the tiken in env variable
Cypress.Commands.add("LogInAPI", () => {
    cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login", {
        userEmail: "hurmain.javed@folium.ai", userPassword: "#Hurmain1234"
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('token', response.body.token)
       //cy.log(response.body.token)
    })
})