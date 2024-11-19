import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
// import App from "./App.jsx";

import MainLayout from "./components/Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookFormPage from "./pages/BookFormPage";
import MembersPage from "./pages/MembersPage";
import MemberFormPage from "./pages/MemberFormPage";
import BorrowPage from "./pages/BorrowPage";
import ReturnPage from "./pages/ReturnPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "/books",
        element: <BooksPage></BooksPage>,
      },
      {
        path: "/books/add",
        element: <BookFormPage></BookFormPage>,
      },
      {
        path: "/books/edit/:id",
        element: <BookFormPage isEditing={true}></BookFormPage>,
      },
      {
        path: "/members",
        element: <MembersPage></MembersPage>,
      },
      {
        path: "/members/add",
        element: <MemberFormPage></MemberFormPage>,
      },
      {
        path: "/members/edit/:id",
        element: <MemberFormPage isEditing={true}></MemberFormPage>,
      },
      {
        path: "/borrow",
        element: <BorrowPage></BorrowPage>,
      },
      {
        path: "/return",
        element: <ReturnPage></ReturnPage>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
