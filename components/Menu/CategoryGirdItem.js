import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Platform,
  Image,
  Alert,
} from "react-native";
import tinycolor from "tinycolor2";
function CategoryGirdItem({ title, color, image, colo, onPress }) {
  const borderColor = tinycolor(color).darken(10).toHexString();
  const backgroundColor = tinycolor(color).darken(-16).toHexString();
  return (
    <View style={[styles.gridItem, { backgroundColor: backgroundColor }]}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPreseed : null,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.innerContainer,
            {
              borderColor: borderColor,
              borderWidth: 1.5,
            },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../../constants/img/AI.png")}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}
export default CategoryGirdItem;
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 7,
    height: 189,
    borderRadius: 18,
    elevation: 10, // android
    shadowColor: "black", // ios
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible", //ios
  },
  button: {
    flex: 1,
  },
  buttonPreseed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    // backgroundColor: "green",
  },
});
