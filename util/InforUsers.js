import axios from "axios";
const BACKEND_URL = "";

export async function storeInforUser({ inforUserData }) {
  const response = await axios.post(BACKEND_URL + "/inforUser", inforUserData);
  const id = response.data.name;
  return id;
}
export async function fetchInforUsers() {
  const response = await axios.get(BACKEND_URL + "/inforUser.json");
  const inforUser = [];
  for (const key in response.data) {
    const inforUserObj = {
      id: key,
      name: response.data[key].name,
      gender: response.data[key].gender,
      dateBirth: new Date(response.data[key].dateBirth),
      email: response.data[key].email,
      level: response.data[key].level,
      majors: response.data[key].majors,
      classroom: response.data[key].classroom,
    };
    inforUser.push(inforUserObj);
  }
  return inforUser;
}
export function updateInforUser(id, inforUserData) {
  return axios.put(BACKEND_URL + `/inforUsers/${id}.json`);
}
export function deleteInforUser(id) {
  return axios.delete(BACKEND_URL + `/inforUsers/${id}.json`);
}
