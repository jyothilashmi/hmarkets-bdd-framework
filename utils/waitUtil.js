// utils/waitUtil.js
import { until } from 'selenium-webdriver';

class WaitUtil {
  async waitForVisible(driver, locator, timeout = 1000000) {
    try {
      const el = await driver.wait(until.elementLocated(locator), timeout);
      await driver.wait(until.elementIsVisible(el), timeout);
      return el;
    } catch (error) {
      throw new Error(` [waitForVisible] Element not visible: ${locator} - ${error.message}`);
    }
  }
// utils/waitUtil.js
 async waitForPageLoad(driver, timeout = 100000) {
  await driver.wait(async () => {
    const readyState = await driver.executeScript('return document.readyState');
    return readyState === 'complete';
  }, timeout, 'Timeout waiting for page to load completely');
}

  async waitForClickable(driver, locator, timeout = 10000) {
    try {
      const el = await driver.wait(until.elementLocated(locator), timeout);
      await driver.wait(until.elementIsEnabled(el), timeout);
      return el;
    } catch (error) {
      throw new Error(` [waitForClickable] Element not clickable: ${locator} - ${error.message}`);
    }
  }

  async waitForUrlContains(driver, substring, timeout = 10000) {
    try {
      await driver.wait(until.urlContains(substring), timeout);
    } catch (error) {
      throw new Error(` [waitForUrlContains] URL did not contain '${substring}' - ${error.message}`);
    }
  }

async waitForTitleIs (driver, expectedTitle, timeout = 10000){
  try {
    await driver.wait(until.titleIs(expectedTitle), timeout);
    return true;
  } catch (error) {
    console.error(`Expected title "${expectedTitle}" not found.`, error);
    return false;
  }
}

}

const waitUtil = new WaitUtil();
export default waitUtil;
