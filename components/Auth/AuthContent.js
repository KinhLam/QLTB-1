import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../Ui/FlatButton";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin, isSignup, onAuthenticate, isLogout }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation();
  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }
  function deleteAccount() {}
  function submitHandler(credentials) {
    let { phone, password, confirmPassword } = credentials;

    phone = phone.trim();
    password = password.trim();

    const phoneIsValid = phone.length === 10;
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!phoneIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        phone: !phoneIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ phone, password });
    navigation.navigate("Verification");
  }
  function IsLogin() {
    if (isLogin && isLogout) {
      return (
        <FlatButton onPress={deleteAccount}>
          <Text>Delete Account</Text>
        </FlatButton>
      );
    } else if (isLogin || isSignup) {
      return (
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
        </FlatButton>
      );
    }
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        isLogout={isLogout}
        isSignup={isSignup}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <IsLogin />
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    alignItems: "center",
  },
  buttons: {},
});
