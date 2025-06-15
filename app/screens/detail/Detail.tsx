import { getDetailProduct } from "@/app/api/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Modal,
  PaperProvider,
  Text as PaperText,
  Portal,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import { Product } from "../types/product.type";
import { User } from "../types/user.type";

const Detail = ({ navigation }: any) => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [userData, setUserData] = useState<User | null>(null);
  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);

  const {
    data: detail,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["detail", id],
    queryFn: async () => {
      const response = await getDetailProduct(id);
      return response?.data;
    },
    staleTime: 60000,
  });

  const handleClickOk = async () => {
    try {
      setTimeout(() => {
        navigation.navigate("Login");
      }, 500);
    } catch (error) {
      console.log("Error logging out:", error);
    } finally {
      setVisible(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  };

  useEffect(() => {
    getData()
      .then((response) => setUserData(response))
      .catch((error) => console.log(error));
  }, []);

  const handleBuy = () => {
    if (userData?.username) {
      navigation.navigate("ShoppCart", { id: id });
    } else {
      setVisible(true);
    }
  };

  if (isLoading) {
    return <PaperText>Đang tải dữ liệu...</PaperText>;
  }

  if (isError || !detail) {
    return <PaperText>Lỗi tải dữ liệu hoặc sản phẩm không tồn tại.</PaperText>;
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={handleGoBack} color="#6b48ff" />
        </Appbar.Header>

        <View style={styles.content}>
          <Card style={styles.card}>
            <Image
              source={{ uri: detail?.thumnails }}
              style={styles.image}
              resizeMode="cover"
            />
            <Card.Content style={styles.cardContent}>
              <PaperText style={styles.title}>
                {detail?.product_name || "Tên sản phẩm không có"}
              </PaperText>
              <PaperText style={styles.price}>
                {detail && detail?.price
                  ? `${detail?.price} ĐÔ`
                  : "Giá không có"}
              </PaperText>
              <PaperText style={styles.description}>
                {detail?.description || "Mô tả không có"}
              </PaperText>
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <Button
                mode="contained"
                style={styles.buyButton}
                labelStyle={styles.buyButtonLabel}
                onPress={handleBuy}
              >
                Mua ngay
              </Button>
            </Card.Actions>
          </Card>
        </View>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <PaperText style={styles.modalTitle}>Bạn chưa đăng nhập!</PaperText>
            <PaperText style={styles.modalText}>
              Vui lòng đăng nhập trước khi sử dụng dịch vụ mua sắm.
            </PaperText>
            <View style={styles.modalButtons}>
              <Button
                mode="outlined"
                onPress={hideModal}
                style={styles.modalButton}
                labelStyle={styles.modalButtonLabel}
              >
                Ở lại
              </Button>
              <Button
                mode="contained"
                onPress={handleClickOk}
                style={styles.modalButton}
                labelStyle={styles.modalButtonLabel}
              >
                Đăng nhập
              </Button>
            </View>
          </Modal>
        </Portal>

        <Toast />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingBottom: 20,
  },
  appbar: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  card: {
    width: "100%",
    borderRadius: 15,
    elevation: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 350,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    color: "#6b48ff",
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  actions: {
    padding: 15,
    justifyContent: "center",
  },
  buyButton: {
    backgroundColor: "#6b48ff",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  buyButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    alignSelf: "center", // Sử dụng giá trị hợp lệ
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  modalButtonLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Detail;
