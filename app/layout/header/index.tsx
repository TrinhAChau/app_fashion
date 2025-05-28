import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Đây là Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16, backgroundColor: "#ccc" },
  text: { fontSize: 18 },
});
