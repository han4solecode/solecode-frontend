import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
// import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello</div>,
    errorElement: (
      <div className="flex justify-center items-center h-screen">Error 404</div>
    ),
    children: [],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
