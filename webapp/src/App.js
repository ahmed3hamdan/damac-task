import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./contexts/authContext";
import queryClient from "./lib/queryClient";
import Router from "./Router";
import defaultTheme from "./themes/default";
import { ModalsProvider } from "@mantine/modals";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={defaultTheme}>
      <ModalsProvider>
        <AuthProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  </QueryClientProvider>
);

export default App;
