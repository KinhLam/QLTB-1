import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Keyboard,
} from "react-native";
function Logo() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const { width, height } = useWindowDimensions();

  let imageSize = 200;
  if (width < 500) {
    imageSize = 100;
  }
  if (height < 500) {
    imageSize = 100;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
  };
  return (
    !isKeyboardVisible && (
      <View style={styles.logoContainer}>
        <View style={styles.containerImage}>
          <Image
            style={[styles.image, imageStyle]}
            source={require("../../constants/img/logo.png")}
          />
        </View>
        <Text style={styles.title}>SMART THINGS</Text>
        <Text>SUCCESS TOGETHER</Text>
      </View>
    )
  );
}
export default Logo;
const styles = StyleSheet.create({
  logoContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  containerImage: {},
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  image: {},
});
