Feature: MT Demo Account Registration Form

  Background:
    Given user open the MT Demo Account registration page

  Scenario: Submit MT4 demo form with valid details 
    When user selects MT4 option 
    And user fill the demo form with valid information
    And user submit the demo form
    Then user should be getting successful message on demo form submission

Scenario: Submit MT5 demo form with valid details 
    When user selects MT5 option
    And user fill the demo form with valid information
    And user submit the demo form
    Then user should be getting successful message on demo form submission
 
Scenario: Submit demo form with invalid email
    When user fill the demo form with invalid email
    And user submit the demo form
    Then user should see an email validation error

  Scenario: Submit demo form with empty required fields
    When user submit the demo form without entering any information
    Then user should see required field validation errors

  Scenario: Country dropdown should contain United Arab Emirates
    Then the country dropdown should include "United Arab Emirates"

  Scenario: Phone field should accept only numeric input
    When user enter non-numeric text into the phone field
    Then user should see a phone number validation error
