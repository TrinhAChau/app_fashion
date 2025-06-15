import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import { getProduct } from "../api/product";
import { Product } from "./types/product.type";

const ProductList = ({ navigation }: any) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProduct();
      return response.data;
    },
    staleTime: 60000,
  });

  if (isLoading)
    return <Text style={styles.message}>Đang tải sản phẩm...</Text>;
  if (error)
    return <Text style={styles.message}>Đã xảy ra lỗi khi tải sản phẩm!</Text>;

  return (
    <View style={styles.screen}>
      {/* Icon Quay Lại */}
      <TouchableOpacity style={{ height: 20 }}>
        <View>
          <IconButton
            onPress={() => navigation.goBack()}
            icon="arrow-left"
            size={24}
          />
        </View>
      </TouchableOpacity>

      {/* Tiêu đề */}
      <Text style={styles.header}>Sản phẩm</Text>

      <ScrollView contentContainerStyle={styles.container}>
        {Array.isArray(products) ? (
          products.map((product) => (
            <Card
              style={styles.card}
              onPress={() =>
                navigation.navigate("Detail", { id: product?.product_id })
              }
              key={product.product_id}
            >
              <Card.Cover
                source={{ uri: product.thumnails }}
                style={styles.cover}
              />
              <Card.Content style={styles.cardContent}>
                <Text style={styles.title}>{product.product_name}</Text>
                <Text style={styles.price}>{product.price} VNĐ</Text>
              </Card.Content>
              <Card.Actions style={styles.actions}>
                <IconButton
                  icon="heart-outline"
                  onPress={() => console.log("Favorited", product.product_name)}
                  disabled={true}
                />
                <IconButton
                  icon="cart-plus"
                  onPress={() =>
                    navigation.navigate("ShoppCart", { id: product.product_id })
                  }
                />
              </Card.Actions>
            </Card>
          ))
        ) : (
          <Text style={styles.message}>Chưa có sản phẩm nào!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 40,
    marginBottom: 40,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cover: {
    height: 120,
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    alignItems: "center", // Căn giữa nội dung văn bản
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  category: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b48ff",
    textAlign: "center",
  },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});

export default ProductList;
