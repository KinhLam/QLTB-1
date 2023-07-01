import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import Button from "../Ui/Button";
import { InputUser, PickerUser, TextInputList } from "./InputUser";
import { getFormattedDate } from "../../util/Date";
import { Colors } from "../../constants/Styles";

function UserForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    gender: {
      value: defaultValues ? defaultValues.gender : "",
      isValid: true,
    },
    dateBirth: {
      value: defaultValues ? getFormattedDate(defaultValues.dateBirth) : "",
      isValid: true,
    },
    email: {
      value: defaultValues ? defaultValues.email.includes("@") : "",
      isValid: true,
    },
    level: {
      value: defaultValues ? defaultValues.level : "",
      isValid: true,
    },
    majors: {
      value: defaultValues ? defaultValues.majors : "",
      isValid: true,
    },
    classroom: {
      value: defaultValues ? defaultValues.classroom : "",
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
    const UserData = {
      name: inputs.name.value,
      gender: inputs.gender.value,
      dateBirth: new Date(inputs.dateBirth.value),
      email: inputs.email.value,
      level: inputs.level.value,
      majors: inputs.majors.value,
      classroom: inputs.classroom.value,
    };
    // Xác thực đầu vào nguồi dùng
    const nameIsValid = UserData.name.trim().length > 0;
    const genderIsValid = UserData.gender.trim().length > 0;
    const dateBirthIsValid = UserData.dateBirth.toString() !== "Invalid Date";
    const emailIsValid = UserData.email.includes("@").length > 0;
    const levelIsValid = UserData.level.trim().length > 0;
    const majorsIsValid = UserData.majors.trim().length > 0;
    const classroomIsValid = UserData.classroom.trim().length > 0;
    if (
      !nameIsValid ||
      !genderIsValid ||
      !dateBirthIsValid ||
      !emailIsValid ||
      !levelIsValid ||
      !majorsIsValid ||
      !classroomIsValid
    ) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          gender: { value: curInputs.gender.value, isValid: genderIsValid },
          dateBirth: {
            value: curInputs.dateBirth.value,
            isValid: dateBirthIsValid,
          },
          email: { value: curInputs.email.value, isValid: emailIsValid },
          level: { value: curInputs.level.value, isValid: levelIsValid },
          majors: { value: curInputs.majors.value, isValid: majorsIsValid },
          classroom: {
            value: curInputs.classroom.value,
            isValid: classroomIsValid,
          },
        };
      });
      return;
    }
    onSubmit(UserData);
  }
  const formIsInvalid =
    !inputs.name.value ||
    !inputs.gender.value ||
    !inputs.dateBirth.value ||
    !inputs.email.value ||
    !inputs.level.value ||
    !inputs.majors.value ||
    !inputs.classroom.value;
  return (
    <View style={styles.from}>
      <Text style={styles.title}>Chỉnh sửa thông tin</Text>
      <InputUser
        name="md-person-outline"
        invalid={!inputs.name.isValid}
        textInputConfig={{
          placeholder: "Name",
          onChangeText: inputChangeHandler.bind(this, "name"),
          value: inputs.name.value,
        }}
      />
      <View style={styles.inputsRow}>
        <InputUser
          style={styles.rowInput}
          name="heart-outline"
          invalid={!inputs.gender.isValid}
          textInputConfig={{
            placeholder: "Nam/Nữ",
            onChangeText: inputChangeHandler.bind(this, "gender"),
            value: inputs.gender.value,
          }}
        />
        <InputUser
          style={styles.rowInput}
          invalid={!inputs.dateBirth.isValid}
          name="calendar-outline"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "dateBirth"),
            defaultValue: inputs.dateBirth.value,
          }}
        />
      </View>
      <InputUser
        name="briefcase-outline"
        invalid={!inputs.email.isValid}
        textInputConfig={{
          placeholder: "Smartthings@gmail.com",
          onValueChange: inputChangeHandler.bind(this, "email"),
          selectedValue: inputs.email.value,
        }}
      />
      <InputUser
        name="briefcase-outline"
        invalid={!inputs.level.isValid}
        textInputConfig={{
          placeholder: "Năm 3",
          onChangeText: inputChangeHandler.bind(this, "level"),
          value: inputs.level.value,
        }}
      />
      <InputUser
        name="cog-outline"
        invalid={!inputs.majors.isValid}
        textInputConfig={{
          placeholder: "Công nghệ thông tin",
          onChangeText: inputChangeHandler.bind(this, "majors"),
          defaultValue: inputs.majors.value,
        }}
      />
      <InputUser
        name="git-pull-request-outline"
        invalid={!inputs.classroom.isValid}
        textInputConfig={{
          placeholder: "21CT114",
          onChangeText: inputChangeHandler.bind(this, "classroom"),
          defaultValue: inputs.classroom.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default UserForm;
const styles = StyleSheet.create({
  from: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary900,
    marginVertical: 24,
    textAlign: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    paddingHorizontal: 8,
  },
});
