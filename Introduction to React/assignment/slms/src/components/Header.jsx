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

  const getCurrentDate = () => {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <header className="p-3 bg-dark text-white">
        <div className="container d-flex align-items-center">
          <a
            href="/"
            className="mb-3 mb-md-0 me-md-auto text-decoration-none h2"
          >
            <span>SLMS</span>
          </a>
          <span className="d-flex align-items-center h4 mb-3 mb-md-0">
            {getCurrentDate()}
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
