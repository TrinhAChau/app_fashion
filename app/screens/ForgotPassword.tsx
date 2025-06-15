import AntDesign from "@expo/vector-icons/AntDesign";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { checkEmail } from "../api/authen";

export default function ForgotPassword({ navigation }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState(false);
  const [email, setEmail] = useState<string>("");

  // Trạng thái dữ liệu khi nhập
  const onchangeEmail = (pass: string) => setEmail(pass);
  // Bắt lỗi khi nhập dữ liệu không đúng định dạng của trường họ và tên
  const getemailError = () => {
    const error: string[] = [];
    const charRegex = /^[!@#$%^&*()_+-<>,.?/:";']$/;
    if (!email.trim()) {
      error.push("Vui lòng nhập email");
      return error;
    }
    if (charRegex.test(email)) {
      error.push("Trường này không được nhập kí tự đặc biệt");
      return error;
    }
    return;
  };

  const handleClickForgotPassword = async () => {
    try {
      console.log(email);
      setIsLoading(true);
      setIsDisable(true);
      const values = {
        email: email,
      };
      const response = await checkEmail(values);
      console.log("thông tin", response);
      if (response.status === HttpStatusCode.Ok) {
        await AsyncStorage.setItem("email", JSON.stringify(values));
        Toast.show({
          type: "success",
          text1: "Email hợp lệ",
          text2: "Kiểm tra email hợp lệ",
        });
        setTimeout(() => {
          navigation.navigate("NewPassword");
        }, 300);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsDisable(false);
    }
  };

  useEffect(() => {
    const isvalid = email.trim() !== "";
    setIsDisable(!isvalid);
  }, [email]);
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
    },
    text: {
      margin: "auto",
      fontSize: 30,

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
          <View
            style={{
              width: "100%", // chiếm toàn bộ chiều ngang
              flexDirection: "row", // sắp xếp theo hàng ngang
              alignItems: "center", // căn giữa theo chiều dọc
              justifyContent: "flex-start", // đẩy icon về bên trái
              padding: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={style.text}>Quên Mật Khẩu</Text>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={style.textinput}
              label="Email"
              value={email}
              onChangeText={onchangeEmail}
            />
            {getemailError()?.map((error, index) => (
              <HelperText key={index} type="error" visible={true}>
                {error}
              </HelperText>
            ))}
          </View>
          <View>
            <Button
              onPress={handleClickForgotPassword}
              style={style.button}
              mode="contained"
              loading={isLoading}
              disabled={isDisable}
            >
              Đổi mật khẩu
            </Button>
          </View>
        </View>
        <Toast />
      </View>
    </>
  );
}
