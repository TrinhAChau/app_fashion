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
import { CreateProduct as CreateProductAPI } from "../api/product";
import { Category } from "../types/category.type";
import { Product } from "../types/product.type";

const CreateProduct = ({ navigation, route }: any) => {
  const { token, refresh } = route.params;
  const [productData, setProductData] = useState<Product>({
    product_name: "",
    description: "",
    quantity: 0,
    price: "0",
    thumnails: "",
    category_id: 0,
  });
  const [showDropDown, setShowDropDown] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]) || null;
  const fetchCategories = async () => {
    try {
      const response = await GetListCategory();
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách danh mục:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  //Lấy dữ liệu của sản phẩm

  // SỰ kiện khi ấn nút submit
  const handleSubmit = async () => {
    if (
      !productData.product_name ||
      !productData.price ||
      !productData.quantity ||
      !productData.category_id
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    const payload: Product = {
      product_name: productData.product_name,
      description: productData.description,
      quantity: productData.quantity,
      price: productData.price,
      thumnails: productData.thumnails,
      category_id: productData.category_id,
    };

    try {
      await CreateProductAPI(payload, token);
      Alert.alert("Thành công", "Đã thêm sản phẩm.");
      refresh();
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
      Alert.alert("Thất bại", "Không thể thêm sản phẩm.");
    }
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
          value={productData.product_name}
          onChangeText={(text) =>
            setProductData({ ...productData, product_name: text })
          }
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Mô tả"
          value={productData.description}
          onChangeText={(text) =>
            setProductData({ ...productData, description: text })
          }
          mode="outlined"
          style={styles.input}
          multiline
        />
        <TextInput
          label="Số lượng"
          value={productData.quantity.toString()}
          onChangeText={(text) =>
            setProductData({ ...productData, quantity: parseInt(text) })
          }
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Đơn giá"
          value={productData.price}
          onChangeText={(text) =>
            setProductData({ ...productData, price: text })
          }
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          label="Hình ảnh (URL)"
          value={productData.thumnails}
          onChangeText={(text) =>
            setProductData({ ...productData, thumnails: text })
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
                setProductData({
                  ...productData,
                  category_id: item.category_id,
                });
                setShowDropDown(false);
              }}
              title={item.name}
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
