import axios from "axios";

const BACKEND_URL =
  "https://anhdatne-1f50e-default-rtdb.asia-southeast1.firebasedatabase.app/";
export async function storeDevice(deviceData) {
  const response = await axios.post(BACKEND_URL + "/devices.json", deviceData);
  const id = response.data.name;
  return id;
}
export async function fetchDevices() {
  const response = await axios.get(BACKEND_URL + "/devices.json");
  const devices = [];
  for (const key in response.data) {
    const deviceObj = {
      id: key,
      name: response.data[key].name,
      number: response.data[key].number,
      amount: response.data[key].amount,
      status: response.data[key].status,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    devices.push(deviceObj);
  }
  return devices;
}
export function updateDevice(id, deviceData) {
  return axios.put(BACKEND_URL + `/devices/${id}.json`, deviceData);
}
export function deleteDevice(id) {
  return axios.delete(BACKEND_URL + `/devices/${id}.json`);
}
