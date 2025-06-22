import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import LiveAccountActions from '../../pages/actions/LiveAccountActions.js';
import CommonActions from '../../pages/actions/CommonActions.js';
import dataUtil from '../../utils/dataUtil.js';
import { liveAccount } from '../../utils/config.js';
import { liveAccountRegistrationLocators } from '../../pages/locators/AccountRegistrationLocators.js';

let liveAccountActions;
let commonActions;

Given('user navigate to the live account pre-registration page', async function () {
  try {
    liveAccountActions = new LiveAccountActions();
    commonActions = new CommonActions();
    const expectedTitle = dataUtil.getTitles();
    await commonActions.navigateToPages(liveAccount, expectedTitle.liveAccount);
  } catch (error) {
    console.error('Error navigating to live account page:', error);
    throw error;
  }
});

When('user selects personal account pre-registration form', async function () {
  try {
    await liveAccountActions.selectAccount(liveAccountRegistrationLocators.btnPersonalAccount);
  } catch (error) {
    console.error('Error selecting personal account option:', error);
    throw error;
  }
});

When('user selects corporate account pre-registration form', async function () {
  try {
    await liveAccountActions.selectAccount(liveAccountRegistrationLocators.btnCorporateAccount);
  } catch (error) {
    console.error('Error selecting corporate account option:', error);
    throw error;
  }
});

When('user fill the personal account pre-registration form with valid details', async function () {
  try {
    const personalData = dataUtil.getValidPersonalAccountData();
    const firstname=dataUtil.generate7CharAlpha();
    const lastname=dataUtil.generate7CharAlpha();
    const email= commonActions.generateCustomEmail(firstname,lastname);
    await liveAccountActions.fillPersonalDetails(personalData,firstname,lastname,email,"personal");
  } catch (error) {
    console.error('Error filling personal account form:', error);
    throw error;
  }
});

When('user fill the corporate account pre-registration form with valid details', async function () {
  try {
    const corporateData = dataUtil.getValidPersonalAccountData();
    const firstname=dataUtil.generate7CharAlpha();
    const lastname=dataUtil.generate7CharAlpha();
    const email= commonActions.generateCustomEmail(firstname,lastname);
    await liveAccountActions.fillCorporateAccountForm(corporateData,firstname,lastname,email,"corporate");
  } catch (error) {
    console.error('Error filling corporate account form:', error);
    throw error;
  }
});

When('user submit the form', async function () {
  try {
    await liveAccountActions.submitLiveForm();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
});

Then('user should be redirected to the next step or see a success confirmation', async function () {
  try {
    
    const redirected = await commonActions.isRedirectedToClientPortal();
    expect(redirected).to.be.equals("https://portal-mu.hmarkets.com/en/#docs");
    } catch (error) {
    console.error('Error verifying success message:', error);
    throw error;
  }
});
//
When('user fills in the personal details successfully', async function () {
  try {
    const personalData = dataUtil.getValidPersonalAccountData();
    await liveAccountActions.fillPersonalDetailsInCP(personalData);
    console.log('Personal details filled successfully');
  } catch (error) {
    console.error('Error filling personal details:', error);
    throw error;
  }
});

Then('user should be navigated to the Employment & Financial Information page', async function () {
  try {
    const personalData = dataUtil.getValidPersonalAccountData();
    await liveAccountActions.fillEmpFinancialInCP(personalData);
    console.log(' Navigated to Employment & Financial Information page');
  } catch (error) {
    console.error('Error navigating to Employment & Financial Information page:', error);
    throw error;
  }
});

When('user proceeds to the Confirm Account Registration step', async function () {
  try {
    await liveAccountActions.proceedToConfirmAccountRegistration();
    console.log('Proceeded to Confirm Account Registration step');
  } catch (error) {
    console.error('Error proceeding to Confirm Account Registration step:', error);
    throw error;
  }
});

Then('user should be navigated to the Email Verification page', async function () {
  try {
    await liveAccountActions.confirmEmailOTP();
    console.log('Navigated to Email Verification page');
  } catch (error) {
    console.error('Error navigating to Email Verification page:', error);
    throw error;
  }
});

//
When('user submit the form without entering any data', async function () {
  try {
    await liveAccountActions.submitLiveForm();
  } catch (error) {
    console.error('Error submitting empty form:', error);
    throw error;
  }
});

Then('user should see validation errors for all required fields', async function () {
  try {
    const errors = await commonActions.getValidationErrors(liveAccountRegistrationLocators.errorMessages);
    expect(errors.length).to.be.equals(10);
    errors.forEach(msg => {
      expect(msg).to.match(/First name is required|Last name is required|Email is required|Invalid phone number|Country is required|Between 8 and 20 characters long|At least one number|At least one lowercase letter|At least one uppercase letter|At least one special character \(~!@#\$%\^&\*\[\?\+\)/i);
});
  } catch (error) {
    console.error('Error validating required fields:', error);
    throw error;
  }
});

When('user fill the email field with invalid email and press enter', async function () {
  try {
    await commonActions.enterInvalidPhoneOrEmail(liveAccountRegistrationLocators.txtEmail);
     } catch (error) {
    console.error('Error entering invalid email:', error);
    throw error;
  }
});

Then('user should see an invalid email format error', async function () {
  try {
    const error = await commonActions.getFieldErrorMessage(liveAccountRegistrationLocators.invalidEmail);
    expect(error).to.include('Invalid email');
  } catch (error) {
    console.error('Error verifying invalid email format:', error);
    throw error;
  }
});

When('user enter letters in the phone number field of live form and press enter', async function () {
  try {
    await commonActions.enterInvalidPhoneOrEmail(liveAccountRegistrationLocators.txtPhone);
  } catch (error) {
    console.error('Error entering letters in phone field:', error);
    throw error;
  }
});

Then('user should see a phone number validation error in live form', async function () {
  try {
    const error = await commonActions.getFieldErrorMessage(liveAccountRegistrationLocators.invalidPhone);
    expect(error).to.equal('Invalid phone number');
  } catch (error) {
    console.error('Error verifying phone number validation:', error);
    throw error;
  }
});

When('user enter more than 50 characters in the first name field and press enter', async function () {
  try {
    const longName = 'A'.repeat(51);
    await commonActions.enterFirstName(longName,liveAccountRegistrationLocators.txtFirstName);
  } catch (error) {
    console.error('Error entering long name:', error);
    throw error;
  }
});

Then('user should see a character limit validation error', async function () {
  try {
    const error = await commonActions.getFieldErrorMessage(liveAccountRegistrationLocators.txtFirstName);
    expect(error.toLowerCase()).to.include('maximum');
  } catch (error) {
    console.error('Error verifying character limit error:', error);
    throw error;
  }
});
