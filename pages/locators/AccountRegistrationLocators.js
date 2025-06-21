import { By } from 'selenium-webdriver';

export const liveAccountRegistrationLocators = {
  btnOpenAccount: By.xpath("(//div[contains(text(),'Open an account')]/parent::a)[2]"),
  txtFirstName: By.name("first_name"),
  txtLastName: By.name("last_name"),
  txtEmail: By.name("email"),
  selectCountry: By.name("country"),
  txtLivePassword:By.name("password"),
  txtPhone: By.xpath("//input[contains(@id,'PhoneNumberInput') and @inputmode='tel']"),
  selectCountryCode: By.xpath("//input[@aria-label='Country code']"),
  txtSearchCountry: By.xpath("//input[@aria-label='Search a country']"),
  chkEmailConsent: By.xpath("//label[contains(text(),'I would like to receive market analysis')]/preceding-sibling::div//input"),
  btnSubmit: By.css('button[type="submit"]'),
  btnPersonalAccount: By.xpath("//button[text()='Personal Account']"),
  btnCorporateAccount: By.xpath("//button[text()='Corporate Account']"),
  txtEntityName: By.name("entity_name"),
  selectJurisdiction: By.name("jurisdiction_country"),
  btnLiveSubmit: By.xpath("//div[contains(text(),'Start your application')]/parent::button"),
  invalidEmail:By.xpath("//input[@name='email']/following-sibling::span"),
  invalidPhone:By.xpath("//div[contains(@class,'phone-validator')]/span"),
  errorMessages:By.xpath("//span[contains(text(), 'required') or contains(text(), 'Invalid') or contains(text(), 'At least')]  |  //p[contains(text(), 'required') or contains(text(), 'Between') or contains(text(), 'At least')]"),
  countryLiveOptionByText: function (countryName) {
    return By.xpath(`//div[contains(@class,'m-country-selector')]//span[contains(text(),'${countryName}')]`);
  }
};

export const demoMTAccountLocators = {
  btnTryDemoAccount: By.xpath("//div[contains(text(),'Try a demo')]/parent::a"),
  btnMT4: By.xpath("//button[text()='MT4']"),
  btnMT5: By.xpath("//button[text()='MT5']"),
  selectLeverage: By.name("leverage"),
  selectDemo: By.name("deposit"),
  txtDemoFirstName: By.name("firstName"),
  txtDemoLastName: By.name("lastName"),
  txtDemoEmail: By.name("email"),
  selectDemoCountry: By.name("country"),
  txtDemoPhone: By.xpath("//input[contains(@id,'PhoneNumberInput') and @inputmode='tel']"),
  selectDemoCountryCode: By.xpath("//input[@aria-label='Country code']"),
  txtSearchDemoCode:By.name("search"),
  chkEmailConsent: By.xpath("//label[contains(text(),'I would like to receive market analysis')]/preceding-sibling::div//input"),
  btnDemoSubmit: By.xpath("//div[contains(text(),'Open a demo account')]/parent::button"),
  successMessage:By.xpath("//p[text()='Your submission was successful.']"),
  userrorMessages:By.xpath("//span[contains(text(), 'required') or contains(text(), 'Invalid')]"),
  invalidDemoEmail:By.xpath("//input[@name='email']/following-sibling::span"),
  invalidPhone:By.xpath("//div[contains(@class,'phone-validator')]/span"),
  countryDemoOptionByText: function (countryName) {
    return By.xpath(`//div[contains(@class,'m-country-selector')]//span[contains(text(),'${countryName}')]`);
  }
};
