import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
// import App from "./App.jsx";

import MainLayout from "./components/Layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentFormPage from "./pages/DepartmentFormPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectFormPage from "./pages/ProjectFormPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import AssignmentFormPage from "./pages/AssignmentFormPage";
import AssignmentDetailPage from "./pages/AssignmentDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Error 404
      </div>
    ),
    children: [
      {
        path: "",
        element: <DashboardPage></DashboardPage>,
      },
      {
        path: "/employees",
        element: <EmployeesPage></EmployeesPage>,
      },
      {
        path: "/employees/new",
        element: <EmployeeFormPage></EmployeeFormPage>,
      },
      {
        path: "/employees/:id",
        element: <EmployeeFormPage isEditing={true}></EmployeeFormPage>,
        errorElement: (
          <div className="flex justify-center items-center h-screen text-3xl font-bold">
            Error 404
          </div>
        ),
      },
      {
        path: "/departments",
        element: <DepartmentsPage></DepartmentsPage>,
      },
      {
        path: "/departments/new",
        element: <DepartmentFormPage></DepartmentFormPage>,
      },
      {
        path: "/departments/:id",
        element: <DepartmentFormPage isEditing={true}></DepartmentFormPage>,
        errorElement: (
          <div className="flex justify-center items-center h-screen text-3xl font-bold">
            Error 404
          </div>
        ),
      },
      {
        path: "/projects",
        element: <ProjectsPage></ProjectsPage>,
      },
      {
        path: "/projects/new",
        element: <ProjectFormPage></ProjectFormPage>,
      },
      {
        path: "/projects/:id",
        element: <ProjectFormPage isEditing={true}></ProjectFormPage>,
        errorElement: (
          <div className="flex justify-center items-center h-screen text-3xl font-bold">
            Error 404
          </div>
        ),
      },
      {
        path: "/assignments",
        element: <AssignmentsPage></AssignmentsPage>,
      },
      {
        path: "/assignments/new",
        element: <AssignmentFormPage></AssignmentFormPage>,
      },
      {
        path: "/assignments/:empNo/:projNo",
        element: <AssignmentFormPage isEditing={true}></AssignmentFormPage>,
        errorElement: (
          <div className="flex justify-center items-center h-screen text-3xl font-bold">
            Error 404
          </div>
        ),
      },
      {
        path: "/assignments/:empNo/:projNo/detail",
        element: <AssignmentDetailPage></AssignmentDetailPage>,
        errorElement: (
          <div className="flex justify-center items-center h-screen text-3xl font-bold">
            Error 404
          </div>
        ),
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
