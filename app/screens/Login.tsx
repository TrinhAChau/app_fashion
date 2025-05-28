import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
export default function Login({ navigation }: any) {
  const [useName, setUseName] = React.useState("");
  const [passWord, setPassWord] = React.useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState(false);
  // const onChangeText = (text: string) => setText(text);
  const onChangeName = (name: string) => setUseName(name);
  const onChangPassWord = (pass: string) => setPassWord(pass);

  const hasErrorsUseName = () => useName.trim() === "";
  const hasErrorsPassWord = () => passWord.trim() === "";

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
      height: 40,
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

  const handleClickLogin = () => {
    setIsLoading(true);
    setIsDisable(true);
  };
  return (
    <>
      <View style={style.view1}>
        <View style={style.view2}>
          <Text style={style.text}>Đăng Nhập</Text>
          <View>
            <TextInput
              style={style.textinput}
              label="Tên đăng nhập"
              value={useName}
              onChangeText={onChangeName}
            />
            <HelperText type="error" visible={hasErrorsUseName()}>
              Vui lòng nhập tên đăng nhập
            </HelperText>
          </View>
          <View>
            <TextInput
              style={style.textinput}
              label="Mật khẩu"
              value={passWord}
              onChangeText={onChangPassWord}
            />
            <HelperText type="error" visible={hasErrorsPassWord()}>
              Vui lòng nhập mât khẩu
            </HelperText>
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
          <Button
            onPress={handleClickLogin}
            style={style.button}
            mode="contained"
            loading={isLoading}
            disabled={isDisable}
          >
            Đăng nhập
          </Button>

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
      </View>
    </>
  );
}
