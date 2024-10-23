import { useState } from "react";

function AddBookForm() {
  let bookCategories = [
    "Arts & Music",
    "Biography",
    "Business",
    "Comic",
    "Computer & Tech",
    "Cooking",
    "Edu & Reference",
    "Health & Fitness",
    "History",
    "Hobbies & Crafts",
    "Home & Garden",
    "Horror",
    "Kids",
    "Literature & Fiction",
    "Mystery",
    "Sci-Fi & Fantasy",
  ];

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(bookCategories[0]);
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let newBook = { id, title, author, category, year, isbn };

    let payload = {
      status: "success",
      message: "new book created successfuly",
      ...newBook,
    };

    console.log(payload);
  };

  return (
    <>
      <div className="container-fluid my-3">
        <h3>Add a new book</h3>
        <form
          className="bg-dark text-white rounded-1 p-3 px-4"
          id="addBookForm"
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <div className="my-3 mb-4 row">
            <label htmlFor="inputBookId" className="col-sm-2 col-form-label">
              ID
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="inputBookId"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>
          <div className="my-3 mb-4 row">
            <label htmlFor="inputBookTitle" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="inputBookTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="my-3 mb-4 row">
            <label
              htmlFor="inputBookAuthor"
              className="col-sm-2 col-form-label"
            >
              Author
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="inputBookAuthor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
          <div className="my-3 mb-4 row">
            <label
              htmlFor="inputBookCategory"
              className="col-sm-2 col-form-label"
            >
              Category
            </label>
            <div className="col">
              <select
                name="inputBookCategory"
                id="inputBookCategory"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {bookCategories.map((val) => (
                  <option value={val}>{val}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="my-3 mb-4 row">
            <label
              htmlFor="inputBookPublicationYear"
              className="col-sm-2 col-form-label"
            >
              Publication Year
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="inputBookPublicationYear"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>
          <div className="my-3 mb-4 row">
            <label htmlFor="inputBookISBN" className="col-sm-2 col-form-label">
              ISBN
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="inputBookISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBookForm;
