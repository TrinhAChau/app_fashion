import {
  default as AsyncStorage,
  default as AsyncStorege,
} from "@react-native-async-storage/async-storage";
import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Appbar,
  Button,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import { LoginAccount } from "../api/authen";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  // const onChangeText = (text: string) => setText(text);
  const onChangeName = (name: string) => setEmail(name);
  const onChangPassword = (pass: string) => setPassword(pass);

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
  // Băt lỗi khi nhập dữ liệu không đúng trường mật khẩu
  const getPasswordError = () => {
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

  useEffect(() => {
    const isValid = email.trim() !== "" && password.trim() !== "";
    setIsDisable(!isValid);
  }, [email, password]);

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
      color: "#FFFFFF",
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

  const handleClickLogin = async () => {
    try {
      setIsLoading(true);
      setIsDisable(true);
      const values = {
        email: email,
        password: password,
      };
      console.log(values);
      const response = await LoginAccount(values);
      console.log(response.status);
      if (response.status === HttpStatusCode.Ok) {
        console.log(response.data.token);
        await AsyncStorege.setItem(
          "user",
          JSON.stringify(response?.data?.profile)
        );
        await AsyncStorege.setItem(
          "token",
          JSON.stringify(response?.data?.token)
        );
        Toast.show({
          type: "success",
          text1: "Đăng nhập thành công!",
          text2: "Chào mừng bạn quay lại ",
        });
        setTimeout(() => {
          navigation.navigate("Main");
        }, 300);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Đăng nhập không thành công",
        text2: "Email hoặc mật khẩu không chính xác",
      });
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setIsDisable(false);
      }, 300);
    } finally {
      setIsLoading(false);
      setIsDisable(false);
    }
  };
  const handleGoBack = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Main");
  };
  return (
    <>
      <View style={style.view1}>
        <View style={style.view2}>
          <View>
            <Appbar.Header
              style={{ position: "absolute", right: 100, width: "100%" }}
            >
              <Appbar.BackAction onPress={handleGoBack} />
            </Appbar.Header>

            <Text style={style.text}>Đăng Nhập</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={style.textinput}
              label="Email"
              value={email}
              onChangeText={onChangeName}
            />
            {getemailError()?.map((error, index) => (
              <HelperText key={index} type="error" visible={true}>
                {error}
              </HelperText>
            ))}
          </View>
          <View style={{ marginBottom: 20 }}>
            <TextInput
              label="Mật khẩu"
              secureTextEntry
              style={style.textinput}
              value={password}
              onChangeText={onChangPassword}
            />
            {getPasswordError()?.map((error, index) => (
              <HelperText key={index} visible={true} type="error">
                {error}
              </HelperText>
            ))}
          </View>
          <View style={style.view3}>
            <TouchableOpacity style={style.touchableOpacity}>
              <Text
                onPress={() => navigation.navigate("ForgotPassword")}
                style={style.text1}
              >
                Quên mật khẩu
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              onPress={handleClickLogin}
              style={style.button}
              loading={isLoading}
              mode="contained"
              disabled={isDisable}
            >
              Đăng nhập
            </Button>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: 315,
              height: 40,
              justifyContent: "center",
              gap: 12,
              alignItems: "center",
              backgroundColor: "#F7F7F9",
              borderRadius: 16,
              marginBottom: 20,
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../public/image-google.png")}
            />
            <Text style={{}}>Đăng nhập bằng Google</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 4, marginBottom: 20 }}>
            <Text>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate("Register")}
                style={{ color: "#FF0000" }}
              >
                Đăng kí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </View>
    </>
  );
}
