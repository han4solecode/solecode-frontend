function Footer() {
  return (
    <>
      <footer className="footer fixed-bottom p-3 bg-dark text-white">
        <div className="container d-flex align-items-center">
          <div className="col d-flex align-items-center">
            <a
              href="https://www.solecode.id/"
              className="mb-3 mb-md-0 text-decoration-none text-secondary"
            >
              © 2024 Solecode, Inc
            </a>
          </div>
          <ul className="nav col justify-content-end">
            <li className="ms-3">
              <a href="/" className="text-decoration-none text-secondary">
                Home
              </a>
            </li>
            <li className="ms-3">
              <a href="#" className="text-decoration-none text-secondary">
                About
              </a>
            </li>
            <li className="ms-3">
              <a
                href="https://www.solecode.id/contact"
                className="text-decoration-none text-secondary"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
