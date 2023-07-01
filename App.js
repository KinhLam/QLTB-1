import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import {
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  AntDesign,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import { View } from "react-native";

import LoginScreen from "./screen/User/LoginScreen";
import SignupScreen from "./screen/User/SignupScreen";
import VerificationScreen from "./screen/User/VerificationScreen";

import ListScreen from "./screen/ListScreen";
import { Colors, stylesTabBar } from "./constants/Styles";
import AuthContextProvider, { AuthContext } from "./store/Auth-Context";
import IconButton from "./components/Ui/IconsButton";
import AccountScreen from "./screen/Menu/AccountScreen";
import NotificationScreen from "./screen/Menu/Notification";
import AddListScreen from "./screen/AddListScreen";
import ExistingDevices from "./screen/ExistingDevices";
import DevicesContextProvider from "./store/Devices-context";
import MenuScreen from "./screen/Menu/MenuScreen";
import ArchiveScreen from "./screen/Menu/ArchiveScreen";
import EditInformationScreen from "./screen/User/EditInformationScreen";
import InformationScreen from "./screen/User/InformationScreen";
import UsersContextProvider from "./store/InforUser-Context";
import HomeScreen from "./screen/Menu/HomeScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="EditInformation" component={EditInformationScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function AuthenticatedStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return (
              <Ionicons
                style={stylesTabBar.icon}
                name={iconName}
                size={30}
                color={color}
              />
            );
          } else if (route.name === "favourite") {
            iconName = focused ? "heart-fill" : "heart";
          } else if (route.name === "Notification") {
            iconName = focused ? "bell-fill" : "bell";
          } else if (route.name === "MenuStack") {
            iconName = focused ? "gears" : "gear";
            return (
              <FontAwesome
                style={stylesTabBar.icon}
                name={iconName}
                size={30}
                color={color}
              />
            );
          }
          return (
            <Octicons
              style={stylesTabBar.icon}
              name={iconName}
              size={30}
              color={color}
            />
          );
        },

        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        tabBarLabelStyle: {
          ...stylesTabBar.tabBarLabel,
        },
        tabBarActiveTintColor: Colors.primary500,
        headerShown: false,
        tabBarStyle: [
          {
            ...stylesTabBar.tabBar,
          },
          null,
        ],

        headerRight: () => (
          <IconButton
            icon="person-circle-outline"
            color="white"
            size={30}
            onPress={() => navigation.navigate("Account")}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="favourite" component={ExistingDevices} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          title: "Cài đặt",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Cài đặt",
        }}
      />
      <Stack.Screen name="Nofiti" component={NotificationScreen} />
      <Stack.Screen name="Archive" component={ArchiveScreen} />
    </Stack.Navigator>
  );
}

function AuthenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthenticatedStack"
        component={AuthenticatedStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddList"
        component={AddListScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated && <AuthStack />}
      {!authCtx.isAuthenticated && <AuthenStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <UsersContextProvider>
          <DevicesContextProvider>
            <Root />
          </DevicesContextProvider>
        </UsersContextProvider>
      </AuthContextProvider>
    </>
  );
}
