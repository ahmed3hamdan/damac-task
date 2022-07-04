import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Anchor,
  Breadcrumbs,
  Center,
  Container,
  Loader,
  Space,
  Text,
} from "@mantine/core";
import BookForm from "../forms/BookForm";
import { useBookByIdQuery, useUpdateBookMutation } from "../../hooks/query";
import { AlertCircle } from "tabler-icons-react";
import { useQueryClient } from "react-query";

const EditBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const bookByIdQuery = useBookByIdQuery(bookId);
  const { mutate, isLoading, isError, error } = useUpdateBookMutation(bookId, {
    async onSuccess() {
      await queryClient.invalidateQueries(["book"]);
      navigate("/");
    },
  });

  const content = (() => {
    if (bookByIdQuery.isLoading) {
      return (
        <Center py="xl">
          <Loader size="xl" />
        </Center>
      );
    }

    if (bookByIdQuery.isError) {
      return (
        <Alert title="Couldn't fetch book" color="red" icon={<AlertCircle />}>
          {bookByIdQuery.error.message}
        </Alert>
      );
    }

    return (
      <>
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
          <Text>Edit "{bookByIdQuery.data.name}"</Text>
        </Breadcrumbs>
        <Space h="xl" />
        <BookForm
          onSubmit={mutate}
          isSubmitting={isLoading}
          alertMessage={isError && error.message}
          initialValues={{
            ...bookByIdQuery.data,
            imageUrl: bookByIdQuery.data.imageUrl || "",
          }}
        />
      </>
    );
  })();

  return <Container>{content}</Container>;
};

export default EditBookPage;
