import { Before, After, AfterStep, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { startDriver, stopDriver  } from '../../utils/driverFactory.js';
import { baseUrl } from '../../utils/config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

setDefaultTimeout(60 * 2000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

Before(async function () {
  console.log("[HOOK] Starting driver...");
  const driver = await startDriver();
  this.driver = driver;
  await driver.get(baseUrl);
  await driver.manage().window().maximize();
  console.log("[HOOK] Started driver and navigated to " + baseUrl);
});

AfterStep(async function (stepResult) {
  if (stepResult.result?.status === Status.FAILED && this.driver) {
    try {
      const screenshotBase64 = await this.driver.takeScreenshot();

      const dir = path.resolve(process.cwd(), 'reports/screenshots');
      fs.mkdirSync(dir, { recursive: true });
      const fileName = `FAILED_${Date.now()}.png`;
      const filePath = path.join(dir, fileName);
      fs.writeFileSync(filePath, screenshotBase64, 'base64');
      await this.attach(screenshotBase64, 'image/png');
    
    } catch (err) {
      console.error(' Failed to capture screenshot:', err);
    }
  }
});



After(async function () {
  if (this.driver) {
    try {
      await stopDriver();
    } catch (err) {
      console.error("Error stopping WebDriver:", err);
    }
  }
});
