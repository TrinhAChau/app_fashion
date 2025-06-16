import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Menu, Text, TextInput } from "react-native-paper";

const CreateProduct = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const categories = [
    { label: "Áo", value: "Áo" },
    { label: "Quần", value: "Quần" },
    { label: "Phụ kiện", value: "Phụ kiện" },
  ];

  const handleSubmit = () => {
    if (!name || !price || !quantity || !category) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    // Tại đây bạn sẽ gọi API hoặc gửi dữ liệu qua context/store

    Alert.alert("Thành công", "Đã thêm sản phẩm.");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Thêm sản phẩm mới</Text>

        <TextInput
          label="Tên sản phẩm"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Mô tả"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          multiline
        />
        <TextInput
          label="Số lượng"
          value={quantity}
          onChangeText={setQuantity}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Đơn giá"
          value={price}
          onChangeText={setPrice}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Hình ảnh (URL)"
          value={image}
          onChangeText={setImage}
          mode="outlined"
          style={styles.input}
        />
        <Text style={{ marginBottom: 4, fontSize: 14, color: "#888" }}>
          Danh mục
        </Text>
        <Menu
          visible={showDropDown}
          onDismiss={() => setShowDropDown(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setShowDropDown(true)}
              style={styles.input}
            >
              {category ? category : "Chọn danh mục"}
            </Button>
          }
        >
          {categories.map((item) => (
            <Menu.Item
              key={item.value}
              onPress={() => {
                setCategory(item.value);
                setShowDropDown(false);
              }}
              title={item.label}
            />
          ))}
        </Menu>

        <Button mode="contained" style={styles.button} onPress={handleSubmit}>
          Thêm sản phẩm
        </Button>
        <Button
          mode="outlined"
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          Hủy
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
    justifyContent: "center",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#007AFF",
  },
  cancelButton: {
    marginTop: 8,
    borderColor: "#888",
  },
});
