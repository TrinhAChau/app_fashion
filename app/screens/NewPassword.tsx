import AsyncStorage from "@react-native-async-storage/async-storage";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { newPasswordAccont } from "../api/authen";

export default function NewPassword({ navigation }: any) {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const onChangPassWord = (pass: string) => setPassword(pass);
  // Băt lỗi khi nhập dữ liệu không đúng trường mật khẩu
  const getPassWordError = () => {
    const error: string[] = [];
    const charRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])([A-Za-z\d@$!%*?&^#])+$/;
    if (!password.trim()) {
      error.push("Vui lòng nhập mật khẩu");
      return error;
    }
    if (!charRegex.test(password)) {
      error.push("Vui lòng nhập mật khẩu đủ mạnh (Aa@1)");
      return error;
    }
    if (password.length < 4) {
      error.push("Vui lòng nhập ít nhất 4 kí tự");
    }

    return;
  };

  // Lấy dữ liệu từ storage
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("email");
    console.log(jsonValue);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  };
  useEffect(() => {
    getData()
      .then((response) => setEmail(response.email))
      .catch((error) => console.log(error));
  }, []);

  const handleClickNewPassword = async () => {
    try {
      const values = {
        email,
        newPassword: password,
      };
      console.log(values);
      const response = await newPasswordAccont(values);
      if (response.status === HttpStatusCode.Ok) {
        await AsyncStorage.removeItem("email");
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đổi mật khẩu thành công",
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 300);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const style = StyleSheet.create({
    view1: {
      backgroundColor: "#00CCCC",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    view2: {
      justifyContent: "center",
      alignItems: "center",
      width: 350,
      height: 250,

      backgroundColor: "#FAFAFA",
      borderRadius: 16,
    },
    view3: {
      width: "100%",
    },
    textinput: {
      width: 300,
      height: 44,
    },

    button: {
      width: 300,
      maxHeight: 40,
      marginBottom: 20,
      flex: 1,
      alignItems: "center",

      backgroundColor: "#6b4faa",
      borderRadius: 16,
      flexDirection: "column",

      justifyContent: "center",
    },
    text: {
      margin: "auto",
      fontSize: 30,
      marginTop: 20,

      marginBottom: 20,
      fontWeight: "600",
    },
    text1: {
      color: "#0D6EFD",
      textAlign: "right",
      paddingRight: 25,
      fontSize: 13,
      fontWeight: 300,
      marginBottom: 12,
    },
    touchableOpacity: {
      display: "flex",
    },
  });
  return (
    <>
      <View style={style.view1}>
        <View style={style.view2}>
          <Text style={style.text}>Tạo mật khẩu mới</Text>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              onChangeText={onChangPassWord}
              style={style.textinput}
              label="Mật khẩu mới"
            />
            {getPassWordError()?.map((error, index) => (
              <HelperText visible={true} key={index} type="error">
                {error}
              </HelperText>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleClickNewPassword}
            activeOpacity={0.8}
            style={style.button}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#FFFFFF",
              }}
            >
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
        <Toast />
      </View>
    </>
  );
}
