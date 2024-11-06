import { useState } from "react";
import PageLayout from "../components/Layouts/PageLayout";

function BookFormPage(props) {
  const {} = props;

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
    isbn: "",
    title: "",
    author: "",
    category: bookCategories[0],
    year: "",
    isAvailable: "true",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("books", JSON.stringify(formValues));

    alert("A new book has been created successfully");
  };

  return (
    <PageLayout pageTitle="Add a New Book">
      <form autoComplete="off"></form>
    </PageLayout>
  );
}

export default BookFormPage;
