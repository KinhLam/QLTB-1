import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "../Ui/Button";
import Input from "./InputAuth";
import FlatButton from "../Ui/FlatButton";
import { AuthContext } from "../../store/Auth-Context";

function AuthForm({
  isLogin,
  isSignup,
  isLogout,
  onSubmit,
  credentialsInvalid,
  navigation,
}) {
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    phone: phoneIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "phone":
        setEnteredPhone(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      phone: enteredPhone,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  function IsLogin() {
    const auth = useContext(AuthContext);
    if (isLogin && isLogout) {
      return (
        <Button onPress={auth.logout} width={styles.width}>
          <Text>Log out</Text>
        </Button>
      );
    } else if (isLogin || isSignup) {
      return (
        <View>
          <View style={styles.forgotPass}>
            <FlatButton> {isLogin ? "Quên mật khẩu??" : ""}</FlatButton>
          </View>
          <View>
            <Button onPress={submitHandler} width={styles.width}>
              {isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
            </Button>
          </View>
        </View>
      );
    }
  }
  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Number Phone"
          onUpdateValue={updateInputValueHandler.bind(this, "phone")}
          value={enteredPhone}
          keyboardType="numeric"
          isInvalid={phoneIsInvalid}
          icon="phone-in-talk"
        />

        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
          icon="vpn-key"
        />
        {isSignup && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
            icon="vpn-key"
          />
        )}

        <View style={styles.buttons}>
          <IsLogin />
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    alignItems: "center",
  },
  width: {
    width: 300,
  },
  forgotPass: {
    alignItems: "flex-end",
  },
});
