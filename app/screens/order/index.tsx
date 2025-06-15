import { getListOrder } from "@/app/api/detail";
import { orderCancel } from "@/app/api/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const OrdersScreen = ({ navigation }: any) => {
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
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({
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

  if (isLoading) {
    return <Text style={styles.loading}>Đang tải danh sách đơn hàng...</Text>;
  }

  if (isError || !orders) {
    return <Text style={styles.error}>Không thể tải đơn hàng.</Text>;
  }
  // Xử lý sự kiện khi hủy đơn hàng
  const handleClickCancel = async (id: string) => {
    try {
      const response = await orderCancel(
        {
          status_id: 3,
        },
        isToken,
        id
      );
      console.log(response);
      if (response.status === HttpStatusCode.Ok) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Hủy đơn hàng thành công",
        });
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Hàm lấy màu sắc theo trạng thái đơn hàng
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "đang xử lý":
        return { color: "#FFA500" };
      case "hoàn thành":
        return { color: "#28A745" };
      case "đã hủy":
        return { color: "#DC3545" };
      default:
        return { color: "#007AFF" };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconButton icon="arrow-left" iconColor="#007AFF" size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Danh sách đơn hàng</Text>
        </View>

        {/* Hiển thị danh sách đơn hàng */}
        {orders?.data?.map((order: any) => (
          <Card key={order.order_id} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.details}>
                <Text style={styles.orderText}>
                  Mã đơn hàng: {order?.order_id}
                </Text>
                {/* Hiển thị ngày và giờ riêng biệt */}
                <Text style={styles.orderText}>
                  Ngày đặt: {new Date(order?.order_date).toLocaleDateString()}
                </Text>
                <Text style={styles.orderText}>
                  Giờ đặt:{" "}
                  {new Date(order?.order_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                {/* Hiển thị trạng thái với màu sắc tương ứng */}
                <Text style={[styles.orderText, getStatusStyle(order?.status)]}>
                  Trạng thái: {order?.status}
                </Text>
              </View>
            </View>

            {/* Nút xem chi tiết & hủy đơn hàng */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                style={styles.trackButton}
                labelStyle={styles.trackLabel}
                onPress={() =>
                  navigation.navigate("OrderDetail", { id: order?.order_id })
                }
              >
                Xem chi tiết
              </Button>
              <Button
                mode="contained"
                style={styles.cancelButton}
                labelStyle={styles.trackLabel}
                onPress={() => handleClickCancel(order?.order_id)}
              >
                Hủy đơn hàng
              </Button>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  headerContainer: { flexDirection: "row", alignItems: "center", padding: 15 },
  title: { fontSize: 24, fontWeight: "bold" },
  loading: { fontSize: 16, textAlign: "center", marginTop: 50 },
  error: { fontSize: 16, textAlign: "center", color: "red", marginTop: 50 },
  card: {
    margin: 10,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#FFF",
    padding: 10,
  },
  cardContent: { flexDirection: "column", alignItems: "flex-start" },
  details: { marginBottom: 10 },
  orderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  trackButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#007AFF",
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#DC3545",
    marginLeft: 5,
  },
  trackLabel: { color: "white", fontSize: 16 },
});

export default OrdersScreen;
