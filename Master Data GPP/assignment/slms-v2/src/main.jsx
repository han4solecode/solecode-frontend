import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
// import App from "./App.jsx";

import MainLayout from "./components/Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import BookAdvanceSearchPage from "./pages/BookAdvanceSearchPage";
import BookFormPage from "./pages/BookFormPage";
import MembersPage from "./pages/MembersPage";
import MemberFormPage from "./pages/MemberFormPage";
import BorrowPage from "./pages/BorrowPage";
import ReturnPage from "./pages/ReturnPage";
// import InfiniteScrollList from "./pages/InfiniteScrollList";

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
        path: "/books/detail/:id",
        element: <BookDetailPage></BookDetailPage>,
      },
      {
        path: "/books/search",
        element: <BookAdvanceSearchPage></BookAdvanceSearchPage>,
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
  // {
  //   path: "/inf",
  //   element: <BookSearchResultCard></BookSearchResultCard>,
  // },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>
);
