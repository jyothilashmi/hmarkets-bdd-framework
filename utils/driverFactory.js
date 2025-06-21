import { Builder } from 'selenium-webdriver';
import 'chromedriver';

let driver;

export const startDriver = async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().setTimeouts({
    implicit: 10000,  
    pageLoad: 30000,  
    script: 30000 
  });
  return driver;
};

export const getDriver = () => {
  if (!driver) {
    throw new Error(" WebDriver is not initialized. Did you call startDriver()?");
  }
  return driver;
};

export const stopDriver = async () => {
  if (driver) {
    await driver.quit();
  }
};
