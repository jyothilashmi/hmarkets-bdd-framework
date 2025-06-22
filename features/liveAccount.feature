# Since the registration is in production from email verification in client portal it is not automated.
Feature: Live Account Registration Form Testing

  Background:
    Given user navigate to the live account pre-registration page
@regression
  Scenario: Submit registration form with valid details for personal account
    When user selects personal account pre-registration form 
    And user fill the personal account pre-registration form with valid details
    And user submit the form
    Then user should be redirected to the next step or see a success confirmation
    And user fills in the personal details successfully
    Then user should be navigated to the Employment & Financial Information page  
    And user proceeds to the Confirm Account Registration step  
    Then user should be navigated to the Email Verification page  
   # And user uploads the KYC documents successfully  
  # And user completes the Hantec live account registration successfully

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