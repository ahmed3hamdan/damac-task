import { Link } from "react-router-dom";
import { Anchor, Breadcrumbs, Container, Space, Text } from "@mantine/core";
import BookForm from "../forms/BookForm";
import { useAddBookMutation } from "../../hooks/query";

const CreateBookPage = () => {
  const { mutate, isLoading, isError, error } = useAddBookMutation();

  return (
    <Container>
      <Breadcrumbs
        p="sm"
        sx={theme => ({
          background: theme.colors.gray[0],
          borderRadius: theme.radius.sm,
        })}
      >
        <Anchor component={Link} to="/">
          Books
        </Anchor>
        <Text>Add Book</Text>
      </Breadcrumbs>
      <Space h="xl" />
      <BookForm
        onSubmit={mutate}
        isSubmitting={isLoading}
        alertMessage={isError && error.message}
      />
    </Container>
  );
};

export default CreateBookPage;
