import { getProfile, updateUser } from "@/app/api/authen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  Text as PaperText,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Icon,
  Modal,
  PaperProvider,
  Portal,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import { RootStackParamList } from "../types/routeStack.type";
import { User } from "../types/user.type";

type NavigationProps = NavigationProp<RootStackParamList>;

export default function Setting() {
  const navigation = useNavigation<NavigationProps>();
  const [useData, setUseData] = useState<User | null>(null);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false); // Thêm modal cập nhật
  const [token, setToken] = useState<string>("");
  const [isPhone, setIsPhone] = useState<string>("");
  const [isUserName, setIsUserName] = useState<string>("");
  const [isEmail, setIsEmail] = useState<string>("");
  const [isAddress, setIsAddress] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const hideModal = () => setVisible(false);
  const hideEditModal = () => setEditVisible(false);

  const hideModalLogin = () => setIsVisible(false);

  const handleChangeUserName = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setIsUserName(event.nativeEvent.text); // Chỉ lấy giá trị chuỗi từ sự kiện
  };
  const handleChangeEmail = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setIsEmail(event.nativeEvent.text); // Chỉ lấy giá trị chuỗi từ sự kiện
  };
  const handleChangePhone = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setIsPhone(event.nativeEvent.text); // Chỉ lấy giá trị chuỗi từ sự kiện
  };
  const handleChangeAddress = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setIsAddress(event.nativeEvent.text); // Chỉ lấy giá trị chuỗi từ sự kiện
  };

  // Lấy thông tin chi tiết của người dùng
  const { data: profile, refetch } = useQuery({
    queryKey: ["profile", token],
    queryFn: async () => {
      const values = {
        email: useData?.email,
        password: useData?.password,
      };
      const response = await getProfile(values, token);
      return response;
    },
    staleTime: 60000,
  });
  console.log(profile);
  const getData = () => {
    AsyncStorage.getItem("user")
      .then((data) => setUseData(data ? JSON.parse(data) : null))
      .catch(console.error);
  };
  useEffect(() => {
    getData();
  }, [editVisible]);

  // Lấy token từ AsyncStorage
  const getToken = async () => {
    const jsonValue = await AsyncStorage.getItem("token");
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  };

  useEffect(() => {
    getToken()
      .then((response) => setToken(response))
      .catch((error) => console.log(error));
  }, []);
  console.log(token);

  // const handleLogout = () => setVisible(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("token");
        setToken(jsonValue ? JSON.parse(jsonValue) : "");
      } catch (error) {
        console.error("Error fetching token", error);
      }
    };
    fetchToken();
  }, []);

  const handleLogout = () => {
    setVisible(true);
  };

  const handleClickOk = async () => {
    try {
      Toast.show({
        type: "success",
        text1: "Đăng xuất thành công!",
      });
      await AsyncStorage.multiRemove(["token", "user"]);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 500);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setVisible(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const values = {
        username: isUserName,
        email: isEmail,
        phone: isPhone,
        address: isAddress,
      };
      const response = await updateUser(values, token);
      if (response.status === HttpStatusCode.Ok) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Thay đổi thông tin thành công!",
        });
        await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
        setUseData(response.data.data);
        refetch();
        hideEditModal();
      }
    } catch (error) {
      console.error("Update failed", error);
      setVisible(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.screen}>
        {/* Avatar + Thông tin người dùng */}
        <View style={styles.profileContainer}>
          <Avatar.Image
            source={{
              uri:
                useData?.avatar ||
                "https://th.bing.com/th/id/OIP.kQyrx9VbuWXWxCVxoreXOgHaHN?rs=1&pid=ImgDetMain",
            }}
            size={90}
          />
          <Text style={styles.username}>
            {useData?.username || "Chưa có tên"}
          </Text>

          {/* Thông tin theo hàng dọc */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Icon source="email" size={24} />
              <Text style={styles.infoText}>
                {useData?.email || "Chưa có email"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon source="phone" size={24} />
              <Text style={styles.infoText}>
                {useData?.phone || "Chưa có số điện thoại"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon source="map-marker" size={24} />
              <Text style={styles.infoText}>
                {useData?.address || "Chưa có địa chỉ"}
              </Text>
            </View>
          </View>

          {/* Nút Cập nhật */}
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              if (useData?.username) {
                setIsUserName(useData.username);
                setIsEmail(useData.email || "");
                setIsPhone(useData.phone || "");
                setIsAddress(useData.address || "");
                setEditVisible(true);
              } else {
                setIsVisible(true);
              }
            }}
          >
            <Icon source="pencil" size={22} color="white" />
            <Text style={styles.updateText}>Cập nhật</Text>
          </TouchableOpacity>
        </View>

        {/* Button đăng xuất */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon source="logout" size={24} color="white" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Xác nhận Đăng xuất */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalText}>
            Bạn có chắc muốn đăng xuất không?
          </Text>
          <View style={styles.modalActions}>
            <Button onPress={hideModal}>
              <Text style={styles.modalButton}>Không</Text>
            </Button>
            <Button onPress={handleClickOk}>
              <Text style={[styles.modalButton, styles.modalButtonOk]}>OK</Text>
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Modal hienr thị khi chưa đăng nhập */}
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={hideModalLogin}
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
              // style={styles.modalButton}
              labelStyle={styles.modalButtonLabel}
            >
              Ở lại
            </Button>
            <Button
              mode="contained"
              onPress={handleClickOk}
              // style={styles.modalButton}
              labelStyle={styles.modalButtonLabel}
            >
              Đăng nhập
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Modal Cập nhật thông tin */}
      <Portal>
        <Modal
          visible={editVisible}
          onDismiss={hideEditModal}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalText}>Cập nhật thông tin cá nhân</Text>

          <TextInput
            style={styles.input}
            placeholder="Tên"
            // defaultValue={useData?.username}
            onChange={handleChangeUserName}
            value={isUserName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            // defaultValue={useData?.email}
            onChange={handleChangeEmail}
            value={isEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            onChange={handleChangePhone}
            value={isPhone}
            // defaultValue={useData?.phone}
          />
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            // defaultValue={useData?.address}
            onChange={handleChangeAddress}
            value={isAddress}
          />
          <View style={styles.modalActions}>
            <Button onPress={hideEditModal}>
              <Text style={styles.modalButton}>Hủy</Text>
            </Button>
            <Button onPress={handleUpdate}>
              <Text style={[styles.modalButton, styles.modalButtonOk]}>
                Lưu
              </Text>
            </Button>
          </View>
        </Modal>
      </Portal>

      <Toast />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 4,
    width: "90%",
  },
  username: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
    marginTop: 20,
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#555",
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "90%",
    marginTop: 20,
  },
  updateText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F55F1F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "90%",
    marginTop: 20,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },

  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  modalButtonOk: {
    color: "#F55F1F",
  },
});
