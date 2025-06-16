import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, IconButton, Searchbar } from "react-native-paper";

// Fake data sản phẩm
const mockProducts = [
  {
    id: "1",
    name: "Áo thun nam",
    description: "Chất liệu cotton, thoáng mát",
    quantity: 20,
    price: 200000,
    category: "Áo",
    thumnails:
      "https://th.bing.com/th/id/OIP.OFEH1_fhu1lO2diaKJ0BhAHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    id: "2",
    name: "Quần jean nữ",
    description: "Ôm dáng, co giãn nhẹ",
    quantity: 15,
    price: 350000,
    category: "Quần",
    thumnails:
      "https://th.bing.com/th/id/OIP.xJ6zOHBnJfQCi9W1z1E6xwHaLH?w=137&h=205&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
  {
    id: "3",
    name: "Áo khoác gió",
    description: "Chống thấm, phong cách thể thao",
    quantity: 10,
    price: 450000,
    category: "Áo",
    thumnails:
      "https://th.bing.com/th/id/OIP.sdIPfsOZdIVHQzVd609JSwHaJT?w=157&h=198&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
  },
];

const ProductScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          onPress={() => navigation.navigate("CreateProduct")}
          style={styles.addButton}
        >
          <IconButton icon="plus" iconColor="white" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image
                source={{ uri: item.thumnails }}
                style={styles.thumnails}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>Mô tả: {item.description}</Text>
                <Text>Số lượng: {item.quantity}</Text>
                <Text>Đơn giá: {item.price} VNĐ</Text>
                <Text>Danh mục: {item.category}</Text>
                <View style={styles.actions}>
                  <IconButton icon="pencil" onPress={() => {}} />
                  <IconButton
                    icon="delete"
                    iconColor="red"
                    onPress={() => {}}
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
