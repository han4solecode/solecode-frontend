import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
// import App from "./App.jsx";

import MainLayout from "./components/Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookFormPage from "./pages/BookFormPage";

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
        path: "/members",
        element: <div>Members Page</div>,
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
