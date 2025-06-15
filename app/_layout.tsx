import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-native-paper";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import App from "./routes"; // chứa các Stack.Navigator

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <App />
          <Toast />
        </Provider>
      </QueryClientProvider>
    </>
  );
}
