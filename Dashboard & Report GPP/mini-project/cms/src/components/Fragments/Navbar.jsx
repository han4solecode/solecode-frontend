import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import Button from "../Elements/Button";

import NavButton from "../Elements/NavButton";

function Navbar(props) {
  const {} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: currentUser,
    isLoading,
    isError,
    message,
    isSuccess,
  } = useSelector((state) => state.auth);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      visibleForRoles: [
        "Administrator",
        "HR Manager",
        "Department Manager",
        "Employee Supervisor",
        "Employee",
      ],
    },
    {
      path: "/profile",
      visibleForRoles: [
        "Administrator",
        "HR Manager",
        "Department Manager",
        "Employee Supervisor",
        "Employee",
      ],
    },
    {
      label: "Employees",
      path: "/employees",
      visibleForRoles: ["Administrator", "HR Manager"],
    },
    {
      label: "Departments",
      path: "/departments",
      visibleForRoles: ["Administrator", "Employee Supervisor", "Employee"],
    },
    {
      label: "Projects",
      path: "/projects",
      visibleForRoles: [
        "Administrator",
        "Department Manager",
        "Employee Supervisor",
      ],
    },
    {
      label: "Assignments",
      path: "/assignments",
      visibleForRoles: [
        "Administrator",
        "HR Manager",
        "Department Manager",
        "Employee Supervisor",
        "Employee",
      ],
    },
    {
      label: "Request Leave",
      path: "/employees/request/leave",
      visibleForRoles: ["Employee"],
    },
    {
      label: "Leave Request List",
      path: "/employees/requests/leave",
      visibleForRoles: ["HR Manager", "Employee Supervisor"],
    },
    {
      label: "Reports",
      path: "/reports",
      visibleForRoles: ["HR Manager", "Employee Supervisor"],
    },
  ];

  const isMenuVisible = (item) => {
    if (item.visibleForAll) {
      return true;
    }

    if (item.isAuthenticated == false && !currentUser) {
      return true;
    }

    if (item.label == "Logout" && currentUser) {
      return true;
    }

    if (item.visibleForRoles && currentUser?.roles) {
      return item.visibleForRoles.some((role) =>
        currentUser.roles.includes(role)
      );
    }

    return false;
  };

  const handleLogoutButtonClick = (e) => {
    e.preventDefault();
    dispatch(logout());

    if (isError) {
      alert(message);
    }
    if (isSuccess) navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-3">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <div className="space-x-4">
          <h1 className="text-3xl text-white">
            <Link to="/dashboard">CMS</Link>
          </h1>
        </div>
        <div className="space-x-4 flex justify-center items-center">
          {menuItems.filter(isMenuVisible).map(
            (item, index) =>
              item.label && (
                <NavButton key={index} to={item.path}>
                  {item.label}
                </NavButton>
              )
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="bg-gray-900 rounded-lg p-2 text-white hover:bg-white hover:text-gray-900"
            onClick={() => navigate("/profile")}
          >
            <div className="flex gap-2 min-w-40">
              <img
                src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
                alt=""
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col items-start">
                <span className="text-sm">Welcome,</span>
                <strong>
                  {currentUser?.user?.fname} {currentUser?.user?.lname}
                </strong>
              </div>
            </div>
          </button>
          {currentUser && (
            <Button
              onClick={handleLogoutButtonClick}
              styleName="bg-gray-900 text-white hover:bg-white hover:text-gray-900"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
