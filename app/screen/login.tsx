import { default as AsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  // const onChangeText = (text: string) => setText(text);
  const onChangeName = (name: string) => setEmail(name);
  const onChangPassword = (pass: string) => setPassword(pass);

  const emailConst = "admin@gmail.com";
  const passWordConst = "Admin@2k4";

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

      if (email === emailConst && password === passWordConst) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đăng nhập thành công",
        });
        setTimeout(() => {
          navigation.navigate("Home");
        }, 500);
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng nhập không thành công",
          text2: "Email hoặc mật khẩu không chính xác",
        });
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
        </View>
        <Toast />
      </View>
    </>
  );
}
