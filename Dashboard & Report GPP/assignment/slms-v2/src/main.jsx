import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";

import "./index.css";

import MainLayout from "./components/Layouts/MainLayout";
import BaseLayout from "./components/Layouts/BaseLayout";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import BookAdvanceSearchPage from "./pages/BookAdvanceSearchPage";
import BookFormPage from "./pages/BookFormPage";
import MembersPage from "./pages/MembersPage";
import MemberFormPage from "./pages/MemberFormPage";
import BorrowPage from "./pages/BorrowPage";
import ReturnPage from "./pages/ReturnPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import UploadFilePage from "./pages/UploadFilePage";
import RequestBookPage from "./pages/RequestBookPage";
import BookRequestListPage from "./pages/BookRequestListPage";
import BookRequestReviewPage from "./pages/BookRequestReviewPage";
import ReportPage from "./pages/ReportPage";

const router = createBrowserRouter([
  {
    // path: "/",
    element: (
      <MainLayout
        allowedRoles={["Librarian", "Library Manager", "Library User"]}
      ></MainLayout>
    ),
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/profile",
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },
  {
    // path: "/",
    element: (
      <MainLayout allowedRoles={["Library Manager", "Librarian"]}></MainLayout>
    ),
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/books/requests",
        element: <BookRequestListPage></BookRequestListPage>,
      },
      {
        path: "/books/review-request/:processId",
        element: <BookRequestReviewPage></BookRequestReviewPage>,
      },
      {
        path: "/reports",
        element: <ReportPage></ReportPage>,
      },
    ],
  },
  {
    // path: "/",
    element: <MainLayout allowedRoles={["Librarian"]}></MainLayout>,
    children: [
      {
        path: "/books",
        element: <BooksPage></BooksPage>,
      },
      {
        path: "/books/detail/:id",
        element: <BookDetailPage></BookDetailPage>,
      },
      {
        path: "/books/add",
        element: <BookFormPage></BookFormPage>,
      },
      {
        path: "/books/edit/:id",
        element: <BookFormPage isEditing={true}></BookFormPage>,
      },
    ],
  },
  {
    // path: "/",
    element: <MainLayout allowedRoles={["Library Manager"]}></MainLayout>,
    children: [
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
    ],
  },
  {
    // path: "/",
    element: <MainLayout allowedRoles={["Library User"]}></MainLayout>,
    children: [
      {
        path: "/books/search",
        element: <BookAdvanceSearchPage></BookAdvanceSearchPage>,
      },
      {
        path: "/books/request",
        element: <RequestBookPage></RequestBookPage>,
      },
    ],
  },
  {
    element: <BaseLayout></BaseLayout>,
    children: [
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      // {
      //   path: "/",
      //   element: <HomePage></HomePage>,
      // },
      {
        path: "/unauthorized",
        element: "Unauthorized",
      },
      {
        path: "/upload",
        element: <UploadFilePage></UploadFilePage>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
