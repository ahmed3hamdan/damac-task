import { useMutation, useQuery } from "react-query";
import { useAuth } from "../contexts/authContext";
import axios from "../lib/axios";

export const useLoginMutation = options =>
  useMutation(
    "login",
    async ({ email, password }) => {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      return data;
    },
    options
  );

export const useProfileQuery = options => {
  const { token } = useAuth();
  return useQuery(
    [token, "profile"],
    async () => {
      const { data } = await axios.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    options
  );
};

export const useBooksQuery = options => {
  const { token } = useAuth();
  return useQuery(
    ["book"],
    async () => {
      const { data } = await axios.get("/book", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    options
  );
};