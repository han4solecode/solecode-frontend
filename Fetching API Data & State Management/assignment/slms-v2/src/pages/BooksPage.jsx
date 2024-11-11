import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BooksPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddBookButtonClick = () => {
    navigate("/books/add");
  };

  const [books, setBooks] = useState([]);

  let ths = [
    "ISBN",
    "Title",
    "Author",
    "Category",
    "Publication Year",
    "Availability",
    "Action",
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("books") || "[]");
    if (data) {
      setBooks(data);
    }
  }, []);

  const handleEditBookButtonClick = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDeleteBook = (isbn) => {
    if (confirm(`Are you sure you want to delete book ID ${isbn}?`)) {
      let books = JSON.parse(localStorage.getItem("books"));
      books = books.filter((book) => book.isbn !== isbn);
      localStorage.setItem("books", JSON.stringify(books));
      if (books.length === 0) {
        localStorage.removeItem("books");
      }
      setBooks(books);
      alert(`Book with ID ${isbn} has been deleted successfully`);
    } else {
      return;
    }
  };

  const TableBody = () => {
    return books.length !== 0 ? (
      <tbody>
        {books.map((book) => (
          <tr
            key={book.isbn}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.year}</td>
            {book.isAvailable ? <td>Yes</td> : <td>No</td>}
            <td className="flex gap-2 justify-center">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditBookButtonClick(book.isbn)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteBook(book.isbn)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr className="bg-slate-500">
          <td colSpan="8" className="text-black text-center text-xl py-10">
            No Data Available
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <PageLayout pageTitle="Books Page">
      <Button onClick={handleAddBookButtonClick} type="button">
        Add a New Book
      </Button>
      <DataTable header={ths} body={<TableBody />}></DataTable>
    </PageLayout>
  );
}

export default BooksPage;
