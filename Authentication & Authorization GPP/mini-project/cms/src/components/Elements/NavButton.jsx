import { NavLink } from "react-router-dom";

function NavButton(props) {
  const { to, children } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return isActive
          ? "rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900"
          : "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-gray-900";
      }}
      aria-current="page"
    >
      {children}
    </NavLink>
  );
}

export default NavButton;
