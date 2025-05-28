import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Đây là Footer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { padding: 16, backgroundColor: "#eee" },
  text: { fontSize: 16 },
});
