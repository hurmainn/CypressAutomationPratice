Feature: End to end Ecommerce Validation

    Scenario: Filling the form to shop
        Given I open Ecommerce Page
        When I fill the form details
        Then Validate the form behavior
        And Select the  Shop Page
