const { expect } = require("chai")

describe("Handling Web Tables", () => {
    beforeEach(() => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    })
    it("Test if the price for a course equals what we want", () => {
        //will use each method to iterate through the table first
        //create locator for the table on your own, cypress wouldn't do that for you

        /*we are going to test that a column has the required value against the other clumn
        First we will get all columns by generating css selector
         tag name and then nth child : 
         tr td:nth-child(2)
         First column was instructor so we got the second child that is course, we want to terate through cpourses
         we can generate the css selector using chropath or cypress test runner cy.get()
         i first checked by writing the selector there, it gave me the required column, so i am proceeding*/

        //select column
        cy.get('table[name="courses"] tr td:nth-child(2)')
            .each(($course, index, $list) => {
                //we need to check for the jmeter course on the 5th row
                const courseName = $course.text()
                if (courseName.includes('JMETER')) {
                    /*THEN WE HAVE TO CHECK PRICE I.E THE NEXT COLUMN TO IT/ ITS SIBLING , WILL USE NEXT FUNCTION,
                    NEXT FUNCTION IS NOT APPLICABLE TO TEXT
                    we are on the index that we need to be on, so we will fin the element by index to apply next function */
                    cy.get('table[name="courses"] tr td:nth-child(2)').eq(index).next().then(function (price) {
                        const pricetext = price.text();
                        expect(pricetext).to.equal('25')
                    })

                    /*again need text for the next column, to apply text, we used then function
                    .next().text() Won't work, so we have to use then after next to resolve the promise*/

                }
            }) //iterate



    })


})
describe.only("WEB TABLE 2", () => {
    beforeEach(() => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    })
    //test to check if Dwayne belongs to Kolkata or not
    it("Test 1", () => {
        /* locator:
        the second table didn't have nay unique attribute, so checking its parents like legend or div then will find the table inside the parent using parent-child chaining
        or by using spaces after the parent like
               // cy.get('.tableFixHead table tr td:nth-child(1)')*/

        cy.get('.tableFixHead').find('table tr td:nth-child(1)')
            .each(($name, index, $list) => {
                const personName = $name.text()
                if (personName.includes('Ivory')) {
                    console.log(personName)
                    console.log(index)
                    // const city= $name.next().next()  //we know city is in third column i.e next to next to the first columnn
                    // const cityname=city.text()  //error: city.text( is not a function) - non-cypress command
                    //we need to get the locator again with the index of the one found
                    cy.get('.tableFixHead table tr td:nth-child(1)')
                        .eq(index).next().next().should('have.text', 'Chennai')    //then move toards the sibling i.e city
                    // .then(function (city) {
                    //     const cityname = city.text()       //now city.text() is a function because we have resolved the promise by then
                    //     expect(cityname).to.equal('Chennai')


                    // })          //using  then because we want to get text() and next().text() is not a function
                }
            })
    })

    it.only('Calculating sum of amounts', () => {
        var sum = 0;
        cy.get('.tableFixHead table tr td:nth-child(4)')
            .each(($amountElement, index, list) => {
                var amount = $amountElement.text()
                cy.log(amount)
                sum = Number(sum) + Number(amount)

            }).then(() => {
                cy.log('Total Amount: ', sum)
                expect(sum).to.equal(296)
            }
            )
        //expect(sum).to.equal('296')

        //this will return 0 because of javascript asynchronus
        // cy.log('Total Amount: ', sum)


    })
})