Feature: Live Account Pre-Registration Form Testing

  Background:
    Given user navigate to the live account pre-registration page

  Scenario: Submit pre-registration form with valid details for personal account
    When user selects personal account pre-registration form 
    And user fill the personal account pre-registration form with valid details
    And user submit the form
    Then user should be redirected to the next step or see a success confirmation

Scenario: Submit pre-registration form with valid details for corporate account
    When user selects corporate account pre-registration form 
    And user fill the corporate account pre-registration form with valid details
    And user submit the form
    Then user should be redirected to the next step or see a success confirmation
  Scenario: Submit form with all fields empty
    When user submit the form without entering any data
    Then user should see validation errors for all required fields

  Scenario: Submit form with invalid email format
    When user fill the email field with invalid email and press enter
    Then user should see an invalid email format error

  Scenario: Submit form with phone number containing letters
    When user enter letters in the phone number field of live form and press enter
    And user submit the form
    Then user should see a phone number validation error in live form
  Scenario: Enter maximum allowed characters in the name field
    When user enter more than 50 characters in the first name field and press enter
    Then user should see a character limit validation error