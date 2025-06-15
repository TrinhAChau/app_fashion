import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateCategory from "./components/category";
import CreateOrder from "./components/order";
import CreateProduct from "./components/product";
import CreateUser from "./components/user";
import ListCategory from "./screen/category/listCategory";
import { default as AdminPanel, default as Home } from "./screen/home";
import Login from "./screen/login";
import ListOrder from "./screen/order/listOrder";
import ListProduct from "./screen/product/listProduct";
import ListUser from "./screen/user/listUser";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="CreateOrder" component={CreateOrder} />
        <Stack.Screen name="CreateProduct" component={CreateProduct} />
        <Stack.Screen name="CreateCategory" component={CreateCategory} />
        <Stack.Screen name="ListUser" component={ListUser} />
        <Stack.Screen name="ListOrder" component={ListOrder} />
        <Stack.Screen name="ListCategory" component={ListCategory} />
        <Stack.Screen name="ListProduct" component={ListProduct} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
      </Stack.Navigator>
    </>
  );
}
