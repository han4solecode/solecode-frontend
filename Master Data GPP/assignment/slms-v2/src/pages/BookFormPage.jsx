import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";
import {
  getBookById,
  createNewBook,
  updateExistingBook,
} from "../services/books.service";

function BookFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const initialValues = {
    isbn: "",
    title: "",
    author: "",
    publicationyear: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  useEffect(() => {
    if (isEditing) {
      const fetchBookToEdit = async () => {
        const book = await getBookById(Number(id));
        if (book) {
          setFormValues(book);
        }
      };
      fetchBookToEdit();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, isAvailable: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }

    console.log(formValues);
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
      errorMessages.title = "Book title cannot be empty";
    } else if (formValues.title.length < 3) {
      errorMessages.title = "Book title cannot be less than 3 characters";
    } else {
      errorMessages.title = "";
    }

    if (!formValues.author.trim()) {
      errorMessages.author = "Author cannot be empty";
    } else {
      errorMessages.author = "";
    }

    if (!formValues.publicationyear) {
      errorMessages.publicationyear = "Publication date cannot be empty";
    } else if (Number(formValues.publicationyear) > currentYear) {
      errorMessages.publicationyear =
        "Publication year cannot exceed current year";
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
      if (isEditing) {
        const updateBook = async (id, updatedBook) => {
          const res = await updateExistingBook(id, updatedBook);
          if (res) {
            alert(`Book with ID ${id} has been updated successfully`);
            navigate("/books");
          } else {
            alert("Error! Please try again");
          }
        };

        updateBook(Number(id), formValues);
      } else {
        const createBook = async (book) => {
          const newBook = await createNewBook(book);
          if (newBook) {
            alert("A new book has been created successfully");
            navigate("/books");
          } else {
            alert("Error! Please try again");
          }
        };

        createBook(formValues);
      }
    }
  };

  return (
    <PageLayout
      pageTitle={isEditing ? `Editing Book ID ${id}` : "Add a New Book"}
    >
      <div className="w-full">
        <form autoComplete="off">
          <FormInput
            name="isbn"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.isbn}
            errorMessage={errors.isbn}
          >
            ISBN
          </FormInput>
          <FormInput
            name="title"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.title}
            errorMessage={errors.title}
          >
            Book Title
          </FormInput>
          <FormInput
            name="author"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.author}
            errorMessage={errors.author}
          >
            Author
          </FormInput>
          <FormInput
            name="publicationyear"
            type="date"
            onChange={(e) => handleInputChange(e)}
            value={formValues.publicationyear}
            errorMessage={errors.publicationyear}
          >
            Publication Date
          </FormInput>
          {/* <div className="mb-3">
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
          </div> */}
          {/* <div className="inline-flex items-center mt-3 mb-3">
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
          </div> */}
          <div className="mt-3 space-x-2">
            <Button type="submit" onClick={handleFormSubmit}>
              {isEditing ? "Edit" : "Add"}
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
