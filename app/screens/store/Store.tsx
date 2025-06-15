import { searchProduct } from "@/app/api/product";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Appbar, Button, Card, Searchbar } from "react-native-paper";
import { Product } from "../types/product.type";

const Store = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState<string>("");

  const {
    data: dataSearch,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["searchData", searchText],
    queryFn: async () => {
      if (!searchText.trim()) return [];
      return await searchProduct(searchText);
    },
    enabled: !!searchText.trim(),
  });

  const handleSearch = (text: string) => {
    setSearchText(text.toLowerCase());
    refetch();
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.navigate("Main")} />
        <Searchbar
          style={styles.searchbar}
          placeholder="Tìm kiếm sản phẩm..."
          onChangeText={handleSearch}
          value={searchText}
          iconColor="#9B59B6"
        />
      </Appbar.Header>

      {/* Hiển thị kết quả tìm kiếm */}
      <View style={styles.header}>
        {searchText ? (
          <>
            <Text style={styles.resultsText}>Kết quả cho "{searchText}"</Text>
            <Text style={styles.countText}>Số lượng: {dataSearch?.length}</Text>
          </>
        ) : (
          <Text style={styles.welcomeText}>Vui lòng nhập từ khóa!</Text>
        )}
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={dataSearch}
        keyExtractor={(item) => item?.product_id.toString()}
        ListEmptyComponent={
          !searchText ? null : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không tìm thấy sản phẩm.</Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <Card style={styles.productCard}>
            <Image
              source={{ uri: item?.thumnails }}
              style={styles.productImage}
            />
            <Card.Content>
              <View style={styles.productHeader}>
                <Text style={styles.productTitle}>{item?.product_name}</Text>
                <Text style={styles.productPrice}>{item?.price}</Text>
              </View>
            </Card.Content>
            <Card.Actions style={styles.actionButton}>
              <Button
                mode="outlined"
                style={styles.favoriteButton}
                onPress={() =>
                  navigation.navigate("Detail", { id: item?.product_id })
                }
              >
                +
              </Button>
            </Card.Actions>
          </Card>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  appbar: { backgroundColor: "#fff", elevation: 2 },
  searchbar: { flex: 1, marginLeft: 10, borderRadius: 25, elevation: 1 },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  resultsText: { fontSize: 18, fontWeight: "600", color: "#333" },
  countText: { fontSize: 16, color: "#9B59B6" },
  listContent: { paddingBottom: 20, paddingHorizontal: 10 },
  productCard: { marginBottom: 15, borderRadius: 15, elevation: 4 },
  productImage: { width: "100%", height: 180 },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  productTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
  productPrice: { fontSize: 18, color: "#9B59B6" },
  actionButton: { justifyContent: "flex-end", padding: 15 },
  favoriteButton: { borderColor: "#9B59B6", borderWidth: 1, borderRadius: 20 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: { fontSize: 16, color: "#666", textAlign: "center" },
});

export default Store;
