import { createContext, useReducer } from "react";

export const DeviceContext = createContext({
  devices: [],
  addDevice: ({ description, amount, date, name, number, status }) => {},
  setDevice: (device) => {},
  deleteDevice: (id) => {},
  updateDevice: (id, { description, amount, date, name, number, status }) => {},
});
function devicesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse(); // Phương thức đảo ngược dữ kiện đc thêm vào
      return inverted;
    case "UPDATE":
      const updatableDeviceIndex = state.findIndex(
        (device) => device.id === action.payload.id
      );
      const updatableDevice = state[updatableDeviceIndex];
      const updatedItem = { ...updatableDevice, ...action.payload.data };
      const updatedDevices = [...state];
      updatedDevices[updatableDeviceIndex] = updatedItem;
      return updatedDevices;
    case "DELETE":
      return state.filter((device) => device.id !== action.payload);
    default:
      return state;
  }
}

function DevicesContextProvider({ children }) {
  const [devicesState, dispatch] = useReducer(devicesReducer, []);

  function addDevice(deviceData) {
    dispatch({ type: "ADD", payload: deviceData });
  }
  function setDevice(devices) {
    dispatch({ type: "SET", payload: devices });
  }
  function updateDevice(id, deviceData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: deviceData } });
  }
  function deleteDevice(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  const value = {
    devices: devicesState,
    setDevice: setDevice,
    addDevice: addDevice,
    deleteDevice: deleteDevice,
    updateDevice: updateDevice,
  };
  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}
export default DevicesContextProvider;
