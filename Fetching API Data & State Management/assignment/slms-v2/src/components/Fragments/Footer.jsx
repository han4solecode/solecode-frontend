import { Link } from "react-router-dom";

function Footer(props) {
  const {} = props;

  let currentYear = new Date().getFullYear();
  // template literal
  let copyrightText = `© ${currentYear} Solecode, Inc`;

  return (
    <footer className="bg-gray-800 p-3 text-white mt-auto">
      <div className="mx-auto max-w-7xl flex justify-between text-gray-500">
        <div className="">{copyrightText}</div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/books" className="hover:text-white">
            Books
          </Link>
          <Link to="/members" className="hover:text-white">
            Members
          </Link>
          <Link to="/borrow" className="hover:text-white">
            Borrow
          </Link>
          <Link to="/return" className="hover:text-white">
            Return
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
