import { Link, NavLink } from "react-router-dom";

function Navbar(props) {
  const {} = props;

  const getCurrentDate = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    return `${year}-${month}-${day}`;
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
          <NavLink
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
        </div>
        <div className="space-x-4 flex">
          <h1 className="text-lg text-white">{getCurrentDate()}</h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
