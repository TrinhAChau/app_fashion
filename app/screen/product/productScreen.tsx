import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, IconButton, Searchbar } from "react-native-paper";

import { DeteleProduct, GetListProduct } from "@/app/api/product";

import { Product } from "@/app/types/product.type";

//Token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJyb2xlX2lkIjoxLCJpYXQiOjE3NTAwMDI5ODF9.uhsG5MBzY3dAP0ZG0wcbBYf98kZRlf50iRPDmQXSUs4";

const ProductScreen = ({ navigation }: any) => {
  //Danh sách sản phẩm
  const [products, setProducts] = useState<Product[]>([]) || null;

  //Hàm lấy data DS sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await GetListProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách người dùng:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  //Lọc dữ liệu cho thanh tìm kiếm
  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.search}
        />
        {/* Nút thêm sản phẩm*/}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CreateProduct", {
              token: token,
              refresh: fetchProducts,
            })
          }
          style={styles.addButton}
        >
          <IconButton icon="plus" iconColor="white" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.product_id?.toString() || ""}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image
                source={{ uri: item.thumnails }}
                style={styles.thumnails}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{item.product_name}</Text>
                <Text>Mô tả: {item.description}</Text>
                <Text>Số lượng: {item.quantity}</Text>
                <Text>Đơn giá: {item.price} VNĐ</Text>
                <Text>Danh mục: {item.category_name}</Text>
                <View style={styles.actions}>
                  <IconButton
                    icon="pencil"
                    onPress={() => {
                      navigation.navigate("EditProduct", {
                        productId: item.product_id,
                        token: token,
                        refresh: fetchProducts,
                      });
                    }}
                  />
                  <IconButton
                    icon="delete"
                    iconColor="red"
                    onPress={async () => {
                      try {
                        await DeteleProduct(item.product_id as number, token);
                        fetchProducts();
                      } catch (error) {
                        console.error("Lỗi khi xóa sản phẩm:", error);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  search: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 24,
    marginLeft: 8,
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#F5F7FB",
    borderRadius: 10,
    padding: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center", // Canh giữa theo chiều dọc
  },
  thumnails: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    alignSelf: "center", // Canh giữa chính ảnh trong container của nó
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
  },
});
