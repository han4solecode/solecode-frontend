import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBook, searchBooks } from "../services/books.service";
import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";

function BooksPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddBookButtonClick = () => {
    navigate("/books/add");
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchBooks = async ({
    pageNumber,
    pageSize,
    searchQuery,
    sortField,
    sortOrder,
  }) => {
    const { data } = await searchBooks({
      pageNumber: pageNumber,
      pageSize: pageSize,
      keyword: searchQuery,
      sortBy: sortField,
      sortOrder: sortOrder,
    });
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "books",
      pageNumber,
      pageSize,
      searchQuery,
      sortField,
      sortOrder,
    ],
    queryFn: () =>
      fetchBooks({ pageNumber, pageSize, searchQuery, sortField, sortOrder }),
    placeholderData: keepPreviousData,
  });

  let ths = ["ID", "Title", "Author", "ISBN", "Action"];

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

  const handleSearchClick = (e) => {
    e.preventDefault();

    setSearchQuery(e.target.value);
    setPageNumber(1);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  console.log(`sort order: ${sortOrder}`);
  console.log(`sort field: ${sortField}`);

  const TableBody = () => {
    return data.total !== 0 ? (
      <tbody>
        {data.data.map((book) => (
          <tr
            key={book.id}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            {/* <td>{book.category}</td> */}
            <td>{book.isbn}</td>
            <td className="flex gap-2 justify-center">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditBookButtonClick(book.id)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteBook(book.id)}
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
      <div className="flex justify-between items-center">
        <Button onClick={handleAddBookButtonClick} type="button">
          Add a New Book
        </Button>
        <div className="flex gap-4 items-center">
          <div>
            <label htmlFor="pageSize">Items per page: </label>
            <input
              type="number"
              className="w-10"
              min="0"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            />
          </div>
          <div className="space-x-1">
            <label htmlFor="searchQuery">Search: </label>
            <input
              type="text"
              className="w-30 border border-gray-800 rounded p-1"
              value={searchQuery}
              onChange={handleSearchClick}
              placeholder=""
            />
          </div>
        </div>
      </div>
      <DataTable
        header={ths}
        body={<TableBody />}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      ></DataTable>
      <PaginationBar
        pageCount={Math.ceil(data.total / pageSize)}
        currentPage={pageNumber}
        setPage={setPageNumber}
      ></PaginationBar>
    </PageLayout>
  );
}

export default BooksPage;
