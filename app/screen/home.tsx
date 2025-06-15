import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Các màn hình
function UserScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Quản lý Người Dùng</Text>
    </View>
  );
}

function ProductScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Quản lý Sản Phẩm</Text>
    </View>
  );
}

function CategoryScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Quản lý Danh Mục</Text>
    </View>
  );
}

function OrderScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Quản lý Đơn Hàng</Text>
    </View>
  );
}

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
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
    </Tab.Navigator>
  );
}

// CSS tối ưu
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#333" },
});
