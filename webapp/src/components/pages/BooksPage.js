import { useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Title,
} from "@mantine/core";
import { AlertCircle, Plus, Trash } from "tabler-icons-react";
import { useBooksQuery } from "../../hooks/query";
import BookCard from "../cards/BookCard";

const BooksPage = () => {
  const { data, error, isSuccess, isError, isLoading } = useBooksQuery();

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <Center py="xl">
          <Loader size="xl" />
        </Center>
      );
    }

    if (isError) {
      return (
        <Alert title="Couldn't load books" color="red" icon={<AlertCircle />}>
          {error.message}
        </Alert>
      );
    }

    if (isSuccess) {
      if (data.length === 0) {
        return (
          <Alert title="No Books" icon={<Trash />}>
            To add a new book clock in the button on the top right or click{" "}
            <Anchor size="sm" component={Link} to="create">
              here
            </Anchor>
            .
          </Alert>
        );
      }

      return (
        <Grid>
          {data.map(book => (
            <Grid.Col sm={6} md={4} key={book.id}>
              <BookCard book={book} />
            </Grid.Col>
          ))}
        </Grid>
      );
    }

    return null;
  }, [data, error, isSuccess, isError, isLoading]);

  return (
    <>
      <Container>
        <Group position="apart" align="center">
          <Title order={2}>Books List</Title>
          <Button component={Link} to="create" leftIcon={<Plus />}>
            Add Book
          </Button>
        </Group>
        <Box mt="xl">{content}</Box>
      </Container>
      <Outlet />
    </>
  );
};

export default BooksPage;
