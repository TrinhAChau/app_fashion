// App.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screens/detail/index";
import ForgotPassword from "../screens/ForgotPassword";
import LoginScreen from "../screens/Login";
import NewPassword from "../screens/NewPassword";
import OrdersScreen from "../screens/order/index";
import OrderDetail from "../screens/order/orderDetail";
import ProductList from "../screens/Product";
import Register from "../screens/Register";
import ScreenLogo from "../screens/ScreenLogo";
import Setting from "../screens/Setting";
import ShoppCart from "../screens/shoppcart/index";
import Store from "../screens/store/index";
import { RootStackParamList } from "../screens/types/routeStack.type";
import MainScreens from "./main"; // đường dẫn đúng tới file bạn vừa tách

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="ScreenLogo"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ScreenLogo" component={ScreenLogo} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Main" component={MainScreens} />
      <Stack.Screen name="ShoppCart" component={ShoppCart} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Order" component={OrdersScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Product" component={ProductList} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
}
