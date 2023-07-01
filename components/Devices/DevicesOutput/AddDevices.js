import { View, StyleSheet } from "react-native";
import IconsButton from "../../Ui/IconsButton";
import { Colors } from "../../../constants/Styles";
function AddDevice({ onPress }) {
  return (
    <View style={styles.add}>
      <IconsButton
        icon="add-outline"
        size={40}
        color={Colors.primary50}
        onPress={onPress}
      />
    </View>
  );
}
export default AddDevice;
const styles = StyleSheet.create({
  add: {
    position: "absolute",
    right: 20,
    bottom: 90,
    backgroundColor: Colors.primary800,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
