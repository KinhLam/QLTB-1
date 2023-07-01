import { View, ScrollView, StyleSheet, Image } from "react-native";
import ButtonMenu from "../../components/Ui/ButtonMenu";
import { useContext } from "react";
import { AuthContext } from "../../store/Auth-Context";
import IconsButton from "../../components/Ui/IconsButton";
import { Slogan } from "../../components/Ui/Title";

function MenuScreen({ navigation, id }) {
  const auth = useContext(AuthContext);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Image
              style={styles.image}
              source={require("../../constants/img/User.png")}
            />
          </View>
          <View style={styles.slogan}>
            <Slogan titleLabel="Smart Things" contentLabel="Thành viên" />
          </View>
        </View>
        <ButtonMenu
          icon="person-circle-outline"
          size={30}
          onPress={() => {
            navigation.navigate("Account");
          }}
        >
          Thông tin cá nhân
        </ButtonMenu>
        <ButtonMenu
          icon="ios-notifications-outline"
          size={30}
          onPress={() => {
            navigation.navigate("Nofiti");
          }}
        >
          Thông báo
        </ButtonMenu>
        <ButtonMenu
          icon="heart-outline"
          size={30}
          onPress={() => {
            navigation.navigate("Archive");
          }}
        >
          Yêu thích
        </ButtonMenu>
        <ButtonMenu icon="alert-circle-outline" size={30}>
          Trợ giúp & Phản hồi
        </ButtonMenu>

        <ButtonMenu
          icon="log-out-outline"
          size={30}
          out={{ color: "red" }}
          onPress={auth.logout}
        >
          Đăng xuất
        </ButtonMenu>
      </View>
    </ScrollView>
  );
}
export default MenuScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  slogan: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  image: {
    width: 70,
    height: 70,
    marginHorizontal: 20,
    borderRadius: 50,
  },
});
