import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../../constants/Styles";
import { getFormattedDate } from "../../../util/Date";
function DevicesItem({ id, description, date, amount, name, status, number }) {
  const navigation = useNavigation();
  function devicesPressHandler() {
    navigation.navigate("AddList", {
      deviceId: id,
    });
  }
  return (
    <Pressable
      onPress={devicesPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.devicesItem}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.text}>description: {description}</Text>
          <Text style={styles.text}>number: {number}</Text>
        </View>
        <View style={styles.inforContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)} VNĐ</Text>
          <Text style={styles.text}>{status}</Text>
          <Text style={styles.text}>{getFormattedDate(date)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default DevicesItem;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  devicesItem: {
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 90,
    backgroundColor: Colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 25,
    elevation: 6,
    shadowColor: Colors.gray50,
    shadowRadius: 50,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary900,
  },
  text: {
    color: Colors.primary800,
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primary900,
  },
  inforContainer: {
    backgroundColor: Colors.primary50,
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.primary900,
  },
});
