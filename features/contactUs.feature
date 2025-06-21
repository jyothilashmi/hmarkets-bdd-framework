
# Note: Since this project runs in production, CAPTCHA is enabled and cannot be bypassed.
# Hence, form submission tests will not complete successfully.

Feature: Contact Us Form Submission

  Background:
    Given Navigate to the Contact Us page
    @smoke
  Scenario: Submit contact us form with valid details
    When user fill the contact form with valid details
    And user submit the contact form
    Then user should see a confirmation message or redirection

  Scenario: Submit contact us form with empty required fields
    When user submit the contact form without filling anything
    Then user should see validation errors for required fields

  Scenario: Submit contact us form with invalid email
    When user fill the contact form with invalid email
    And user submit the contact form
    Then user should see an error message for the email field

  Scenario: Submit contact us form with max character length in message
    When user fill the contact form with a message exceeding 1000 characters
    And user submit the contact form
    Then user should see a message length error or form should reject it

