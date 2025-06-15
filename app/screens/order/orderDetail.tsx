import { getDetailOrder } from "@/app/api/detail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  IconButton,
  MD2Colors,
} from "react-native-paper";

const OrderDetail = ({ navigation }: any) => {
  const route = useRoute();
  const { id } = route.params as { id: string };
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
  console.log(isToken);
  console.log(id);
  const {
    data: detailOrder,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orderDetail", id, isToken],
    queryFn: async () => {
      const response = await getDetailOrder(id, isToken);
      console.log("order: ", response);
      return response?.data;
    },
    staleTime: 60 * 1000, // Không refetch trong vòng 60s
    refetchOnWindowFocus: false, // Không tự refetch khi người dùng quay lại tab
    placeholderData: (prev) => prev, // Giữ data cũ trong khi loading
    gcTime: 300000, // 5 phút giữ cache
    enabled: !!isToken || !!id,
  });

  if (isLoading) {
    return (
      <View style={{ margin: "auto" }}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      </View>
    );
  }

  if (isError || !detailOrder) {
    return (
      <View style={{ margin: "auto" }}>
        <Text style={styles.errorText}>
          Lỗi tải dữ liệu hoặc đơn hàng không tồn tại.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            marginVertical: 16,

            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 270,
            height: 20,
          }}
          onPress={() => navigation.navigate("ShoppCart")}
        >
          <IconButton icon="arrow-left" iconColor="#007AFF" size={24} />
          <Text style={{ fontSize: 16, color: "#007AFF" }}>Quay lại</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Chi tiết đơn hàng</Text>
        <Text style={styles.status}>{detailOrder.status}</Text>
      </View>

      <FlatList
        data={detailOrder.items}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.thumnails }} style={styles.image} />
            <Card.Content>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>Giá: {item.price} VND</Text>
              <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Divider style={styles.divider} />
      <View style={{ paddingBottom: 50 }}>
        <Text style={styles.total}>
          Tổng đơn hàng: {detailOrder.total_amount} VND
        </Text>

        <View style={styles.actions}>
          <Button icon="share" mode="contained" disabled={true}>
            Chia sẻ
          </Button>
          <Button
            onPress={() => navigation.navigate("ShoppCart", { id })}
            icon="cart"
            mode="outlined"
          >
            Đặt lại đơn hàng
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    marginTop: 6,
    fontWeight: "bold",
    color: "#FF9800",
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
  },
  image: {
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#757575",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#009688",
  },
  quantity: {
    marginTop: 4,
    color: "#FF5722",
  },
  divider: {
    marginVertical: 12,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "#D32F2F",
  },
});

export default OrderDetail;
