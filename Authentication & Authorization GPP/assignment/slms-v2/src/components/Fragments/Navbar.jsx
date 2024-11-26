import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import Button from "../Elements/Button";

function Navbar(props) {
  const {} = props;
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate("/");
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
          {/* <NavLink
            to="/books"
            className={({ isActive }) => {
              return isActive
                ? "rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900"
                : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white";
            }}
            aria-current="page"
          >
            Books
          </NavLink>
          <NavLink
            to="/members"
            className={({ isActive }) => {
              return isActive
                ? "rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900"
                : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white";
            }}
            aria-current="page"
          >
            Members
          </NavLink>
          <NavLink
            to="/borrow"
            className={({ isActive }) => {
              return isActive
                ? "rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900"
                : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white";
            }}
            aria-current="page"
          >
            Borrow
          </NavLink>
          <NavLink
            to="/return"
            className={({ isActive }) => {
              return isActive
                ? "rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900"
                : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white";
            }}
            aria-current="page"
          >
            Return
          </NavLink> */}
        </div>
        <div className="space-x-4 flex items-center">
          <h1 className="text-lg text-white">{getCurrentDate()}</h1>
          {currentUser && (
            <h1 className="text-lg text-white">
              Welcome, <strong>{currentUser.user?.userName}</strong>
            </h1>
          )}
          {currentUser && (
            <Button
              onClick={handleLogoutButtonClick}
              styleName="bg-gray-900 text-white hover:bg-white hover:text-gray-900"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
