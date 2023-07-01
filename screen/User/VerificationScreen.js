import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { AuthContext } from "../../store/Auth-Context";
import GoBack from "../../components/Ui/GoBack";
import Button from "../../components/Ui/Button";
import Title from "../../components/Ui/Title";
import { verifi } from "../../util/Auth";
import { stylesLogScreen } from "../../constants/Styles";
import LoadingOverlay from "../../components/Ui/LoadingOverLay";

function VerificationScreen({ navigation }) {
  let textInput = useRef(null);
  let clockCall = null;
  const lengthInput = 4;
  const defaultCountdown = 30;
  const [internalVal, setInternalVal] = useState("");
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    clockCall = setTimeout(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearTimeout(clockCall);
    };
  }, [countdown]);

  async function onChangeNumber({ phone, password }) {
    setInternalVal("");

    setIsAuthenticating(true);
    try {
      const token = await verifi(phone, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onChangeText = (val) => {
    setInternalVal(val);
    if (val.length === lengthInput) {
      navigator.navigate("");
    }
  };
  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
    }
  };
  // useEffect(() => {
  //   textInput.focus();
  // }, []);
  function GoBackHandler() {
    navigation.goBack();
  }

  return (
    <View style={stylesLogScreen.container}>
      <GoBack onPress={GoBackHandler} />

      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={stylesLogScreen.containerAvoidingView}
      >
        <Title
          titleLabel="Xác minh tài khoản"
          contentLabel="Chúng tôi đã gữi mã xác minh tới số điện thoại của bạn"
        />
        <View style={stylesLogScreen.formContainer}>
          <View style={stylesLogScreen.textinputContainer}>
            <TouchableOpacity onPress={() => textInput.focus()}>
              <TextInput
                ref={(input) => (textInput = input)}
                onChangeText={onChangeText}
                style={{ opacity: 0, position: "absolute" }}
                value={internalVal}
                maxLength={lengthInput}
                returnKeyType="done"
                keyboardType="numeric"
                autoFocus={true}
              />
              <View style={stylesLogScreen.containerInput}>
                {Array(lengthInput)
                  .fill()
                  .map((data, index) => (
                    <View
                      key={index}
                      style={[
                        stylesLogScreen.cellView,
                        {
                          borderColor:
                            index === internalVal.length ? "#234DB7" : "gray",
                        },
                      ]}
                    >
                      <Text
                        style={stylesLogScreen.cellText}
                        onPress={() => textInput.focus()}
                      >
                        {internalVal && internalVal.length > 0
                          ? internalVal[index]
                          : ""}
                      </Text>
                    </View>
                  ))}
              </View>
            </TouchableOpacity>
            <View style={stylesLogScreen.bottomView}>
              <Button
                onPress={onChangeNumber}
                style={stylesLogScreen.btnChangeNumber}
              >
                TIẾP TỤC
              </Button>

              <TouchableHighlight onPress={onResendOTP}>
                <View style={stylesLogScreen.btnResend}>
                  <Text
                    style={[
                      stylesLogScreen.textResend,
                      { color: enableResend ? "#234DB7" : "gray" },
                    ]}
                  >
                    Gửi lại mã sau 0:{countdown}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default VerificationScreen;
