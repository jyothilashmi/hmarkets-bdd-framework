console.log("loading.....")
export default {
  default: {
    import: [
      'features/step_definitions/*.js',
      'features/support/hooks.js'
    ],
    format: ['allure-cucumberjs'],
    paths: ['features/*.feature'],
    tags: "@smoke",
    publishQuiet: true
  }
};


