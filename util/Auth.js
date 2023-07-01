import axios from "axios";

const API_KEY = "AIzaSyCRGUIE3fpvgCgmpYC_6bBHMsJC5kquDTg";

export async function authenticate(mode, phone, password) {
  const url = `URL_AUTHENTICATION`;
  const response = await axios.post(url, {
    phone: phone,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
}

export function createUser(phone, password) {
  return authenticate("signUp", phone, password);
}
export function login(phone, password) {
  return authenticate("signInWithPassword", phone, password);
}
export function verifi(phone, password) {
  return authenticate("verification", phone, password);
}
