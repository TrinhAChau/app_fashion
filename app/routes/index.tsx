import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import DetailScreen from "../screens/detail";
import ForgotPassword from "../screens/ForgotPassword";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import Register from "../screens/Register";
import ScreenLogo from "../screens/screenLogo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="ScreenLogo"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ScreenLogo" component={ScreenLogo} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
