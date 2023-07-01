import { StyleSheet } from "react-native";

export const Colors = {
  primary50: "#E8F9FD",
  primary100: "#B3E5FC",
  primary200: "#81D4fA",
  primary300: "#4FC3F7",
  primary400: "#29B6FC",
  primary500: "#03A9F4",
  primary600: "#0AA1DD",
  primary700: "#0288D1",
  primary800: "#2155CD",
  primary900: "#000080",
  error100: "#FFBABA",
  error500: "#9C0006",
  background: "white",

  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
  gray: "#6B7280",
  lightGreen: "rgba(16,185,129,0.1)",
};

export const stylesLogScreen = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  containerAvoidingView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    marginVertical: 20,
  },
  textinputContainer: {
    alignItems: "center",
    height: 200,
  },
  containerInput: {
    flexDirection: "row",
  },
  cellView: {
    width: 56,
    height: 56,
    margin: 5,
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 35,
  },

  bottomView: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    marginBottom: 50,
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
  },

  btnResend: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textResend: {
    alignItems: "center",
    fontSize: 16,
  },
});

export const stylesTabBar = StyleSheet.create({
  tabBar: {
    marginHorizontal: 6,
    marginVertical: 8,
    height: 80,
    position: "absolute",
    backgroundColor: "white",
    elevation: 6,
    borderRadius: 20,
  },
  tabBarLabel: {
    textAlign: "center",
    fontSize: 14,
    bottom: 8,
  },
  icon: {
    lineHeight: 70,
  },
  containerIconAdd: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.primary800,
    alignItems: "center",
    justifyContent: "center",
  },
  iconAdd: {
    color: Colors.primary50,
  },
});
