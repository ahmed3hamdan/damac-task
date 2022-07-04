import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import BooksPage from "./components/pages/BooksPage";
import CreateBookPage from "./components/pages/CreateBookPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<BooksPage />} />
      <Route path="create" element={<CreateBookPage />} />
      <Route path="edit/:bookId" element="edit" />
    </Route>
    <Route path="login" exact element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default Router;
