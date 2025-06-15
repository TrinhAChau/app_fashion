import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

// Khai báo loại cho navigation
type RootStackParamList = {
  Main: undefined;
  Store: undefined;
  ShoppCart: undefined;
  Setting: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Footer() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<keyof RootStackParamList>("Main");

  const getColor = (tab: keyof RootStackParamList) =>
    tab === activeTab ? "#007AFF" : "black";

  const handlePress = (tab: keyof RootStackParamList) => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View style={styles.footer}>
      <View style={{ flexDirection: "row", gap: 35 }}>
        <Button onPress={() => handlePress("Main")}>
          <Feather name="home" size={24} color={getColor("Main")} />
        </Button>
        <Button onPress={() => handlePress("Store")}>
          <Feather name="search" size={24} color={getColor("Store")} />
        </Button>
        <Button onPress={() => handlePress("ShoppCart")}>
          <AntDesign
            name="shoppingcart"
            size={24}
            color={getColor("ShoppCart")}
          />
        </Button>
        <Button onPress={() => handlePress("Setting")}>
          <AntDesign name="user" size={24} color={getColor("Setting")} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
