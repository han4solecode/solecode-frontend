import { useState } from "react";
import PageLayout from "../components/Layouts/PageLayout";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";
import { requestBook } from "../services/books.service";

function RequestBookPage(props) {
  const {} = props;

  const initialValues = {
    isbn: "",
    title: "",
    author: "",
    // publicationyear: "",
    publisher: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, isAvailable: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  console.log(formValues);

  const handleClearForm = (e) => {
    e.preventDefault();
    setFormValues(initialValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let isbnRegex =
      /((978[\--- ])?[0-9][0-9\--- ]{10}[\--- ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/;
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

    if (!formValues.publisher.trim()) {
      errorMessages.publisher = "Publisher cannot be empty";
    } else {
      errorMessages.publisher = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      // send book request
      setIsLoading(true);
      requestBook(formValues)
        .then(() => {
          alert("Book successfully requested");
        })
        .catch((err) => {
          console.log(err);
          alert("Error occured!");
        })
        .finally(() => {
          setIsLoading(false);
          setFormValues(initialValues);
        });
    }
  };

  return (
    <PageLayout pageTitle="Request Book Form">
      <div className="max-w-screen-sm">
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
            name="publisher"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.publisher}
            errorMessage={errors.publisher}
          >
            Publisher
          </FormInput>
          <div className="mt-3 space-x-2">
            <Button type="submit" onClick={handleFormSubmit}>
              {isLoading ? "Requesting..." : "Submit Request"}
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

export default RequestBookPage;
