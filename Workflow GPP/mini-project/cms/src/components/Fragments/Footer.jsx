import { Link } from "react-router-dom";

function Footer(props) {
  const {} = props;

  let currentYear = new Date().getFullYear();
  let copyrightText = `© ${currentYear} Solecode, Inc`;

  return (
    <footer className="bg-gray-800 p-3 text-white mt-auto">
      <div className="mx-auto max-w-7xl flex justify-between text-gray-500">
        <div className="">{copyrightText}</div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-white">
            Dashboard
          </Link>
          <Link to="/employees" className="hover:text-white">
            Employees
          </Link>
          <Link to="/departments" className="hover:text-white">
            Departments
          </Link>
          <Link to="/projects" className="hover:text-white">
            Projects
          </Link>
          <Link to="/assignments" className="hover:text-white">
            Assignments
          </Link>
          <a
            href="https://www.solecode.id/contact"
            target="_blank"
            className="hover:text-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
