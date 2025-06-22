import BasePage from '../base/BasePage.js';
import waitUtil from '../../utils/waitUtil.js';
import CommonActions from './CommonActions.js';
import { liveAccountRegistrationLocators } from '../locators/AccountRegistrationLocators.js';
import { generate7CharAlpha, generateSecurePassword } from '../../utils/dataUtil.js';

class LiveAccountActions extends BasePage {
  constructor() {
    super();
    this.locators = liveAccountRegistrationLocators;
    if (!this.driver) {
      throw new Error("WebDriver is not initialized in LiveAccountActions");
    }
  }

  async selectMT5Live() {
    try {
      const btnMT5 = await waitUtil.waitForClickable(this.driver, this.locators.btnLiveMT5);
      await btnMT5.click();
    } catch (error) {
      console.error("Failed to select MT5 option on live account:", error);
      throw error;
    }
  }
async fillPersonalDetails(user, firstname, lastname, email, type) {
  try {
    const password = generateSecurePassword();

    await waitUtil.waitForVisible(this.driver, this.locators.txtFirstName);
    await this.type(this.locators.txtFirstName, firstname);
    await this.type(this.locators.txtLastName, lastname);
    await this.type(this.locators.txtEmail, email);
    this.sleep(1000000)
    if (type === "corporate") {
      // Check if jurisdiction dropdown exists and visible before interacting
      const jurisdictionExists = await this.driver.findElements(this.locators.selectJurisdiction);
      if (jurisdictionExists.length > 0) {
        const jurisdictionElem = await this.find(this.locators.selectJurisdiction);
        const visible = await jurisdictionElem.isDisplayed();
        if (visible) {
          await this.selectDropDownByText(this.locators.selectJurisdiction, user.country);
        }
      }

      // Check if entity name field exists and visible before typing
      const entityNameExists = await this.driver.findElements(this.locators.txtEntityName);
      if (entityNameExists.length > 0) {
        const entityElem = await this.find(this.locators.txtEntityName);
        const visible = await entityElem.isDisplayed();
        if (visible && user.entityname) {
          await this.type(this.locators.txtEntityName, user.entityname);
        }
      }
    } else {
      await this.selectDropDownByText(this.locators.selectCountry, user.country);
    }

    await this.click(this.locators.selectCountryCode);
    await this.type(this.locators.txtSearchCountry, user.code);
    await this.click(this.locators.countryLiveOptionByText(user.country));
    await this.type(this.locators.txtPhone, user.phone || '');
    await this.type(this.locators.txtLivePassword, password || 'DefaultPass123!');
        if (user.emailConsent !== undefined) {
      const emailConsentCheckbox = await this.find(this.locators.chkEmailConsent);
      const isSelected = await emailConsentCheckbox.isSelected();
      if (user.emailConsent !== isSelected) {
        await emailConsentCheckbox.click();
      }
    }
  } catch (error) {
    console.error("Error while filling live personal details form:", error);
    throw error;
  }
}
  async fillPersonalAccountForm(user) {
    try {
      await this.selectDropDownByText(this.locators.selectCountry, user.country);
    } catch (error) {
      console.error("Error while filling live account form:", error);
      throw error;
    }
  }
  async fillPersonalDetailsInCP(user) {
  try {
    this.sleep(10000)
    await waitUtil.waitForPageLoad(this.driver, timeout = 100000) 
    await waitUtil.waitForVisible(this.driver, this.locators.selectDod);
    await this.selectDropDownByText(this.locators.selectDod, user.dod);
    await this.selectDropDownByText(this.locators.selectDom, user.dom);
    await this.selectDropDownByText(this.locators.selectDoby, user.doy);
    await this.type(this.locators.txtAdrs, user.address);
    await this.type(this.locators.txtCity,user.city);
    await this.click(this.locators.btnSavedetails);
    
  } catch (error) {
    console.error("Error while filling live personal details in CP:", error);
    throw error;
  }
}
  async fillEmpFinancialInCP(user) {
  try {
    this.sleep(10000)
    await waitUtil.waitForVisible(this.driver, this.locators.selectEmpStatus);
    await this.selectDropDownByText(this.locators.selectEmpStatus, user.empstatus);
    await this.selectDropDownByText(this.locators.selectFunds, user.source);
    await this.selectDropDownByText(this.locators.selectNet, user.networth);
    await this.selectDropDownByText(this.locators.selectIncome, user.income);
    await this.selectDropDownByText(this.locators.selectExp, user.experience);
    await this.click(this.locators.btnNext);

  } catch (error) {
    console.error("Error while filling live employment& financial details in CP:", error);
    throw error;
  }
}
async proceedToConfirmAccountRegistration(user) {
  try {
    this.sleep(10000)
    await this.selectDropDownByText(this.locators.selectEmpStatus, user.empstatus);
    await this.selectDropDownByText(this.locators.selectFunds, user.source);
    await this.selectDropDownByText(this.locators.selectNet, user.networth);
    await this.selectDropDownByText(this.locators.selectIncome, user.income);
    await this.selectDropDownByText(this.locators.selectExp, user.experience);
    await this.click(this.locators.btnNext);

  } catch (error) {
    console.error("Error while filling live employment& financial details in CP:", error);
    throw error;
  }
}
async proceedToConfirmAccountRegistration() {
  try {
    this.sleep(10000)
    await waitUtil.waitForVisible(this.driver, this.locators.chkAcknowledge);
    await this.click(this.locators.chkAcknowledge);
    await this.click(this.locators.btnSendOTP);        
        
  } catch (error) {
    console.error("Error while confirming details in CP:", error);
    throw error;
  }
}
async confirmEmailOTP() {
  try {
    this.sleep(10000)
    await waitUtil.waitForVisible(this.driver, this.locators.txtOTP);
    await this.click(this.locators.txtOTP);        
        
  } catch (error) {
    console.error("Error while confirming details in CP:", error);
    throw error;
  }
}
async fillCorporateAccountForm(user) {
    try {
      await this.selectDropDownByText(this.locators.selectJurisdiction, user.country);
      await this.type(this.locators.txtEntityName, user.entityname);
    } catch (error) {
      console.error("Error while filling live account form:", error);
      throw error;
    }
  }
  async submitLiveForm() {
    try {
      const submitBtn = await waitUtil.waitForClickable(this.driver, this.locators.btnLiveSubmit);
      await submitBtn.click();
      this.sleep(100000)
    } catch (error) {
      console.error("Failed to submit live account form:", error);
      throw error;
    }
  }

  async getSuccessMessage() {
    try {
      const el = await waitUtil.waitForVisible(this.driver, this.locators.successMessage, 10000);
      return await el.getText();
    } catch (error) {
      console.warn("Confirmation message not found:", error);
      return null;
    }
  }

  async getValidationErrors() {
    try {
      const elements = await this.driver.findElements(this.locators.formErrors);
      return Promise.all(elements.map(el => el.getText()));
    } catch (error) {
      console.error("Failed to retrieve validation errors:", error);
      return [];
    }
  }

  async getFieldErrorMessage(locator) {
    try {
      const el = await waitUtil.waitForVisible(this.driver, locator, 5000);
      return await el.getText();
    } catch (error) {
      console.error(`Error fetching validation message for locator: ${locator}`, error);
      return null;
    }
  }
  async selectAccount(locators) {
    try {
     const account= await waitUtil.waitForClickable(this.driver,locators,5000 );
      await account.click();
    } catch (error) {
      console.error('Error selecting personal account:', error);
      throw error;
    }
  }
}

export default LiveAccountActions;
