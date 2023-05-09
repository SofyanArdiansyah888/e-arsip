import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/app.css";
import ScrollToTop from "./base-components/ScrollToTop";
import { AuthProvider } from "./providers/AuthProvider";

import Router from "./router";
import { store } from "./stores/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router />
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
    <ScrollToTop />
  </BrowserRouter>
);
