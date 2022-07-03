import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./contexts/authContext";
import queryClient from "./lib/queryClient";
import Router from "./Router";
import defaultTheme from "./themes/default";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={defaultTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  </QueryClientProvider>
);

export default App;
