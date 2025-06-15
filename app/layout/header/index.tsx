import { User } from "@/app/screens/types/user.type";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

export default function Header() {
  const [text, setText] = useState<string>("");
  const [useData, setUseData] = useState<User | null>(null);

  // Lấy dữ liệu từ storage
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    console.log(jsonValue);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  };

  useEffect(() => {
    getData()
      .then((response) => setUseData(response))
      .catch((error) => console.log(error));
  }, []);
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View>
            {" "}
            <Avatar.Image
              size={48}
              source={{
                uri: "https://th.bing.com/th/id/OIP.kQyrx9VbuWXWxCVxoreXOgHaHN?rs=1&pid=ImgDetMain",
              }}
            />
          </View>
          <View>
            <View>
              <Text>Hello !</Text>
            </View>
            <View>
              <Text style={{ fontWeight: 600 }}>
                {useData?.username || "Chưa có tên"}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            console.log("Bạn đã nhấn");
          }}
          style={({ pressed }) => ({
            width: 48,
            height: 48,
            borderRadius: 100,
            backgroundColor: pressed ? "#e0e0e0" : "#F8F7F7", // hiệu ứng "hover"
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Ionicons name="notifications-outline" size={20} color="#7C7979" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16, marginTop: 64 },
  text: { fontSize: 18 },
});
