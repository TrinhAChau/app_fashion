import { Slot } from "expo-router";
import Footer from "./footer";
import Header from "./header";

export default function DefaultLayout() {
  <>
    <Header />
    <Slot />
    <Footer />
  </>;
}
