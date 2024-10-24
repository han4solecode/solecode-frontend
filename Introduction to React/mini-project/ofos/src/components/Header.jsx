function Header() {
  return (
    <>
      <header
        className="p-3"
        style={{ backgroundColor: "#CBE2B5", color: "#A28B55" }}
      >
        <div className="container align-items-center">
          <div className="row">
            <div className="col pt-1">
              <a href="/" className="text-decoration-none h2">
                <img
                  src="https://img.icons8.com/dotty/80/kawaii-noodle.png"
                  alt="logo"
                  width="40"
                  height="40"
                  className="mb-2"
                />
                <span>KirimMakan</span>
              </a>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center pt-2">
              <a href="/" className="h4 text-decoration-none mx-2">
                Menu
              </a>
              <a href="/" className="h4 text-decoration-none mx-2">
                Promotion
              </a>
              <a href="/" className="h4 text-decoration-none mx-2">
                Contact
              </a>
            </div>
            <div className="col d-flex justify-content-end align-items-center">
              <button className="btn">CART</button>
              <button className="btn">REGISTER</button>
              <button className="btn">LOGIN</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
