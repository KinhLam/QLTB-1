import { View, StyleSheet, Text } from "react-native";
import UserList from "./UserList";
import { Colors } from "../../constants/Styles";

function UserOutput({ users, usersPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  if (users.length > 0) {
    content = <UserList users={users} />;
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}
export default UserOutput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: "white",
  },
  infoText: {
    color: Colors.primary900,
    paddingTop: 160,
    fontSize: 50,
    textAlign: "center",
    marginTop: 32,
  },
});
