const excelToJson = require("convert-excel-to-json")


describe("Reading Excel Files", () => {
    var productName = ''
    //added command for the login call in coommands \.js under support folder
    it('Log in and read excel file', () => {
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
        cy.xpath('/html/body/app-root/app-thanksorder/body/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr[4]/button').as('DownloadinExcelbutton')
        cy.get('@DownloadinExcelbutton').click() //downloaded excel file

        //file downloaded in excel extension and stored in downloads folder
        //install "convert-excel to json" plugin: npm i convert-excel-to-json
        //now we can convert the file from excel to json and we kniw the use of json object

        //  copied code from https://www.npmjs.com/package/convert-excel-to-json
        const filePath = Cypress.config("fileServerFolder") + "\\cypress\\downloads\\order-invoice_hurmain.javed.xlsx"
       //will use task creeted in config.json here //first argument is the taskname and second is the argument you have to give

        cy.task('excelToJsonConverter', filePath).then(function (result) {
            cy.log(result)
            console.log(result)
            //result is a jaavascript object returned by the function
            //acces after viewing from the console that where i sthe data stores in the array
            //in the 0 th row the heaidng is stored
            cy.log("Order id A "+result.data[1].A)
            cy.log("Order Name B "+result.data[1].B)
            cy.log("Product name: "+productName)
            const ProductNameInExcelFile=result.data[1].B
            expect(productName).to.equal(ProductNameInExcelFile)
        })
        //just a npnesese comment
        
        //readFile checks
        cy.log("Checking if a particular text exists in a file")
        cy.readFile(filePath).then((text)=>{
            expect(text).to.include(productName)
        })


    })


})




