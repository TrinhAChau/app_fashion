import { detailOrderPay, getListOrder } from "@/app/api/detail";
import { getDetailProduct } from "@/app/api/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge, Button, Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Product } from "../types/product.type";

const ShoppCart = ({ navigation }: any) => {
  const route = useRoute();
  const { id } = (route.params as { id?: string }) ?? { id: null };
  const [menuVisible, setMenuVisible] = useState(false);
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [quantilyProduct, setQuantilyProduct] = useState<number>(1);
  const [isIconDisable, setIsIconDisable] = useState(true);
  // const [isToken, setIsToken] = useState<string>("");
  const [isProductId, setIsProductId] = useState<string>("");
  const [isNumberOrder, setIsNumberOrder] = useState<number>(0);
  const {
    data: detail,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["detail", id], // Thêm id vào queryKey để re-fetch khi id thay đổi
    queryFn: async () => {
      if (!id) throw new Error("No product ID provided");
      const response = await getDetailProduct(id);
      return response?.data;
    },
    enabled: !!id, // Chỉ chạy query khi có id
  });
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (detail?.price) {
      setPriceProduct(Number(detail.price));
      setTotal(Number(detail.price) * quantilyProduct);
    }
  }, [detail, quantilyProduct]);

  useEffect(() => {
    if (quantilyProduct > 1) {
      setIsIconDisable(false);
    } else {
      setIsIconDisable(true);
    }
  }, [quantilyProduct]);

  useEffect(() => {
    if (detail) {
      setIsProductId(detail?.product_id);
    }
  }, [detail]);

  // Lấy danh sách các sản phẩn đã thanh toán
  const [isToken, setIsToken] = useState<string>("");

  // Lấy token từ AsyncStorage
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("token");
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  };

  useEffect(() => {
    getData()
      .then((response) => setIsToken(response))
      .catch((error) => console.log(error));
  }, []);

  // Fetch danh sách đơn hàng
  const { data: orders, refetch } = useQuery({
    queryKey: ["orders", isToken],
    queryFn: async () => {
      const response = await getListOrder(isToken);

      return response || undefined;
    },
    staleTime: 60 * 1000, // Không refetch trong vòng 60s
    refetchOnWindowFocus: false, // Không tự refetch khi người dùng quay lại tab
    placeholderData: (prev) => prev, // Giữ data cũ trong khi loading
    gcTime: 300000, // 5 phút giữ cache
    enabled: !!isToken,
  });

  useEffect(() => {
    if (Array.isArray(orders?.data)) {
      console.log("Danh sách đơn hàng:", orders.data);
      orders.data.forEach((order: number, index: number) => {
        setIsNumberOrder(index + 1);
      });
    } else {
      console.log("Lỗi: Dữ liệu đơn hàng không phải là mảng!", orders?.data);
    }
  }, [orders]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </SafeAreaView>
    );
  }

  const handleDeteleItem = (id: string) => {
    navigation.setParams({ id: id === undefined });
  };

  // Xử lý sự kiện khi click thanh toán
  const hanleClickPay = async () => {
    try {
      const values = {
        items: [{ product_id: isProductId, quantity: quantilyProduct }],
      };

      const response = await detailOrderPay(values, isToken);
      console.log(response);

      if (response.status === HttpStatusCode.Created) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Tạo hóa đơn thành công",
        });
        refetch();

        // Hiển thị Alert để người dùng chọn hành động tiếp theo
        Alert.alert(
          "Thanh toán thành công!",
          "Bạn có muốn quay lại trang chủ hay xem chi tiết đơn hàng?",
          [
            {
              text: "Trang chủ",
              onPress: () => navigation.navigate("Main"),
              style: "cancel",
            },
            {
              text: "Trang sản phẩm",
              onPress: () => navigation.navigate("Product"),
            },
          ]
        );
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: "Tạo hóa đơn không thành công",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor="#9B59B6"
            size={24}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Giỏ hàng</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Order")}>
            <View style={{ position: "relative" }}>
              <IconButton
                icon="cart"
                iconColor="#9B59B6"
                size={24}
                // onPress={() => console.log("Mở giỏ hàng")}
              />
              {isNumberOrder > 0 && (
                <Badge
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "red",
                  }}
                >
                  {isNumberOrder}
                </Badge>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {detail?.product_id && id ? (
          <>
            {/* Menu Modal */}

            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <Image
                  source={{ uri: detail?.thumnails }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.productName}>{detail?.product_name}</Text>
                  <Text style={styles.categoryName}>
                    {detail?.category_name}
                  </Text>
                  <Text style={styles.priceText}>
                    ${detail?.price ?? "Không có giá"}
                  </Text>
                </View>
                <IconButton
                  icon="trash-can-outline"
                  iconColor="red"
                  size={24}
                  onPress={() => handleDeteleItem(detail?.product_id)}
                />
              </View>
              <View style={styles.quantityContainer}>
                <IconButton
                  disabled={isIconDisable}
                  icon="minus"
                  iconColor="#9B59B6"
                  size={24}
                  onPress={() => setQuantilyProduct(quantilyProduct - 1)}
                />
                <Text style={styles.quantity}>{quantilyProduct}</Text>
                <IconButton
                  icon="plus"
                  iconColor="#9B59B6"
                  size={24}
                  onPress={() => setQuantilyProduct(quantilyProduct + 1)}
                />
              </View>
            </Card>

            {/* Order Summary */}
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Số lượng:</Text>
                <Text style={styles.summaryText}>{quantilyProduct}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Tổng tiền:</Text>
                <Text style={styles.summaryText}>${priceProduct}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalText}>Tổng số tiền:</Text>
                <Text style={styles.totalText}>${total}</Text>
              </View>
            </Card>

            {/* Checkout Button */}
            <Button
              mode="contained"
              style={styles.checkoutButton}
              labelStyle={styles.checkoutLabel}
              onPress={hanleClickPay}
              // loading={isLoading}
            >
              Thanh toán
            </Button>
          </>
        ) : (
          <>
            <SafeAreaView style={styles.container}>
              <View style={styles.emptyContainer}>
                <Button
                  mode="contained"
                  style={styles.shopButton}
                  labelStyle={styles.shopButtonLabel}
                  onPress={() => navigation.navigate("Product")}
                >
                  Mua sắm ngay
                </Button>
              </View>
            </SafeAreaView>
          </>
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  loadingText: { textAlign: "center", marginTop: 20, fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: "#9B59B6",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  shopButtonLabel: { color: "#fff", fontSize: 16, fontWeight: "600" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#333" },
  card: { margin: 15, borderRadius: 15, elevation: 4, backgroundColor: "#fff" },
  cardContent: { flexDirection: "row", alignItems: "center", padding: 10 },
  image: { width: 120, height: 120, borderRadius: 10 },
  details: { flex: 1, marginLeft: 15 },
  productName: { fontSize: 18, fontWeight: "600", color: "#333" },
  categoryName: { fontSize: 14, color: "#666", marginVertical: 2 },
  priceText: { fontSize: 16, color: "#9B59B6", fontWeight: "500" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "flex-end",
  },
  quantity: { fontSize: 18, marginHorizontal: 15, color: "#333" },
  summaryCard: { margin: 15, padding: 15, borderRadius: 15, elevation: 4 },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  summaryText: { fontSize: 16, color: "#666" },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: { fontSize: 18, fontWeight: "700", color: "#9B59B6" },
  checkoutButton: {
    margin: 15,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#9B59B6",
    elevation: 2,
  },
  checkoutLabel: { color: "#fff", fontSize: 18, fontWeight: "600" },
  menuModal: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignSelf: "flex-end",
    marginTop: 50,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ShoppCart;
