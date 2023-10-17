const neatCSV = require('neat-csv')
describe("JWT SESSION", () => {
    var productName=''
    //added command for the login call in coommands \.js under support folder
    it('logging in through local storage', () => {
        //we dont use then for inbuilt cypress cmmands like visit contaisnetc, but as we are using our own built commands that's why we need to resolve them first
        cy.LogInAPI().then(function () {
            cy.visit("https://rahulshettyacademy.com/client",
                {
                    onBeforeLoad: function (window) {
                        // cy.log(Cypress.env('token'))
                        //we will store the key value pair as setItem
                        //we got the value from env variable as a respons ein commands.js
                        //we stored the token as token in commands.js
                        window.localStorage.setItem('token', Cypress.env('token'))
                    }
                    //this will excute before hitting the visit url

                })
        })
        //after logging in complete the procedure of placing an order:


        cy.get('button.btn.w-10').as('AddToCartButton')
        cy.get('@AddToCartButton').eq(1).click();
        cy.get('.card-body b').eq(1).then(function (name) {
            productName = name.text()
            cy.log('product name:' + productName)
        })

        cy.xpath('/html/body/app-root/app-dashboard/app-sidebar/nav/ul/li[4]/button').as('CartButton')
        cy.get('@CartButton').click()
        cy.xpath('/html/body/app-root/app-profile/div/div[3]/ul/li[3]/button').as('CheckoutButton')
        cy.get('@CheckoutButton').click()
        cy.xpath('/html/body/app-root/app-order/section/div/div/div[2]/div/div/div[3]/div[2]/div[2]/div/div[1]/div/input').as('countryTextBox')
        cy.get('@countryTextBox').type('India')
        cy.wait(3000)

        // cy.get('button.ta-item').each(($countryElement, index, $list) => {
        //     const countryName = $countryElement.text()

        //     if (countryName.includes(" India")) {


        //         cy.wrap($countryElement).click()
        //     }
        // })
        cy.get('body > app-root > app-order > section > div > div > div.col-md-7 > div > div > div.payment__info > div.payment__shipping > div.details__user > div > div.user__address > div > section').invoke("show")
        cy.xpath('/html/body/app-root/app-order/section/div/div/div[2]/div/div/div[3]/div[2]/div[2]/div/div[1]/div/section/button[2]').click()
        cy.xpath('/html/body/app-root/app-order/section/div/div/div[2]/div/div/div[3]/div[2]/div[2]/div/div[2]/a').as('PlaceOrderButton')
        cy.get('@PlaceOrderButton').click({ force: true })
        cy.wait(3000)
        cy.get('tbody .order-summary tr:nth-child(4) button').as('DownloadinCSVbutton')
        cy.get('@DownloadinCSVbutton').click() //downloaded csv
        // downloaded csv will be stored in cypress->downlaods folder

        // validate csv file then after reaching confirmation page
        // passing the csv using pli=uginand validating
        // add plugin neat csv in package .json first and download with npm install so that new dependiecnies are downloaded
        // import in this project, pass teh file as text format then
        // javasciprt object
        // project path
        // readFile yeilds text as promise, store that promise and then
        // cy.readFile("cypress/downloads/order-invoice_hurmain.javed.csv")  
        // using file server folder
        //  store the product name to use later
         
        cy.readFile(Cypress.config("fileServerFolder") + "\\cypress\\downloads\\order-invoice_hurmain.javed.csv")
            .then(async function (text) {
               
                const csv = await neatCSV(text)
                //async and await come together
                //check what the csv exactly holds
                cy.log(csv)
                console.log(csv)    //to see how the object is stored, object details will be shown in console

                //now access the object from your code
                //as it is an array 
                cy.log("Address:" + csv[0].Address)  //Address can be accessed like this because there is no space but Product Name has space so it can't be accessed like that
                cy.log("Product Name: " + csv[0]["Product Name"])
                //compare the product name if the same name is stored in the csv file
                const CSVProductName = csv[0]["Product Name"]
                expect(CSVProductName).to.eq(productName)
            })



    })


})




