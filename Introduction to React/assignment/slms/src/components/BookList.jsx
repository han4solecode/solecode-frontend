function BookList() {
  var i = 1;

  const books = [
    {
      title: "Book 1",
      author: "Author 1",
      category: "Cat 1",
      year: 2021,
      isbn: "38797275",
    },
    {
      title: "Book 2",
      author: "Author 2",
      category: "Cat 2",
      year: 2023,
      isbn: "385297275",
    },
    {
      title: "Book 3",
      author: "Author 3",
      category: "Cat 3",
      year: 2019,
      isbn: "48790275",
    },
    {
      title: "Book 4",
      author: "Author 4",
      category: "Cat 4",
      year: 2024,
      isbn: "38797279",
    },
  ];

  return (
    <>
      <div className="container-fluid my-3">
        <h2 className="text-dark">Book List</h2>
        <table className="table table-striped w-auto table-bordered table-dark">
          <thead>
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Book Category</th>
              <th scope="col">Publication Year</th>
              <th scope="col">ISBN</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, key) => (
              <tr className="align-middle">
                <th scope="row" className="text-center">
                  {i++}
                </th>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.year}</td>
                <td>{book.isbn}</td>
                <td>
                  <button type="button" class="btn btn-warning mx-1">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger mx-1">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BookList;
