import reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',     
  output: 'reports/cucumber-report.html',       
  reportSuiteAsScenarios: true,
  launchReport: true,       
  storeScreenshots: true, 
  screenshotsDirectory: 'reports/screenshots',             
  metadata: {
    "Test Environment": "STAGING",
    "Browser": "Chrome  90",
    "Platform": "Windows 10",
    "Executed": "Local"
  }
};

reporter.generate(options);
