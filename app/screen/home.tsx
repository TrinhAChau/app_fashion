import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CategoryScreen from "./category/categoryScreen";
import ProductScreen from "./product/productScreen";
import UserScreen from "./user/userScreen";
// Các màn hình

// Điều hướng tab với icon
const Tab = createBottomTabNavigator();

export default function AdminPanel() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "help-circle-outline";

          if (route.name === "User") {
            iconName = "person-circle-outline";
          } else if (route.name === "Product") {
            iconName = "cube-outline";
          } else if (route.name === "Category") {
            iconName = "layers-outline";
          } else if (route.name === "Order") {
            iconName = "cart-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 },
      })}
    >
      <Tab.Screen name="Quản lý người dùng" component={UserScreen} />
      <Tab.Screen name="Quản lý sản phẩm" component={ProductScreen} />
      <Tab.Screen name="Quản lý danh mục" component={CategoryScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
