import Footer from "@/app/layout/footer";
import React from "react";
import Detail from "./Detail";

export default function index({ navigation }: any) {
  return (
    <>
      <Detail navigation={navigation} />
      <Footer />
    </>
  );
}
