Feature: End to end Ecommerce Validation

    @Tag1
    Scenario: Ecommerce products delivery
        Given I open Ecommerce Page
        When I add items to cart
        Then select the country, submit and verify the success message

    @Tag2
    Scenario: Filling the form to shop
        Given I open Ecommerce Page
        When I fill the form details
            #getting values using datatables/pipelines rather than cy.fixture()
            #1st row index 0
            | name           | gender |
            #2nd row index 1
            | Hurmain Javaid | Female |
       And Validate the form behavior
            #1st row index 0
            | name           | gender |
            #2nd row index 1
            | Hurmain Javaid | Female |
        Then Select the Shop Page
