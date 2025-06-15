import Footer from "@/app/layout/footer";
import React from "react";
import Store from "./Store";

export default function index({ navigation }: any) {
  return (
    <>
      <Store navigation={navigation} />
      <Footer />
    </>
  );
}
