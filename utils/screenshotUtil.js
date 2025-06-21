// utils/screenshotUtil.js
import { getDriver } from './driverFactory.js';
import fs from 'fs';
import path from 'path';

export async function captureScreenshot(name = 'screenshot') {
  const driver = getDriver();
  const image = await driver.takeScreenshot();
  const filepath = path.resolve(`allure-results/${name}-${Date.now()}.png`);
  fs.writeFileSync(filepath, image, 'base64');
  return filepath;
}
