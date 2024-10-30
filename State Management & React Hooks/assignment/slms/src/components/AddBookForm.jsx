import { useState } from "react";

function AddBookForm(props) {
  const { books, onAddBook } = props;

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

  const initialValues = {
    id: 0,
    title: "",
    author: "",
    category: bookCategories[0],
    category: "",
    year: "",
    isbn: "",
  };

  const [formvValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formvValues, [name]: value });
    console.log(formvValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (books.length === 0) {
      var id = 1;
    } else {
      var id = books[books.length - 1].id + 1;
    }

    let newBook = { ...formvValues, id: id };

    setFormValues(newBook);

    onAddBook(newBook);

    alert(
      `A book with ID: ${newBook.id}, title: ${newBook.title}, author: ${newBook.author}, category: ${newBook.category}, publication year: ${newBook.year}, and ISBN: ${newBook.isbn} has been created`
    );

    setFormValues(initialValues);
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
            <label htmlFor="inputBookTitle" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="inputBookTitle"
                value={formvValues.title}
                required
                name="title"
                onChange={handleInputChange}
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
                value={formvValues.author}
                required
                name="author"
                onChange={handleInputChange}
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
                id="inputBookCategory"
                className="form-select"
                value={formvValues.category}
                required
                name="category"
                onChange={handleInputChange}
              >
                {bookCategories.map((val, key) => (
                  <option value={val} key={key}>
                    {val}
                  </option>
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
                type="number"
                className="form-control"
                id="inputBookPublicationYear"
                value={formvValues.year}
                required
                name="year"
                min="1900"
                max="2099"
                step="1"
                onChange={handleInputChange}
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
                value={formvValues.isbn}
                required
                name="isbn"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBookForm;
