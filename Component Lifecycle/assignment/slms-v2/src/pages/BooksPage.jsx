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
    "Publication Year",
    "Category",
    "Availability",
    "Action",
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("books"));
    if (data) {
      setBooks(data);
    }
  }, []);

  const TableBody = () => {
    return books.length !== 0 ? (
      <tbody>
        {books.map((book) => {
          <tr
            key={book.isbn}
            className="text-center align-middle odd:bg-white even:bg-slate-500"
          >
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.year}</td>
            <td>{book.isAvailable}</td>
            <td>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </td>
          </tr>;
        })}
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
