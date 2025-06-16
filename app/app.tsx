import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateOrder from "./components/order";
import CreateProduct from "./components/product";
import { default as AdminPanel, default as Home } from "./screen/home";
import Login from "./screen/login";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateOrder" component={CreateOrder} />
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
      </Stack.Navigator>
    </>
  );
}
