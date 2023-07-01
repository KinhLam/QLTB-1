import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text, Alert } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DevicesOutput from "../components/Devices/DevicesOutput/DevicesOutput";
import { DeviceContext } from "../store/Devices-context";
import { fetchDevices } from "../util/Http";
import LoadingOverLay from "../components/Ui/LoadingOverLay";
import ErrorOverLay from "../components/Ui/ErrorOverLay";
import { Colors } from "../constants/Styles";

function ExistingDevices({ navigation }) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const deviceCtx = useContext(DeviceContext);
  useEffect(() => {
    async function getDevices() {
      setIsFetching(true);
      try {
        const devices = await fetchDevices();
        deviceCtx.setDevice(devices);
      } catch (error) {
        setError("Could not fetch device!");
      }
      setIsFetching(false);
    }
    getDevices();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverLay message={error} />;
  }
  if (isFetching) {
    return <LoadingOverLay />;
  }
  const existingDevices = deviceCtx.devices.filter((device) => {
    return device.status == "borrowed";
  });
  const noExistingDevices = deviceCtx.devices.filter((device) => {
    return device.status == "not borrowed";
  });
  const Tab = createMaterialTopTabNavigator();
  function Borrowed() {
    return (
      <View style={styles.container}>
        <DevicesOutput
          devices={existingDevices}
          devicesPeriod="Total number"
          fallbackText="All equipment has been loaned out."
        />
      </View>
    );
  }
  function NoBorrowed() {
    return (
      <View style={styles.container}>
        <DevicesOutput
          devices={noExistingDevices}
          devicesPeriod="Total number"
          fallbackText="All equipment has been loaned out."
        />
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#123123",
        tabBarInactiveTintColor: "#ccc",
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={[
              focused ? { fontWeight: "bold" } : { fontWeight: "normal" },
              { color: color },
            ]}
          >
            {route.name}
          </Text>
        ),
        tabBarScrollEnabled: false,
      })}
    >
      <Tab.Screen name="Borrowed" component={Borrowed} />
      <Tab.Screen name="NoBorrowed" component={NoBorrowed} />
    </Tab.Navigator>
  );
}
export default ExistingDevices;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary50,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
