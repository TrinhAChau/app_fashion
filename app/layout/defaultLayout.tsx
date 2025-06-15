import React from "react";
import { StyleSheet, View } from "react-native";
import Footer from "./footer";
import Header from "./header";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 },
  });
  return (
    <>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>{children}</View>
        <Footer />
      </View>
    </>
  );
}
