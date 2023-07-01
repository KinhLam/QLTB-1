import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/Styles";
import { getFormattedDate } from "../../util/Date";
function UserItem({ id, name, gender, date, email, level, majors, classroom }) {
  const navigation = useNavigation();
  function usersPressHandler() {
    navigation.navigate("AddList", {
      userId: id,
    });
  }
  return (
    <View style={styles.container}>
      <Pressable
        onPress={usersPressHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.UserItem}>
          <View style={styles.title}>
            <Text>Thông Tin cá nhân</Text>
          </View>
          <View style={styles.item}>
            <View style={itemRow}>
              <View style={rowItem}>
                <Text style={styles.text}>
                  Ngày sinh: {getFormattedDate(date)}
                </Text>
                <Text style={styles.name}>Sinh viên{level}</Text>
              </View>
              <View style={rowItem}>
                <Text style={styles.text}>Giới tính: {gender}</Text>
                <Text style={styles.name}>Lớp{classroom}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Khoa: {majors}</Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={usersPressHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.UserItem}>
          <View style={styles.title}>
            <Text>Thông tin liên lạc</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Địa chỉ: Đại học Lạc Hồng</Text>
            <Text style={styles.text}>Email: {email}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
export default UserItem;
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  usersItem: {
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 90,
    backgroundColor: Colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 25,
    elevation: 6,
    shadowColor: Colors.gray50,
    shadowRadius: 50,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary900,
  },
  text: {
    color: Colors.primary800,
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primary900,
  },
  inforContainer: {
    backgroundColor: Colors.primary50,
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.primary900,
  },
});
