import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Alert, Button, Center, Container, Group, Loader } from "@mantine/core";
import { useAuth } from "./authContext";
import { useProfileQuery } from "../hooks/query";
import { AlertCircle, Login } from "tabler-icons-react";

const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { token, setToken } = useAuth();
  const { data, isLoading, isError, error } = useProfileQuery({
    enabled: token !== null,
    // log out if token is invalid
    onError(error) {
      if (error.response?.status === 401) {
        setToken(null);
      }
    },
  });
  const handleLogOut = () => setToken(null);

  if (token === null) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <Center py={80}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Container py="xl">
        <Group direction="column" grow>
          <Alert
            icon={<AlertCircle size={24} />}
            title="Authentication Failed"
            color="red"
          >
            {error.message}
          </Alert>
          <Button
            onClick={handleLogOut}
            leftIcon={<Login size={22} />}
            uppercase
          >
            Log in again
          </Button>
        </Group>
      </Container>
    );
  }

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export const useUser = () => useContext(userContext);
