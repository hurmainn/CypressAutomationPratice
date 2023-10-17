class ProductPage {
    getCheckoutButtonMain() {
        return cy.get('#navbarResponsive > ul > li > a');
    }
    getCheckoutButtonInside() {
        return cy.xpath('/html/body/app-root/app-shop/div/div/div/table/tbody/tr[6]/td[5]/button')
    }
    getLocationTextBox() {
        return cy.get('#country')
    }
    getPurchaseButton() {
        return cy.get('body > app-root > app-shop > div > app-checkout > div > form > input')
    }
    getAlertDiv() {
        return cy.xpath('/html/body/app-root/app-shop/div/app-checkout/div[2]/div')
    }
    getCheckBox() {
        return cy.xpath('/html/body/app-root/app-shop/div/app-checkout/div/div[2]/input')
    }
    getLocationDiv() {
        return cy.get('body > app-root > app-shop > div > app-checkout > div:nth-child(3) > div.suggestions')
    }
    getLocationDivElements() {
        return cy.get('body > app-root > app-shop > div > app-checkout > div:nth-child(3) > div.suggestions ul li a')
    }
    getAmountDivElements() {
        return cy.get('tr td:nth-child(4) strong')
    }
    getSumDiv() {
        return cy.get('tr td:nth-child(5) strong')
    }
}
export default ProductPage;