import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, MD2Colors, Searchbar } from "react-native-paper";
import { searchCategry } from "../api/category";
import { getProductType } from "../api/product";
type Product = {
  product_id: number;
  product_name: string;
  description: string;
  quantity: number;
  price: string;
  thumnails: string;
};
type Category = {
  category_id: number;
  name: string;
  description: string;
  products: Product[];
};

export default function Home({ navigation }: any) {
  const [searchText, setSearchText] = useState<string>("");

  // Lấy danh sách tìm kiếm theo danh mục
  const { data: searchCategory = [] } = useQuery<Category[]>({
    queryKey: ["searchCategory", searchText],
    queryFn: async () => {
      const response = await searchCategry(searchText);
      return response || [];
    },
    staleTime: 60 * 1000, // Không refetch trong vòng 60s
    refetchOnWindowFocus: false, // Không tự refetch khi người dùng quay lại tab
    placeholderData: (prev) => prev, // Giữ data cũ trong khi loading
    gcTime: 300000, // 5 phút giữ cache
    enabled: !!searchText,
  });

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getProductType();
      return response?.data || [];
    },
    staleTime: 60 * 1000, // Không refetch trong vòng 60s
    refetchOnWindowFocus: false, // Không tự refetch khi người dùng quay lại tab
    placeholderData: (prev) => prev, // Giữ data cũ trong khi loading
    gcTime: 300000, // 5 phút giữ cache
  });
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }
  console.log(searchText);

  const dataCategory = searchText?.trim() !== "" ? searchCategory : categories;

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Searchbar
          keyboardType="numeric"
          placeholder="Tìm kiếm danh mục"
          onChangeText={(text) => setSearchText(text)}
          style={{ width: 343, height: 48 }}
          value={searchText}
        />
      </View>
      <View>
        <Card style={styles.banner}>
          <Card.Cover
            source={{
              uri: "https://inkythuatso.com/uploads/thumbnails/800/2022/01/banner-quan-ao-inkythuatso-13-10-19-37.jpg",
            }}
            style={styles.bannerImage}
          />
        </Card>
      </View>

      {/* Hiển thị danh mục sản phẩm */}
      {dataCategory.length > 0 ? (
        dataCategory?.map((category) => (
          <View key={category?.category_id} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category?.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Product", {
                    categoryId: category?.category_id,
                  })
                }
              >
                <Text style={styles.viewAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
            >
              {category?.products.length > 0 ? (
                category?.products.map((product) => (
                  <TouchableOpacity
                    key={product?.product_id}
                    onPress={() =>
                      navigation.navigate("Detail", { id: product?.product_id })
                    }
                    style={styles.productCard}
                  >
                    <Card style={styles.card}>
                      <Card.Cover
                        style={{ width: 100, height: 100 }}
                        source={{ uri: encodeURI(product.thumnails) }}
                      />
                    </Card>

                    <Text
                      style={styles.productName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {product?.product_name || "Tên sản phẩm không có"}
                    </Text>
                    <Text style={styles.productPrice}>
                      {product.price ? `${product?.price} VNĐ` : "Giá không có"}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noProductText}>Không có sản phẩm</Text>
              )}
            </ScrollView>
          </View>
        ))
      ) : (
        <Text style={styles.noCategoryText}>Không có danh mục sản phẩm</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA", padding: 16 },
  banner: { borderRadius: 10, elevation: 4, marginBottom: 20 },
  bannerImage: { height: 200, resizeMode: "cover" },
  categoryContainer: { marginTop: 20 },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  viewAll: { fontSize: 16, color: "#007AFF" },
  productList: { flexDirection: "row", paddingHorizontal: 10, paddingTop: 10 },
  productCard: { width: 140, marginHorizontal: 6, alignItems: "center" },
  card: {
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: { height: 99, resizeMode: "cover", borderRadius: 12 },
  productName: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    maxWidth: 110,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#6055D8",
  },
  noProductText: { fontSize: 14, color: "#999", textAlign: "center" },
  noCategoryText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#FF4C4C",
  },
});
