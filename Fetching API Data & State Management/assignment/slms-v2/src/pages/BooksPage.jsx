import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook } from "../services/books.service";

function BooksPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddBookButtonClick = () => {
    navigate("/books/add");
  };

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginatedBooks, setPaginatedBooks] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 5;

  let ths = ["ID", "Title", "Author", "Publication Date", "ISBN", "Action"];

  useEffect(() => {
    setIsLoading(true);
    const fetchBooks = async () => {
      const books = await getAllBooks();
      if (books) {
        setBooks(books);
        setIsLoading(false);
        setPaginatedBooks(
          books.filter((item, index) => {
            return (index >= page * perPage) & (index < (page + 1) * perPage);
          })
        );
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    setPaginatedBooks(
      books.filter((item, index) => {
        return (index >= page * perPage) & (index < (page + 1) * perPage);
      })
    );
  }, [page]);

  const handleEditBookButtonClick = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDeleteBook = (id) => {
    if (confirm(`Are you sure you want to delete book ID ${id}?`)) {
      const deleteExistingBook = async (id) => {
        const res = await deleteBook(id);
        alert(`Book with ID ${id} has been deleted successfully`);
        navigate("/books");
      };

      deleteExistingBook(Number(id));
    } else {
      return;
    }
  };

  const TableBody = () => {
    return books.length !== 0 ? (
      <tbody>
        {paginatedBooks.map((book) => (
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
      <PaginationBar
        pageCount={Math.ceil(books.length / perPage)}
        setPage={setPage}
      ></PaginationBar>
    </PageLayout>
  );
}

export default BooksPage;
