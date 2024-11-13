import { Link, NavLink } from "react-router-dom";

import NavButton from "../Elements/NavButton";

function Navbar(props) {
  const {} = props;

  return (
    <nav className="bg-gray-800 p-3">
      <div className="mx-auto max-w-7xl flex justify-between">
        <div className="space-x-4">
          <h1 className="text-3xl text-white">
            <Link to="/">CMS</Link>
          </h1>
        </div>
        <div className="space-x-4 flex justify-center items-center">
          <NavButton to="/employees">Employees</NavButton>
          <NavButton to="/departments">Departments</NavButton>
          <NavButton to="/projects">Projects</NavButton>
          <NavButton to="/assignments">Assignments</NavButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
