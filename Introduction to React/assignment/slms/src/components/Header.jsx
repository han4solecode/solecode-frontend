function Header() {
  const getDate = () => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var today = new Date();

    return today.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <header className="p-3 bg-dark text-white">
        <div className="container d-flex align-items-center">
          <a
            href="/"
            className="mb-3 mb-md-0 me-md-auto text-decoration-none h2"
          >
            <span>Simple Library Management System</span>
          </a>
          <span className="d-flex align-items-center h4 mb-3 mb-md-0">
            {getDate()}
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
