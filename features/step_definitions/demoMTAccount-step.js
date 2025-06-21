import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import DemoMTAccountActions from '../../pages/actions/DemoMTAccountActions.js';
import CommonActions from '../../pages/actions/CommonActions.js';
import dataUtil from '../../utils/dataUtil.js';
import { demoMTAccount } from '../../utils/config.js';
import { demoMTAccountLocators }  from '../../pages/locators/AccountRegistrationLocators.js';

let demoMT;
let commonActions;

Given('user open the MT Demo Account registration page', async function () {
  try {
    demoMT = new DemoMTAccountActions();
    commonActions=new CommonActions();
    const expectedDemoTitle=dataUtil.getTitles();
    await commonActions.navigateToPages(demoMTAccount,expectedDemoTitle.demoMT);
  } catch (error) {
    console.error('Error opening the demo registration page:', error);
    throw error;
  }
});

When('user selects MT4 option', async function () {
  try {
    await demoMT.selectMT4();
  } catch (error) {
    console.error('Error selecting MT4 option:', error);
    throw error;
  }
});

When('user selects MT5 option', async function () {
  try {
    await demoMT.selectMT5();
  } catch (error) {
    console.error('Error selecting MT5 option:', error);
    throw error;
  }
});

When('user fill the demo form with valid information', async function () {
  try {
    const user = dataUtil.getDemoValidMT4();
    await demoMT.fillDemoForm(user);
  } catch (error) {
    console.error('Error filling demo form:', error);
    throw error;
  }
});

When('user submit the demo form', async function () {
  try {
    await demoMT.submitDemoForm();
  } catch (error) {
    console.error('Error submitting demo form:', error);
    throw error;
  }
});

Then('user should be getting successful message on demo form submission', async function () {
  try {
      const message = await demoMT.getSuccessMessage();
      expect(message).to.equal("Your submission was successful.");
    } catch (error) {
      console.error("Error :: confirmation message:", error);
      throw error;
    }
});

When('user fill the demo form with invalid email', async function () {
  try {
    const user = dataUtil.getDemoInValidMT(); 
    await demoMT.fillDemoForm(user);
  } catch (error) {
    console.error('Error filling form with invalid email:', error);
    throw error;
  }
});

Then('user should see an email validation error', async function () {
  try {
      const errors = await commonActions.getFieldErrorMessage(demoMTAccountLocators.invalidDemoEmail);
      expect(errors, 'Error message not found').to.be.a('string').and.to.contain('Invalid email');
    } catch (error) {
      console.error(" Error :: invalid email validation error:", error);
      throw error;
    }
});

When('user submit the demo form without entering any information', async function () {
  try {
    await demoMT.submitDemoForm();
  } catch (error) {
    console.error('Error submitting empty form:', error);
    throw error;
  }
});

Then('user should see required field validation errors', async function () {
  try {
      const errors = await commonActions.getValidationErrors(demoMTAccountLocators.userrorMessages);
      expect(errors.length).to.be.equals(7);
      errors.forEach(errorMsg => {
        expect(errorMsg).to.match(/Leverage is required|Account size is required|First name is required|Last name is required|Email is required|Country is required|Invalid phone number/i, `Unexpected validation message: "${errorMsg}"`);
      
      });
  
    } catch (error) {
      console.error("Error :: validation errors for required fields:", error);
      throw error;
    }
});

Then('the country dropdown should include {string}', async function (country) {
  try {
    const countries = await commonActions.getAllCountriesFromDropdown(demoMTAccountLocators.selectDemoCountry);
    expect(countries).to.include(country);
  } catch (error) {
    console.error('Error validating country in dropdown:', error);
    throw error;
  }
});

When('user enter non-numeric text into the phone field', async function () {
  try {
    await commonActions.enterInvalidPhoneOrEmail(demoMTAccountLocators.txtDemoPhone);
  } catch (error) {
    console.error('Error entering non-numeric phone:', error);
    throw error;
  }
});

Then('user should see a phone number validation error', async function () {
  try {
    const phoneError = await commonActions.getPhoneErrorMessage(demoMTAccountLocators.invalidPhone);
    expect(phoneError).to.equals('Invalid phone number');
  } catch (error) {
    console.error('Error validating phone number:', error);
    throw error;
  }
});
