import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";

const BooksPage = () => {
  return (
    <>
      <Container>Books</Container>
      <Outlet />
    </>
  );
};

export default BooksPage;
