import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import App from "./app";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <App />
          <Toast />
        </PaperProvider>
      </QueryClientProvider>
    </>
  );
}
