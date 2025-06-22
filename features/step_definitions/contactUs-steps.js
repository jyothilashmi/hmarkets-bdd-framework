import { Given, When, Then } from '@cucumber/cucumber';
import { contactUS } from '../../utils/config.js';
import ContactUsActions from '../../pages/actions/ContactUsActions.js';
import CommonActions from '../../pages/actions/CommonActions.js';
import dataUtil from '../../utils/dataUtil.js';
import { expect } from 'chai';
import { contactUSLocators }  from '../../pages/locators/ContactUsLocators.js';


let contactUsActions;
let commonActions;
Given('Navigate to the Contact Us page', async function () {
  try {

    contactUsActions = new ContactUsActions();
    commonActions= new CommonActions();
    const contactTitle = dataUtil.getTitles();
    await commonActions.navigateToPages(contactUS,contactTitle.contactUs);
  } catch (error) {
    console.error(" Error :: Navigate to the Contact Us page:", error);
    throw error;
  }
});

When('user fill the contact form with valid details', async function () {
  try {
    const user = dataUtil.getValidUser();
    await contactUsActions.fillContactForm(user);
  } catch (error) {
    console.error(" Error :: fill contact form with valid details:", error);
    throw error;
  }
});

When('user submit the contact form', async function () {
  try {
    await contactUsActions.submitForm();
  } catch (error) {
    console.error(" Error :: submit contact form:", error);
    throw error;
  }
});

Then('user should see a confirmation message or redirection', async function () {
  try {
    const message = await contactUsActions.getConfirmationMessage();
    expect(message).to.equal("Your submission was successful.");
  } catch (error) {
    console.error("Error :: confirmation message:", error);
    throw error;
  }
});

When('user submit the contact form without filling anything', async function () {
  try {
  await contactUsActions.submitForm();  
  } catch (error) {
    console.error(" Error :: submit empty form:", error);
    throw error;
  }
});

Then('user should see validation errors for required fields', async function () {
  try {
    const errors = await commonActions.getValidationErrors(contactUSLocators.contactUserrorMessages);
    expect(errors.length).to.be.equals(6);
    errors.forEach(errorMsg => {
      expect(errorMsg).to.match(/First name is required|Last name is required|Email is required|Country is required|Invalid phone number|Subject is required/i, `Unexpected validation message: "${errorMsg}"`);
    
    });

  } catch (error) {
    console.error("Error :: validation errors for required fields:", error);
    throw error;
  }
});


When('user fill the contact form with invalid email', async function () {
  try {
    const user = dataUtil.getInvalidUser();
    await contactUsActions.fillContactForm(user);
  } catch (error) {
    console.error(" Error :: fill form with invalid email:", error);
    throw error;
  }
});

Then('user should see an error message for the email field', async function () {
  try {
    const errors = await commonActions.getFieldErrorMessage(contactUSLocators.invalidEmail);
    expect(errors, 'Error message not found').to.be.a('string').and.to.contain('Invalid email');
  } catch (error) {
    console.error(" Error :: email validation error:", error);
    throw error;
  }
});

When('user fill the contact form with a message exceeding {int} characters', async function (maxLength) {
  try {
    const user = dataUtil.getValidUser();
    user.message = 'x'.repeat(maxLength + 1);
    await contactUsActions.fillContactForm(user);
    console.log("1000"+user.message)
  } catch (error) {
    console.error(" Error :: fill form with long message:", error);
    throw error;
  }
});

Then('user should see a message length error or form should reject it', async function () {
  try {
    const errors = await commonActions.getValidationErrors();
    const messageErrors = errors.filter(error => error.toLowerCase().includes('message'));
    expect(messageErrors.length).to.be.greaterThan(0);
  } catch (error) {
    console.error(" Error :: message length error:", error);
    throw error;
  }
});
