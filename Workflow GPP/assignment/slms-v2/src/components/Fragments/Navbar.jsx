import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import Button from "../Elements/Button";
import { useEffect, useState } from "react";

function Navbar(props) {
  const {} = props;
  const {
    user: currentUser,
    isError,
    message,
    isLoading,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      visibleForAll: true,
    },
    {
      label: "Profile",
      path: "/profile",
      visibleForRoles: ["Librarian", "Library Manager", "Library User"],
    },
    {
      label: "Books",
      path: "/books",
      visibleForRoles: ["Librarian"],
    },
    {
      label: "Request List",
      path: "/books/requests",
      visibleForRoles: ["Librarian", "Library Manager"],
    },
    {
      label: "Members",
      path: "/members",
      visibleForRoles: ["Library Manager"],
    },
    {
      label: "Search Book",
      path: "/books/search",
      visibleForRoles: ["Library User"],
    },
    {
      label: "Request Book",
      path: "/books/request",
      visibleForRoles: ["Library User"],
    },
    {
      label: "Login",
      path: "/login",
      isAuthenticated: false,
    },
    {
      label: "Register",
      path: "/register",
      isAuthenticated: false,
    },
    // {
    //   label: "Logout",
    // },
  ];

  const getCurrentDate = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    return `${year}-${month}-${day}`;
  };

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   }
  // }, [navigate, dispatch, currentUser]);

  useEffect(() => {
    console.log(currentUser);
    setUser(currentUser);
  }, [currentUser]);

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
      // navigate(0);
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800 p-3">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <div className="space-x-4">
          <h1 className="text-3xl text-white">
            <Link to="/">SLMS</Link>
          </h1>
        </div>
        <div className="space-x-4">
          {menuItems.filter(isMenuVisible).map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className="text-lg font-medium text-white"
              aria-current="page"
              // onClick={handleLogoutButtonClick}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="space-x-4 flex items-center">
          <h1 className="text-lg text-white">{getCurrentDate()}</h1>
          {user && (
            <h1 className="text-lg text-white">
              Welcome, <strong>{user.user?.userName}</strong>
              {/* Welcome,{" "}
              <strong>
                {currentUser && currentUser.user
                  ? currentUser.user.userName
                  : "Loading"}
              </strong> */}
            </h1>
          )}
          {user && (
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
