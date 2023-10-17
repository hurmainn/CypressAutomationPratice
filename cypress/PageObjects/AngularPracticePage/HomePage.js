export class HomePage {
    getNameTextBox() {
        return cy.xpath('/html/body/app-root/form-comp/div/form/div[1]/input');
    }

    getGenderSelector() {
        return cy.xpath('/html/body/app-root/form-comp/div/form/div[5]/select');
    }

    getTwoWayBindingTextBox() {
        return cy.xpath('/html/body/app-root/form-comp/div/h4/input');
    }

    getEntrepreneurRadioButton() {
        return cy.xpath('/html/body/app-root/form-comp/div/form/div[6]/div[3]/input');
    }

    getShopTab() {
        return cy.xpath('/html/body/app-root/app-navbar/div/nav/ul/li[2]/a');
    }
}

export default HomePage;

