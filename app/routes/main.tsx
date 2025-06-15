// MainScreens.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DefaultLayout from "../layout/defaultLayout";
import HomeScreen from "../screens/Home";

const MainStack = createNativeStackNavigator();

export default function MainScreens() {
  return (
    <DefaultLayout>
      <MainStack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <MainStack.Screen name="Home" component={HomeScreen} />
      </MainStack.Navigator>
    </DefaultLayout>
  );
}
