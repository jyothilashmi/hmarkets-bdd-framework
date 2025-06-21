import { By } from 'selenium-webdriver';

export const contactUSLocators = {
  txtConFirstName: By.name("first_name"),
  txtConLastName: By.name("last_name"),
  txtConEmail: By.name("email"),
  selectConcountry: By.name("country"),
  selectConCountryCode: By.xpath("//input[@aria-label='Country code']"),
  txtSearchCode:By.name("search"),
  txtConPhone: By.xpath("//input[contains(@id,'PhoneNumberInput') and @inputmode='tel']"),
  selectSubject: By.name("subject"),
  txtMessage: By.xpath("//textarea[@name='lead_message']"),
  btnSendQuery: By.xpath("//div[contains(text(),'Send enquiry')]/parent::button"),
  confirmationMessage:By.xpath("//p[text()='Your submission was successful.']"),
  contactUserrorMessages:By.xpath("//span[contains(text(), 'required') or contains(text(), 'Invalid')]"),
  invalidEmail:By.xpath("//input[@name='email']/following-sibling::span"),
  countryOptionByText: (countryName) =>
    By.xpath(`//div[contains(@class,'m-country-selector')]//span[contains(text(),'${countryName}')]`)
    };
export default contactUSLocators;