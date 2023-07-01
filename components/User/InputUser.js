import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/Styles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export function InputUser({ name, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput style={[inputStyles, styles.textInput]} {...textInputConfig} />
      <Ionicons
        style={[styles.ionicons, invalid && styles.invalidIonicons]}
        name={name}
        color="gray"
        size={25}
      />
    </View>
  );
}
export function PickerUser({
  labell,
  invalid,
  style,
  PickerConfig,
  labelItem,
}) {
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
export function TextInputList({ label, textInputConfig }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const items = ["Item 1", "Item 2", "Item 3"];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <TextInput
          // {...textInputConfig}
          style={styles.input}
          value={selectedItem}
          placeholder={label}
          onFocus={toggleDropdown}
        />
        {dropdownOpen && (
          <View style={styles.dropdownList}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => selectItem(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  label: {
    paddingTop: 10,
    paddingLeft: 5,
    color: Colors.primary900,
  },
  ionicons: {
    alignItems: "center",
    lineHeight: 50,
    left: 10,
    position: "absolute",
    color: Colors.gray,
  },
  textInput: {
    height: 50,
    marginLeft: 30,
  },
  invalidIonicons: {
    borderColor: Colors.error500,
  },
  inputStyles: {
    marginLeft: 100,
    padding: 100,
    backgroundColor: "green",
  },
  input: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: Colors.primary50,
    borderRadius: 8,
    fontSize: 16,
  },
  inputInvalid: {
    borderColor: Colors.error500,
  },

  // TextInputList
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "relative",
    width: 200,
  },
  input: {
    height: 40,
    // borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  dropdownList: {
    position: "absolute",
    top: 40,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    elevation: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
