import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import BooksPage from "./components/pages/BooksPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Navigate to="books" />} />
      <Route path="books" element={<BooksPage />}>
        <Route path="create" element="new" />
        <Route path=":bookId" element="edit" />
      </Route>
    </Route>
    <Route path="login" exact element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Router;
