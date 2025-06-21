import BasePage from '../base/BasePage.js';
import waitUtil from '../../utils/waitUtil.js';
import { contactUSLocators } from '../locators/ContactUsLocators.js';
import { liveAccountRegistrationLocators, demoMTAccountLocators } from '../locators/AccountRegistrationLocators.js';
import { By ,Key } from 'selenium-webdriver';


class CommonActions extends BasePage {
  constructor() {
    super();
    this.contactLocators = contactUSLocators;
    this.accountLocators = liveAccountRegistrationLocators;
    this.mtDemoLocators= demoMTAccountLocators;
    if (!this.driver) {
      throw new Error("WebDriver is not initialized.");
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
async navigateToPages(pageLink, expectedTitle) {
  try {
    await this.driver.get(pageLink);
    const titleMatched =await waitUtil.waitForTitleIs(this.driver,expectedTitle,10000);
    if (!titleMatched) {
      throw new Error('Page title did not match expected title.');
    }
    console.log(`Successfully navigated to "${pageLink}" with correct title.`);
  } catch (error) {
    console.error(" Failed to navigate or verify page title:", error);
    throw error;
  }
}

  
  async getValidationErrors(locator) {
    try {
      const elements = await this.driver.findElements(locator);
      return Promise.all(elements.map(el => el.getText()));
    } catch (error) {
      console.error(" Failed to retrieve validation errors:", error);
      return [];
    }
  }
  async getAllCountriesFromDropdown(dropdownLocator) {
  try {
    const dropdown = await this.find(dropdownLocator);
    const options = await dropdown.findElements(By.tagName('option'));

    const countryNames = [];
    for (const option of options) {
      const text = await option.getText();
      if (text.trim()) {
        countryNames.push(text.trim());
      }
    }
    return countryNames;
  } catch (error) {
    console.error("Error fetching or selecting country in dropdown:", error);
    
    return [];
  }
}
async enterInvalidPhoneOrEmail(locators) {
  try {
    await this.type(locators, 'abcde');
    await this.driver.actions().sendKeys(Key.ENTER).perform();
  } catch (error) {
    console.error('Error in phone or email:', error);
    
    throw error;
  }
}
async getPhoneErrorMessage(locators) {
  try {
    const errorElement = await waitUtil.waitForVisible(this.driver, locators, 5000);
    return await errorElement.getText();
  } catch (error) {
    console.error('Error in getPhoneErrorMessage():', error);
        return null;
  }
}
async  generateSecurePassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '~!@#$%^&*[?+';
  const allChars = lowercase + uppercase + numbers + specialChars;

  const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];
  let password = [
    getRandomChar(lowercase),
    getRandomChar(uppercase),
    getRandomChar(numbers),
    getRandomChar(specialChars)
  ];

  const remainingLength = Math.floor(Math.random() * 13) + 4; 
  for (let i = 0; i < remainingLength; i++) {
    password.push(getRandomChar(allChars));
  }
  password = password.sort(() => Math.random() - 0.5);

  return password.join('');
}
async enterFirstName(user,locator) {
    try {
      await waitUtil.waitForVisible(this.driver, locator);
      await this.type(locator, user);
           }
    catch (error) {
      console.error("Error while filling firstname:", error);
      throw error;
    }
    }
  async isRedirectedToClientPortal() {
  try {
    const currentUrl = await this.driver.getCurrentUrl();
    return currentUrl;
    //.startsWith('https://portal-mu.hmarkets.com/en/#docs');
  } catch (error) {
    console.error('Error getting current URL:', error);
    return null;
  }
}
async generateCustomEmail(firstName, lastName) {
  const localPart = firstName +`.`+ lastName;
  return `${localPart}@test.com`;
}
}

  export default CommonActions;