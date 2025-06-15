import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { RegisterAccount } from "../api/authen";

export default function Register({ navigation }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  // Trạng thái dữ liệu khi nhập
  const onChangeName = (name: string) => setUsername(name);
  const onChangPassWord = (pass: string) => setPassword(pass);
  const onChangEmail = (birth: string) => setemail(birth);
  const onChangPhone = (phone: string) => setPhone(phone);
  const onChangeAddress = (address: string) => setAddress(address);
  // Bắt lỗi khi nhập dữ liệu không đúng định dạng của trường số điện thoại
  const getPhoneError = () => {
    const error: string[] = [];

    if (!phone.trim()) {
      error.push("Vui lòng nhập số điện thoại");
      return error;
    }
    if (!/^[0-9]+$/.test(phone)) {
      error.push("Số điện thoại không đúng định dạng");
      return error;
    }

    if (phone.length < 10 || phone.length > 10) {
      error.push("Số điện thoại chỉ được nhập 10 kí tự");
      return error;
    }

    return;
  };
  // Bắt lỗi khi nhập dữ liệu không đúng định dạng của trường họ và tên
  const getUsernameError = () => {
    const error: string[] = [];
    const charRegex = /^[!@#$%^&*()_+-<>,.?/:";']$/;
    if (!username.trim()) {
      error.push("Vui lòng nhập họ và tên");
      return error;
    }
    if (charRegex.test(username)) {
      error.push("Trường này không được nhập kí tự đặc biệt");
      return error;
    }
    return;
  };
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

  // Băt lỗi khi nhập dữ liệu không đúng trường ngày sinh
  const getEmailError = () => {
    const error: string[] = [];
    const regex =
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      error.push("Vui lòng nhập ngày sinh");
      return error;
    }
    if (!regex.test(email)) {
      error.push("Sai định dạng email (nam@gmail.com)");
      return error;
    }
    return;
  };

  // Bật lỗi khi nhập dữ liệu không đúng trường địa chỉ
  const getAddressError = () => {
    const error: string[] = [];
    if (!address.trim()) {
      error.push("Vui lòng nhập địa chỉ");
      return error;
    }
    return;
  };
  useEffect(() => {
    const isValid =
      username.trim() !== "" &&
      password.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "";
    setIsDisable(!isValid);
  }, [username, password, email, phone]);

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

  // Xử lý khi nhấn nút đăng kí
  const handleClickRegister = async () => {
    try {
      setIsLoading(true);
      setIsDisable(true);

      const values = {
        username: username,
        email: email,
        phone: phone,
        password: password,
        address: address,
      };
      console.log(values);

      const response = await RegisterAccount(values);

      if (response.status === HttpStatusCode.Ok) {
        Toast.show({
          type: "success",
          text1: "Thành công!",
          text2: "Đăng kí tài khoản thành công",
        });
        // Chờ 1 chút để toast hiển thị rồi mới navigate
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Đăng kí không thành công! tên hoặc email bị trùng",
        text2: error,
      });
      setIsLoading(false);
      setIsDisable(false);
    } finally {
      setIsLoading(false);
      setIsDisable(false);
    }
  };

  return (
    <>
      <View style={style.view1}>
        <View style={style.view2}>
          <Text style={style.text}>Đăng Kí</Text>
          <View style={{ marginBottom: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                value={username}
                style={style.textinput}
                label="Họ và tên"
                onChangeText={onChangeName}
              />
              {getUsernameError()?.map((error, index) => (
                <HelperText key={index} visible={true} type="error">
                  {error}
                </HelperText>
              ))}
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                value={email}
                style={style.textinput}
                label="Email"
                onChangeText={onChangEmail}
              />
              {getEmailError()?.map((error, index) => (
                <HelperText key={index} visible={true} type="error">
                  {error}
                </HelperText>
              ))}
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                keyboardType="numeric"
                style={style.textinput}
                label="Số điện thoại"
                value={phone}
                onChangeText={onChangPhone}
              />
              {getPhoneError()?.map((error, index) => (
                <HelperText key={index} visible={true} type="error">
                  {error}
                </HelperText>
              ))}
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                style={style.textinput}
                label="Địa chỉ"
                value={address}
                onChangeText={onChangeAddress}
              />
              {getAddressError()?.map((error, index) => (
                <HelperText key={index} visible={true} type="error">
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
                onChangeText={onChangPassWord}
              />
              {getPassWordError()?.map((error, index) => (
                <HelperText key={index} visible={true} type="error">
                  {error}
                </HelperText>
              ))}
            </View>
          </View>
          <View>
            <Button
              onPress={handleClickRegister}
              mode="contained"
              loading={isLoading}
              disabled={isDisable}
              style={style.button}
            >
              Đăng kí
            </Button>
          </View>
          <View style={{ flexDirection: "row", gap: 4, marginBottom: 20 }}>
            <Text>Bạn đã có tài khoản?</Text>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{ color: "#FF0000" }}
              >
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast />
      </View>
    </>
  );
}
