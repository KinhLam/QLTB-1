import { StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/Styles";

export function InputDevice({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}
export function PickerDevice({ labell, invalid, style, PickerConfig }) {
  const inputStyles = [styles.input];
  if (PickerConfig && PickerConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {labell}
      </Text>
      <Picker style={inputStyles} {...PickerConfig}>
        <Picker.Item label="borrowed" value="borrowed" />
        <Picker.Item label="not borrowed yet" value="not borrowed" />
      </Picker>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary50,
  },
  label: {
    paddingTop: 10,
    paddingLeft: 5,
    color: Colors.primary900,
  },

  input: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary50,
    borderRadius: 8,
    fontSize: 16,
  },
  inputInvalid: {
    borderWidth: 2,
    borderColor: Colors.error500,
  },
});
