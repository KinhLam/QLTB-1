import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import UserOutput from "../../components/User/UserOutput";
import { DeviceContext } from "../../store/Devices-context";
import { fetchDevices } from "../../util/Http";
import ErrorOverLay from "../../components/Ui/ErrorOverLay";
import LoadingOverlay from "../../components/Ui/LoadingOverLay";
function InformationScreen({ navigation }) {
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
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <UserOutput
        devices={deviceCtx.devices}
        devicesPeriod="Total number"
        fallbackText="Hi! Try adding some todos!"
      />
    </View>
  );
}

export default InformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
