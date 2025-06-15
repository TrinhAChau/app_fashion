import Footer from "@/app/layout/footer";
import React from "react";
import ShoppCart from "./ShoppCart";

export default function index({ navigation }: any) {
  return (
    <>
      <ShoppCart navigation={navigation} />
      <Footer />
    </>
  );
}
