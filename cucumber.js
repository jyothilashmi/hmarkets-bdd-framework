console.log("loading.....")
export default {
  default: {
    import: [
      'features/step_definitions/*.js',
      'features/support/hooks.js'
    ],
    format: ['json:reports/cucumber_report.json'],
    paths: ['features/*.feature'],
    tags: "@smoke",
    publishQuiet: true
  }
};


