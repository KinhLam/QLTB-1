import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/Styles";

function ErrorOverLay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
export default ErrorOverLay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: Colors.primary900,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary900,
  },
});
