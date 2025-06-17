import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Menu, Text, TextInput } from "react-native-paper";
import { GetListCategory } from "../api/caterory";
import { GetProductById, UpdateProduct } from "../api/product";
import { Category } from "../types/category.type";
import { Product } from "../types/product.type";

const EditProduct = ({ route, navigation }: any) => {
  const { productId, token, refresh } = route.params;
  const [productData, setProductData] = useState<Product>({
    product_name: "",
    description: "",
    quantity: 0,
    price: "",
    thumnails: "",
    category_id: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await GetListCategory();
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
    }
  };

  const fetchProductById = async (productId: number) => {
    try {
      const response = await GetProductById(productId);
      setProductData(response.data);
    } catch (error) {
      console.error("Lỗi lấy thông tin sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProductById(productId);
  }, []);

  const handleUpdate = async () => {
    const { product_name, price, quantity, category_id } = productData;

    if (!product_name || !price || !quantity || !category_id) {
      Alert.alert("Thiếu thông tin", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const payload = {
        ...productData,
        quantity: parseInt(quantity.toString()),
      };
      await UpdateProduct(payload, productId, token);
      Alert.alert("Thành công", "Sản phẩm đã được cập nhật.");
      refresh();
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      Alert.alert("Thất bại", "Không thể cập nhật sản phẩm.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Chỉnh sửa sản phẩm</Text>

        <TextInput
          label="Tên sản phẩm"
          value={productData.product_name}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, product_name: text }))
          }
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Mô tả"
          value={productData.description}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, description: text }))
          }
          mode="outlined"
          style={styles.input}
          multiline
        />
        <TextInput
          label="Số lượng"
          value={productData.quantity.toString()}
          onChangeText={(text) =>
            setProductData((prev) => ({
              ...prev,
              quantity: parseInt(text) || 0,
            }))
          }
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Đơn giá"
          value={productData.price.toString()}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, price: text }))
          }
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Hình ảnh (URL)"
          value={productData.thumnails}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, thumnails: text }))
          }
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
              {productData.category_id
                ? categories.find(
                    (c) => c.category_id === productData.category_id
                  )?.name
                : "Chọn danh mục"}
            </Button>
          }
        >
          {categories.map((item) => (
            <Menu.Item
              key={item.category_id}
              onPress={() => {
                setProductData((prev) => ({
                  ...prev,
                  category_id: item.category_id,
                }));
                setShowDropDown(false);
              }}
              title={item.name}
            />
          ))}
        </Menu>

        <Button mode="contained" style={styles.button} onPress={handleUpdate}>
          Cập nhật
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

export default EditProduct;

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
