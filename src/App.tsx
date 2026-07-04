import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/auth-context";
import { Router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <AuthProvider>
            <Router />
            <Toaster position="top-center" reverseOrder={false} />
          </AuthProvider>
        </Theme>
      </QueryClientProvider>
    </>
  );
}
