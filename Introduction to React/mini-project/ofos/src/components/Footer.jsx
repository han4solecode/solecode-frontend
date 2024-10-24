function Footer() {
  return (
    <>
      <footer
        className="footer mt-auto p-3"
        style={{ backgroundColor: "#CBE2B5", color: "#A28B55" }}
      >
        <div className="container d-flex align-items-center">
          <div className="col">
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "#A28B55" }}
            >
              © 2024 Marii Kita Makan, Inc
            </a>
          </div>
          <div className="col-6 d-flex align-items-center justify-content-center">
            <a
              href="/"
              className="text-decoration-none mx-2"
              style={{ color: "#A28B55" }}
            >
              Menu
            </a>
            <a
              href="/"
              className="text-decoration-none mx-2"
              style={{ color: "#A28B55" }}
            >
              Promotion
            </a>
            <a
              href="/"
              className="text-decoration-none mx-2"
              style={{ color: "#A28B55" }}
            >
              Contact
            </a>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-decoration-none h2 mx-2"
            >
              <img
                src="https://img.icons8.com/glyph-neue/64/a28b55/instagram-new--v1.png"
                alt=""
                width="40"
                height="40"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-decoration-none h2 mx-2"
            >
              <img
                src="https://img.icons8.com/glyph-neue/64/a28b55/twitter.png"
                alt=""
                width="40"
                height="40"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-decoration-none h2 mx-2"
            >
              <img
                src="https://img.icons8.com/glyph-neue/64/a28b55/facebook-new.png"
                alt=""
                width="40"
                height="40"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
