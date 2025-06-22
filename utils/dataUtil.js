export const getValidUser = () => ({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "550022585",
  country: "United Arab Emirates",
  code: "+971",
  subject:"Marketing",
  message:"testing",
  empstatus:"unemployed",
  networth:"$ 0 - 20,000",
  source:"Inheritance",
  income:"$ 0 - 5,000",
  experience:"0-1",
  dod:"11",
  dom:"February",
  doy:"2000",
  city:"was",
  address:"testing",

  
});
export const getValidPersonalAccountData = () =>({
 firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "550022585",
  country: "United Arab Emirates",
  code: "+971",
  entityname: "Test" 
})
export const getEmptyUser = () => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  code: "",
  subject:"",
  message:"",
  leverage: " ",
  sizeValue: " ",
  deposit:" "
});
export const getInvalidUser = () => ({
  firstName: "Johan",
  lastName: "Val",
  email: "invalidemail",
  phone: "550022585",
  country: "United Arab Emirates",
  code: "+971",
  subject:"Marketing",
  message:"testing"
});

export const getDemoValidMT4 = () => ({
  leverage: "1:500",
  sizeValue: "1000",
  firstName: "john",
  lastName: "van",
  email: "john.doe@example.com",
  phone: "500000077",
  country: "United Arab Emirates",
  code: "+971",
  deposit:"$1,000",
  password:"Abcd@1234"
});
export const getDemoInValidMT = () => ({
  leverage: "1:500",
  sizeValue: "1000",
  firstName: "john",
  lastName: "van",
  email: "invalid",
  phone: "500000077",
  country: "United Arab Emirates",
  code: "+971",
  deposit:"$1,000",
  password:"Abcd@1234"
});

export const getDemoValidMT5 = () => ({
  leverage: "1:500",
  sizeValue: "1000",
  firstName: "john",
  lastName: "van",
  email: "john.doe@example.com",
  phone: "500000077",
  country: "United Arab Emirates",
  code: "+971",
  deposit:"$1,000",
  password:"Abcd@1234"
});
export const getTitles=()=>({
contactUs:"Contact Us | Hantec Markets",
demoMT:"Open MetaTrader Demo Account Safely | Hantec Markets",
liveAccount:"Live Account Registration | Open Trading Account | Hantec Markets"
});

const dataUtil = {
  getValidUser,
  getInvalidUser,
  getDemoValidMT4,
  getDemoValidMT5,
  getTitles,
  getDemoInValidMT,
  getValidPersonalAccountData,
  generate7CharAlpha,
  generateSecurePassword,
  generateTestEmail
};
export function generateSecurePassword() {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '~!@#$%^&*[?+';
  const allChars = lowercase + uppercase + numbers + specialChars;

  const getRandomChar = str => str[Math.floor(Math.random() * str.length)];

  let password = [
    getRandomChar(lowercase),
    getRandomChar(uppercase),
    getRandomChar(numbers),
    getRandomChar(specialChars)
  ];

  const remainingLength = Math.floor(Math.random() * 13) + 4;
  for (let i = 0; i < remainingLength; i++) {
    password.push(getRandomChar(allChars));
  }

  return password.sort(() => Math.random() - 0.5).join('');
}
export function generate7CharAlpha() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';

  let result = uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  for (let i = 1; i < 7; i++) {
    result += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  }
  return result;
}
export function generateTestEmail() {
  const domain = generate7CharAlpha(7);
  return `user@${domain}.test`;
}
export default dataUtil;
