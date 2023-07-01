import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import Button from "../Ui/Button";
import { InputDevice, PickerDevice } from "../Devices/InputDevice";
import { getFormattedDate } from "../../util/Date";
import { Colors } from "../../constants/Styles";

function DevicesForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    number: {
      value: defaultValues ? defaultValues.number.toString() : "",
      isValid: true,
    },
    status: {
      value: defaultValues ? defaultValues.status : "",
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const deviceData = {
      amount: +inputs.amount.value,
      number: +inputs.number.value,
      date: new Date(inputs.date.value),
      name: inputs.name.value,
      status: inputs.status.value,
      description: inputs.description.value,
    };
    // Xác thực đầu vào nguồi dùng
    const amountIsValid = !isNaN(deviceData.amount) && deviceData.amount > 0;
    const numberIsValid = !isNaN(deviceData.number) && deviceData.number > 0;
    const dateIsValid = deviceData.date.toString() !== "Invalid Date";
    const descriptionIsValid = deviceData.description.trim().length > 0;
    const nameIsValid = deviceData.name.trim().length > 0;
    const statusIsValid = deviceData.status.trim().length > 0;

    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !nameIsValid ||
      !numberIsValid ||
      !statusIsValid
    ) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          name: { value: curInputs.name.value, isValid: nameIsValid },
          number: { value: curInputs.number.value, isValid: numberIsValid },
          status: { value: curInputs.status.value, isValid: statusIsValid },
        };
      });
      return;
    }
    onSubmit(deviceData);
  }
  const formIsInvalid =
    !inputs.amount.value ||
    !inputs.date.value ||
    !inputs.name.value ||
    !inputs.status.value ||
    !inputs.number.value ||
    !inputs.description.value;
  return (
    <View style={styles.from}>
      <Text style={styles.title}>Your Device</Text>
      <InputDevice
        label="Name"
        invalid={!inputs.name.isValid}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <View style={styles.inputsRow}>
        <InputDevice
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            placeholder: "xx => xx.000",
            KeyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <InputDevice
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            defaultValue: inputs.date.value,
          }}
        />
      </View>
      <View style={styles.inputsRow}>
        <PickerDevice
          style={styles.rowInput}
          labell="Status"
          invalid={!inputs.status.isValid}
          PickerConfig={{
            onValueChange: inputChangeHandler.bind(this, "status"),
            selectedValue: inputs.status.value,
          }}
        />
        <InputDevice
          style={styles.rowInput}
          label="Number"
          invalid={!inputs.number.isValid}
          textInputConfig={{
            KeyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "number"),
            value: inputs.number.value,
          }}
        />
      </View>
      <InputDevice
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: "none",
          // autoCorrect: false, // Default is true
          onChangeText: inputChangeHandler.bind(this, "description"),
          defaultValue: inputs.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default DevicesForm;
const styles = StyleSheet.create({
  from: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary900,
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    paddingHorizontal: 8,
  },
});
