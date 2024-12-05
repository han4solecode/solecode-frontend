import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";

import "./index.css";
// import App from "./App.jsx";

import MainLayout from "./components/Layouts/MainLayout";
import LoginLayout from "./components/Layouts/LoginLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentDetailPage from "./pages/DepartmentDetailPage";
import EmployeeDeactivationFormPage from "./pages/EmployeeDeactivationFormPage";
import DepartmentFormPage from "./pages/DepartmentFormPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectFormPage from "./pages/ProjectFormPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import AssignmentFormPage from "./pages/AssignmentFormPage";
import AssignmentDetailPage from "./pages/AssignmentDetailPage";
import ProfilePage from "./pages/ProfilePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const router = createBrowserRouter([
  {
    // path: "/",
    element: (
      <MainLayout
        allowedRoles={[
          "Administrator",
          "HR Manager",
          "Department Manager",
          "Employee Supervisor",
          "Employee",
        ]}
      ></MainLayout>
    ),
    errorElement: (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Error 404
      </div>
    ),
    children: [
      {
        path: "/profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "/dashboard",
        element: <DashboardPage></DashboardPage>,
      },
    ],
  },
  {
    element: (
      <MainLayout allowedRoles={["Administrator", "HR Manager"]}></MainLayout>
    ),
    children: [
      {
        path: "/employees/new",
        element: <EmployeeFormPage isEditing={false}></EmployeeFormPage>,
      },
      {
        path: "/employees/:id",
        element: <EmployeeFormPage isEditing={true}></EmployeeFormPage>,
      },
    ],
  },
  {
    element: (
      <MainLayout
        allowedRoles={["Administrator", "Employee", "Employee Supervisor"]}
      ></MainLayout>
    ),
    children: [
      {
        path: "/departments",
        element: <DepartmentsPage></DepartmentsPage>,
      },
    ],
  },
  {
    element: (
      <MainLayout
        allowedRoles={[
          "Administrator",
          "Department Manager",
          "Employee Supervisor",
        ]}
      ></MainLayout>
    ),
    children: [
      {
        path: "/projects",
        element: <ProjectsPage></ProjectsPage>,
      },
    ],
  },
  {
    element: (
      <MainLayout
        allowedRoles={[
          "Administrator",
          "HR Manager",
          "Department Manager",
          "Employee Supervisor",
          "Employee",
        ]}
      ></MainLayout>
    ),
    children: [
      {
        path: "/assignments",
        element: <AssignmentsPage></AssignmentsPage>,
      },
    ],
  },
  {
    element: (
      <MainLayout
        allowedRoles={[
          "Administrator",
          "HR Manager",
          "Department Manager",
          "Employee Supervisor",
        ]}
      ></MainLayout>
    ),
    children: [
      {
        path: "/employees",
        element: <EmployeesPage></EmployeesPage>,
      },
    ],
  },
  {
    element: <LoginLayout></LoginLayout>,
    children: [
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
    ],
  },
  {
    element: <UnauthorizedPage></UnauthorizedPage>,
    path: "/unauthorized",
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
