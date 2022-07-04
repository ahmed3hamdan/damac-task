import { Link, useNavigate } from "react-router-dom";
import { Anchor, Breadcrumbs, Container, Space, Text } from "@mantine/core";
import BookForm from "../forms/BookForm";
import { useAddBookMutation } from "../../hooks/query";
import { useQueryClient } from "react-query";

const CreateBookPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useAddBookMutation({
    async onSuccess() {
      await queryClient.invalidateQueries(["book"]);
      navigate("/");
    },
  });

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
