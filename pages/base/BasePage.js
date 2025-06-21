
import { getDriver } from '../../utils/driverFactory.js';
import { By } from 'selenium-webdriver';
import waitUtil from '../../utils/waitUtil.js';

class BasePage {
  constructor() {
    this.driver = getDriver();
    if (!this.driver) {
      throw new Error(" WebDriver is not initialized in BasePage.");
    }
  }

  async open(url) {
    try {
      await this.driver.get(url);
    } catch (error) {
      throw new Error(`Failed to open URL '${url}': ${error.message}`);
    }
  }

  async find(locator) {
    try {
      return await waitUtil.waitForVisible(this.driver, locator);
    } catch (error) {
      throw new Error(`Failed to find element: ${locator} - ${error.message}`);
    }
  }

  async findAll(locator) {
    try {
      await waitUtil.waitForVisible(this.driver, locator);
      return await this.driver.findElements(locator);
    } catch (error) {
      throw new Error(`Failed to find multiple elements: ${locator} - ${error.message}`);
    }
  }

  async type(locator, text) {
    try {
      const el = await this.find(locator);
      await el.clear();
      await el.sendKeys(text);
    } catch (error) {
      throw new Error(`Failed to type into element: ${locator} - ${error.message}`);
    }
  }

  async click(locator) {
    try {
      const el = await waitUtil.waitForClickable(this.driver, locator);
      await el.click();
    } catch (error) {
      throw new Error(`Failed to click element: ${locator} - ${error.message}`);
    }
  }

  async getText(locator) {
    try {
      const el = await this.find(locator);
      return await el.getText();
    } catch (error) {
      throw new Error(`Failed to get text from element: ${locator} - ${error.message}`);
    }
  }

  async selectDropDownByText(locator, visibleText) {
    try {
      const select = await this.find(locator);
      const options = await select.findElements(By.tagName('option'));

      for (const option of options) {
        const text = await option.getText();
        if (text?.trim() === visibleText?.trim()) {
          await option.click();
          return;
        }
      }

      throw new Error(`Option "${visibleText}" not found in dropdown`);
    } catch (error) {
      throw new Error(`Failed to select dropdown option '${visibleText}': ${error.message}`);
    }
  }
async scrollIntoView(locator) {
  try{
  const element = await this.find(locator);
  await this.driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element);
  }
  catch(error)
  {
    console.error("Failed to scroll to the element:", error);
  }
}
async scrollToBottom() {
  await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
}


  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default BasePage;