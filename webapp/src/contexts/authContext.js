import { useLocalStorage } from "@mantine/hooks";
import { createContext, useContext } from "react";

const authContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage({
    key: "authToken",
    defaultValue: null,
  });

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
