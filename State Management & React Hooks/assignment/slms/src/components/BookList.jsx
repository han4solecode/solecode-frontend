function BookList(props) {
  const { books, onDelete } = props;

  const TableBody = () => {
    return (
      <tbody>
        {books.map((book) => (
          <tr className="align-middle text-center" key={book.id}>
            <th scope="row" className="text-center">
              {book.id}
            </th>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.year}</td>
            <td>{book.isbn}</td>
            <td>
              <button type="button" className="btn btn-warning mx-1">
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      <div className="container-fluid my-3">
        <h2 className="text-dark">List of Available Books</h2>
        <table className="table table-striped w-auto table-bordered table-dark">
          <thead>
            <tr className="text-center">
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Book Category</th>
              <th scope="col">Publication Year</th>
              <th scope="col">ISBN</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {books.length ? (
            <TableBody></TableBody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="7" className="text-white text-center">
                  No Data Available
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default BookList;
