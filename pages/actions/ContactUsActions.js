import BasePage from '../base/BasePage.js';
import waitUtil from '../../utils/waitUtil.js';
import { contactUSLocators } from '../locators/ContactUsLocators.js';

class ContactUsActions extends BasePage {
  constructor(driver, attach) {
    super(driver, attach);
    this.locators = contactUSLocators;
    if (!this.driver) {
      throw new Error(" WebDriver is not initialized in ContactUsActions");
    }
  }

  async fillContactForm(user) {
    try {
      await waitUtil.waitForVisible(this.driver, this.locators.txtConFirstName);
      await this.type(this.locators.txtConFirstName, user.firstName);
      await this.type(this.locators.txtConLastName, user.lastName);
      await this.type(this.locators.txtConEmail, user.email);
      await this.selectDropDownByText(this.locators.selectConcountry, user.country);
      await this.click(this.locators.selectConCountryCode);
      await this.type(this.locators.txtSearchCode, user.code);
      await this.click(this.locators.countryOptionByText(user.country));
      await this.type(this.locators.txtConPhone, user.phone || '');
      await this.selectDropDownByText(this.locators.selectSubject, user.subject);
      await this.type(this.locators.txtMessage, user.message || 'Message');
    } catch (error) {
      console.error("Error while filling contact form:", error);
      throw error;
    }
  }

  async submitForm() {
    try {
      
      await this.click(this.locators.btnSendQuery);
    } catch (error) {
      console.error("Failed to submit the form:", error);
      throw error;
    }
  }

  async getConfirmationMessage() {
    try {
      const el = await waitUtil.waitForVisible(this.driver, this.locators.confirmationMessage, 10000);
      return await el.getText();
    } catch (error) {
      console.warn("Confirmation message not found:", error);
      return null;
    }
  }

  async getFieldErrorMessage(locator) {
  try {
    const el = await waitUtil.waitForVisible(this.driver, locator, 5000);
    const text = await el.getText();
    return text;
  } catch (error) {
    console.error(`Error fetching validation message for locator: ${locator}`, error);
    return null;
  }
}

}
export default ContactUsActions;
