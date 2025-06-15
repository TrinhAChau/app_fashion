import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function ScreenLogo({ navigation }: any) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Bắt đầu nhỏ hơn 1

  useEffect(() => {
    // Tạo animation phóng to
    Animated.timing(scaleAnim, {
      toValue: 1.5, // Kích thước phóng to
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Sau 3s chuyển trang
    const time = setTimeout(() => {
      navigation.replace("Main");
    }, 3000);

    return () => clearTimeout(time);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../public/logo-app.png")}
        resizeMode="contain"
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D6EFD",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
