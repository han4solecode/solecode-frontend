import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function BookFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

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

  const currentYear = new Date().getFullYear();

  const initialValues = {
    isbn: "",
    title: "",
    author: "",
    year: "",
    category: bookCategories[0],
    isAvailable: true,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  useState(() => {
    if (isEditing) {
      const bookData = JSON.parse(localStorage.getItem("books") || "[]");
      const editedBook = bookData.find((book) => book.isbn === id);
      setFormValues(editedBook);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, isAvailable: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleClearForm = (e) => {
    e.preventDefault();

    setFormValues(initialValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let isbnRegex =
      /((978[\--- ])?[0-9][0-9\--- ]{10}[\--- ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/;
    let currentYear = new Date().getFullYear();
    let errorMessages = {};

    if (!formValues.isbn) {
      errorMessages.isbn = "ISBN cannot be empty";
    } else if (!isbnRegex.test(formValues.isbn)) {
      errorMessages.isbn = "ISBN is not valid";
    } else {
      errorMessages.isbn = "";
    }

    if (!formValues.title.trim()) {
      errorMessages.title = "Title cannot be empty";
    } else if (formValues.title.length < 3) {
      errorMessages.title = "Title cannot be less than 3 characters";
    } else {
      errorMessages.title = "";
    }

    if (!formValues.author.trim()) {
      errorMessages.author = "Author cannot be empty";
    } else {
      errorMessages.author = "";
    }

    if (!formValues.year) {
      errorMessages.year = "Publication year cannot be empty";
    } else if (Number(formValues.year) > currentYear) {
      errorMessages.year = "Publication year cannot exceed current year";
    } else {
      errorMessages.year = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      let books = JSON.parse(localStorage.getItem("books") || "[]");

      if (isEditing) {
        let editedBook = {
          ...formValues,
        };

        let updatedBookData = books.map((book) =>
          book.isbn === editedBook.isbn || book.isbn !== editedBook.isbn
            ? editedBook
            : book
        );

        localStorage.setItem("books", JSON.stringify(updatedBookData));

        alert(
          `Book with ISBN ${formValues.isbn} has been updated successfully`
        );
        navigate("/books");
      } else {
        books.push(formValues);
        localStorage.setItem("books", JSON.stringify(books));

        alert("A new book has been created successfully");
        navigate("/books");
      }
    }
  };

  return (
    <PageLayout pageTitle="Add a New Book">
      <div className="w-full">
        <form autoComplete="off">
          <div className="mb-3">
            <label
              htmlFor="isbn"
              className="block text-black mb-2 text-lg text-semibold"
            >
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              id="isbn"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.isbn}
            />
            {errors.isbn && (
              <small className="text-red-600">{errors.isbn}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.title}
            />
            {errors.title && (
              <small className="text-red-600">{errors.title}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="author"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.author}
            />
            {errors.author && (
              <small className="text-red-600">{errors.author}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="year"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Publication Year
            </label>
            <input
              type="number"
              name="year"
              id="year"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.year}
              max={currentYear}
            />
            {errors.year && (
              <small className="text-red-600">{errors.year}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="category"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.category}
              onChange={(e) => handleInputChange(e)}
            >
              {bookCategories.map((val, key) => (
                <option value={val} key={key}>
                  {val}
                </option>
              ))}
            </select>
          </div>
          <div className="inline-flex items-center mt-3 mb-3">
            <label
              className="flex items-center cursor-pointer relative"
              htmlFor="isAvailable"
            >
              <input
                type="checkbox"
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                name="isAvailable"
                id="isAvailable"
                onChange={(e) => handleInputChange(e)}
                checked={formValues.isAvailable}
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="cursor-pointer block text-black ml-2 text-lg text-semibold"
              htmlFor="isAvailable"
            >
              Is Available?
            </label>
          </div>
          <div className="mt-3 space-x-2">
            <Button type="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
            <Button
              type="reset"
              styleName="bg-gray-600"
              onClick={handleClearForm}
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}

export default BookFormPage;
