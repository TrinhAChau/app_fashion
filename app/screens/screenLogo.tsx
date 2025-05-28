import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ScreenLogo({ navigation }: any) {
  const style = StyleSheet.create({
    view: {
      width: 80,
      height: 80,
      margin: "auto",
    },
  });

  useEffect(() => {
    const time = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
    return () => clearTimeout(time);
  }, []);
  return (
    <>
      <View
        style={{ backgroundColor: "#0D6EFD", width: "100%", height: "100%" }}
      >
        <View style={style.view}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../public/logo-app.png")}
            resizeMode="contain"
          />
        </View>
      </View>
    </>
  );
}
