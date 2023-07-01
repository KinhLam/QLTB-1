import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Styles";

function InputAuth({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  icon,
}) {
  return (
    <View style={[styles.inputContainer, isInvalid && styles.inputInvalid]}>
      <MaterialIcons
        style={styles.icon}
        name={icon}
        size={20}
        color="#434242"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={label}
      />
    </View>
  );
}

export default InputAuth;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    height: 65,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 20,
  },
  input: {
    fontSize: 16,
  },
  inputInvalid: {
    borderWidth: 2,
    borderColor: Colors.error500,
  },
  icon: {
    padding: 23,
  },
});
