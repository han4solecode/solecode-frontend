import Header from "./components/Header";
import Footer from "./components/Footer";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";

import "./App.css";
import { useState } from "react";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Book 1",
      author: "Author 1",
      category: "Arts & Music",
      year: 2022,
      isbn: "anjsk2u492",
    },
  ]);

  return (
    <>
      <div className="App">
        <Header></Header>
        <div className="container d-flex flex-column">
          <BookList books={books}></BookList>
          <AddBookForm></AddBookForm>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
