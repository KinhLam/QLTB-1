import { Image, View, StyleSheet } from "react-native";

import AuthContent from "../../components/Auth/AuthContent";
import GoBack from "../../components/Ui/GoBack";

function AccountScreen({ navigation }) {
  function updateAuthehcationHandler() {
    //
  }
  function GoBackHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <GoBack onPress={GoBackHandler} />
      <View style={styles.images}>
        <Image
          style={styles.image}
          source={require("../../constants/img/User.png")}
        />
      </View>
      <AuthContent
        isLogout
        isLogin
        onAuthenticate={updateAuthehcationHandler}
      />
    </View>
  );
}

export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  images: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
