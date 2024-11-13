import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks } from "../services/books.service";

function BooksPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddBookButtonClick = () => {
    navigate("/books/add");
  };

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let ths = ["ID", "Title", "Author", "Publication Date", "ISBN", "Action"];

  useEffect(() => {
    setIsLoading(true);
    const fetchBooks = async () => {
      const books = await getAllBooks();
      if (books) {
        setBooks(books);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleEditBookButtonClick = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDeleteBook = (id) => {
    if (confirm(`Are you sure you want to delete book ID ${id}?`)) {
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
            key={book.bookid}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{book.bookid}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publicationyear}</td>
            <td>{book.isbn}</td>
            <td className="flex gap-2 justify-center">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditBookButtonClick(book.bookid)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteBook(book.bookid)}
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

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation></LoadingAnimation>
        </div>
      </PageLayout>
    );
  }

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
