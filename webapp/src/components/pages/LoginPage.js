import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  Container,
  Group,
  Text,
  TextInput,
  PasswordInput,
  Title,
  createStyles,
  Alert,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AlertCircle, At, Key } from "tabler-icons-react";
import { z } from "zod";
import { useLoginMutation } from "../../hooks/query";
import { useAuth } from "../../contexts/authContext";

const useStyles = createStyles(theme => ({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      paddingTop: 64,
      paddingBottom: 64,
    },
  },
  heading: {
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: 34,
    },
  },
  description: {
    marginTop: 2,
    fontSize: theme.fontSizes.md,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      marginTop: 4,
      fontSize: theme.fontSizes.lg,
    },
  },
  form: {
    marginTop: 32,
  },
}));

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const { classes } = useStyles();
  const { token, setToken } = useAuth();
  const { mutate, isLoading, isError, error } = useLoginMutation({
    onSuccess: setToken,
  });

  const form = useForm({
    schema: zodResolver(loginSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const errorMessage = useMemo(() => {
    if (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return "Incorrect Credentials";
          case 500:
            return "Internal Server Error";
        }
      }
      return "Unhandled Error";
    }
    return null;
  }, [error]);

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Container className={classes.container} size="xs">
      <div className={classes.heading}>
        <Title className={classes.title}>Log In</Title>
        <Text className={classes.description} color="dimmed">
          Enter your credentials to continue.
        </Text>
      </div>
      <Group
        className={classes.form}
        direction="column"
        grow
        component="form"
        noValidate
        onSubmit={form.onSubmit(mutate)}
      >
        <TextInput
          size="md"
          required
          type="email"
          icon={<At />}
          label="Email"
          placeholder="your@email.com"
          disabled={isLoading}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          size="md"
          required
          icon={<Key />}
          label="Password"
          disabled={isLoading}
          {...form.getInputProps("password")}
        />
        {isError && (
          <Alert icon={<AlertCircle size={24} />} color="red">
            {errorMessage}
          </Alert>
        )}
        <Button size="md" uppercase type="submit" loading={isLoading}>
          Log In
        </Button>
      </Group>
    </Container>
  );
};

export default LoginPage;
