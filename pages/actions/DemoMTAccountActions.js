import BasePage from '../base/BasePage.js';
import waitUtil from '../../utils/waitUtil.js';
import { demoMTAccountLocators } from '../locators/AccountRegistrationLocators.js';

class DemoMTAccountActions extends BasePage {
  constructor() {
    super();
    this.locators = demoMTAccountLocators;
    if (!this.driver) {
      throw new Error("WebDriver is not initialized in DemoMTAccountActions");
    }
  }

  async selectMT4() {
    try {
      const btnMT4 = await waitUtil.waitForClickable(this.driver, this.locators.btnMT4);
      await btnMT4.click();
    } catch (error) {
      console.error("Failed to select MT4 option:", error);
      throw error;
    }
  }

  async selectMT5() {
    try {
      const btnMT5 = await waitUtil.waitForClickable(this.driver, this.locators.btnMT5);
      await btnMT5.click();
    } catch (error) {
      console.error("Failed to select MT5 option:", error);
      throw error;
    }
  }

  async fillDemoForm(user) {
    try {
      await waitUtil.waitForVisible(this.driver, this.locators.txtDemoFirstName);
      await this.selectDropDownByText(this.locators.selectLeverage, user.leverage);
      await this.selectDropDownByText(this.locators.selectDemo, user.deposit);
      await this.type(this.locators.txtDemoFirstName, user.firstName);
      await this.type(this.locators.txtDemoLastName, user.lastName);
      await this.type(this.locators.txtDemoEmail, user.email);
      await this.selectDropDownByText(this.locators.selectDemoCountry, user.country);
      await this.click(this.locators.selectDemoCountryCode);
      await this.type(this.locators.txtSearchDemoCode, user.code);
      await this.click(this.locators.countryDemoOptionByText(user.country));
      await this.type(this.locators.txtDemoPhone, user.phone || '');
      //await this.type(this.locators.txtDemoPassword, user.password || 'DefaultPassword123!');
      if (user.emailConsent !== undefined) {
        const emailConsentCheckbox = await this.find(this.locators.chkEmailConsent);
        const isSelected = await emailConsentCheckbox.isSelected();
        if (user.emailConsent !== isSelected) {
          await emailConsentCheckbox.click();
        }
      }
    } catch (error) {
      console.error("Error while filling demo form:", error);
      throw error;
    }
  }

  async submitDemoForm() {
    try {
      const submitBtn = await waitUtil.waitForClickable(this.driver, this.locators.btnDemoSubmit);
      await submitBtn.click();
    } catch (error) {
      console.error("Failed to submit demo form:", error);
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
}

export default DemoMTAccountActions;
