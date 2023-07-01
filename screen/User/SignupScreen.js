import { useContext, useState } from "react";
import AuthContent from "../../components/Auth/AuthContent";
import { createUser } from "../../util/Auth";
import LoadingOverlay from "../../components/Ui/LoadingOverLay";
import { Alert, View, Platform, KeyboardAvoidingView } from "react-native";

import { AuthContext } from "../../store/Auth-Context";
import Logo from "../../components/Ui/Logo";
import Title from "../../components/Ui/Title";
import { stylesLogScreen } from "../../constants/Styles";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ phone, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(phone, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating use..." />;
  }

  return (
    <View style={stylesLogScreen.container}>
      <KeyboardAvoidingView
        style={stylesLogScreen.containerAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Logo />
        <View style={stylesLogScreen.formContainer}>
          <Title titleLabel="Đăng ký" />
          <AuthContent isSignup onAuthenticate={signUpHandler} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default SignupScreen;
