import { Before, After, AfterStep, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { startDriver, stopDriver  } from '../../utils/driverFactory.js';
import { baseUrl } from '../../utils/config.js';


setDefaultTimeout(60 * 2000);

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
      const screenshot = await this.driver.takeScreenshot();
      await this.attach(screenshot, 'image/png');  // This auto-adds to Allure
    } catch (err) {
      console.error('Failed to capture screenshot:', err);
    }
  }
});


After(async function () {
  if (this.driver) {
    try {
      await stopDriver();
    } catch (err) {
      console.error("❌ Error stopping WebDriver:", err);
    }
  }
});
