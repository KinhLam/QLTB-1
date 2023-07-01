import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../../../constants/Styles";

function DevicesSummary({ devices, periodName }) {
  const devicesSum = devices.reduce((sum, devices) => {
    return sum + devices.number;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{devicesSum}</Text>
    </View>
  );
}
export default DevicesSummary;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.primary800,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 0,
    borderRadius: 20,
    elevation: 6,
    height: 60,
  },
  period: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary50,
  },
  sum: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary50,
  },
});
