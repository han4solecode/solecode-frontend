import { useEffect, useRef, useState } from "react";

function AddBookForm(props) {
  const { books, onAddBook, editingBook, onUpdateBook, onDoneUpdate } = props;

  // console.log(editingBook);

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
    year: "",
    isbn: "",
  };

  // const [formValues, setFormValues] = useState(initialValues);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(bookCategories[0]);
  const [year, setYear] = useState("");
  const [isbn, setIsbn] = useState("");

  // console.log(formValues);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  const editInput = useRef(null);

  useEffect(() => {
    if (editingBook) {
      editInput.current.focus();
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setCategory(editingBook.category);
      setYear(editingBook.year);
      setIsbn(editingBook.isbn);
    }
  }, [editingBook]);

  const handleCancelEdit = () => {
    onDoneUpdate();
    setTitle("");
    setAuthor("");
    setCategory("");
    setYear("");
    setIsbn("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingBook) {
      // let updatedBook = formValues;

      let updatedBook = {
        id: editingBook.id,
        title: title,
        author: author,
        category: category,
        year: year,
        isbn: isbn,
      };

      onUpdateBook(updatedBook);

      onDoneUpdate();

      // setFormValues(initialValues);

      setTitle("");
      setAuthor("");
      setCategory("");
      setYear("");
      setIsbn("");

      alert(`Book with ID ${editingBook.id} has been updated successfully`);
    } else {
      if (books.length === 0) {
        var id = 1;
      } else {
        var id = books[books.length - 1].id + 1;
      }

      // let newBook = { ...formValues, id: id };
      let newBook = {
        id: id,
        title: title,
        author: author,
        category: category,
        year: year,
        isbn: isbn,
      };

      // setFormValues(newBook);

      onAddBook(newBook);

      setTitle("");
      setAuthor("");
      setCategory("");
      setYear("");
      setIsbn("");

      alert(
        `A book with ID: ${newBook.id}, title: ${newBook.title}, author: ${newBook.author}, category: ${newBook.category}, publication year: ${newBook.year}, and ISBN: ${newBook.isbn} has been created`
      );
    }
  };

  return (
    <>
      <div className="container-fluid my-3">
        {editingBook ? (
          <h3>Editing {editingBook.title}</h3>
        ) : (
          <h3>Add a new book</h3>
        )}
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
                value={title}
                required
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                ref={editInput}
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
                required
                name="author"
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
                id="inputBookCategory"
                className="form-select"
                value={category}
                required
                name="category"
                onChange={(e) => setCategory(e.target.value)}
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
                value={year}
                required
                name="year"
                min="1900"
                max="2099"
                step="1"
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
                required
                name="isbn"
                onChange={(e) => setIsbn(e.target.value)}
              />
            </div>
          </div>
          {editingBook ? (
            <>
              <button type="submit" className="btn btn-primary me-2">
                Update
              </button>
              <button
                type="reset"
                className="btn btn-secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default AddBookForm;
