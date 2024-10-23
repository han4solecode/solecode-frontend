function Footer() {
  // array desctructuring
  let menus = ["Home", "About", "Contact Us"];
  let [x, y, z] = menus;

  let currentYear = new Date().getFullYear();
  // template literal
  let copyrightText = `© ${currentYear} Solecode, Inc`;

  return (
    <>
      <footer className="footer p-3 bg-dark text-white mt-auto">
        <div className="container d-flex align-items-center">
          <div className="col d-flex align-items-center">
            <a
              href="https://www.solecode.id/"
              className="mb-3 mb-md-0 text-decoration-none text-secondary"
            >
              {copyrightText}
            </a>
          </div>
          <ul className="nav col justify-content-end">
            <li className="ms-3">
              <a href="/" className="text-decoration-none text-secondary">
                {x}
              </a>
            </li>
            <li className="ms-3">
              <a href="#" className="text-decoration-none text-secondary">
                {y}
              </a>
            </li>
            <li className="ms-3">
              <a
                href="https://www.solecode.id/contact"
                className="text-decoration-none text-secondary"
              >
                {z}
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
