import { Pressable, StyleSheet, Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconsButton({ icon, color, size, onPress, isImage }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      {isImage && (
        <View style={styles.images}>
          <Image
            style={styles.image}
            source={require("../../constants/img/logoTitle.png")}
          />
        </View>
      )}
      {!isImage && <Ionicons name={icon} color={color} size={size} />}
    </Pressable>
  );
}

export default IconsButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  images: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: 60,
    borderRadius: 50,
  },
});
