import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { searchBooks } from "../services/books.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageLayout from "../components/Layouts/PageLayout";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import BookSearchResultCard from "../components/Fragments/BookSearchResultCard";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";
import PaginationBar from "../components/Fragments/PaginationBar";

function BookAdvanceSearchPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const initialFilterQuery = {
    title: "",
    author: "",
    isbn: "",
    category: "",
    language: "",
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState([
    "Title",
    "ISBN",
    "Author",
    "Category",
    "Language",
  ]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterQuery, setFilterQuery] = useState(initialFilterQuery);
  const [searchInput, setSearchInput] = useState("");

  const fetchBooks = async ({
    pageNumber,
    pageSize,
    searchQuery,
    filterQuery,
  }) => {
    const { data } = await searchBooks({
      pageNumber: pageNumber,
      pageSize: pageSize,
      keyword: searchQuery,
      ...filterQuery,
    });
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Books", pageNumber, pageSize, searchQuery, filterQuery],
    queryFn: () =>
      fetchBooks({ pageNumber, pageSize, searchQuery, filterQuery }),
    placeholderData: keepPreviousData,
  });

  const handleChangeFilter = (e) => {
    const { value } = e.target;
    setFilterQuery(initialFilterQuery);
    setSelectedFilter(value);
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleSearchButtonClick = () => {
    setFilterQuery({ ...filterQuery, [selectedFilter]: searchInput });
    setPageNumber(1);
  };

  const handleResetButtonClick = () => {
    setFilterQuery(initialFilterQuery);
    setSearchInput("");
    setSelectedFilter("");
  };

  console.log(data);
  console.log(selectedFilter);
  console.log(searchInput);

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
    <PageLayout pageTitle="Book Advance Search">
      <div className="flex items-center gap-3">
        <div>
          <select
            name="filter"
            id="filter"
            className="border rounded w-fit p-2 text-lg"
            value={selectedFilter}
            onChange={handleChangeFilter}
          >
            <option value="" disabled hidden>
              Select Filter
            </option>
            {filters.map((filter, key) => (
              <option value={filter.toLocaleLowerCase()} key={key}>
                {filter}
              </option>
            ))}
          </select>
        </div>
        <FormInput
          name="searchInput"
          type="text"
          onChange={(e) => handleSearchInputChange(e)}
          value={searchInput}
        ></FormInput>
        <Button type="submit" onClick={handleSearchButtonClick}>
          Search
        </Button>
        <Button
          type="reset"
          styleName="bg-gray-500"
          onClick={handleResetButtonClick}
        >
          Reset Filter
        </Button>
      </div>
      <div>
        {data.total !== 0 ? (
          <div>
            {data.data.map((book) => (
              <BookSearchResultCard
                title={book.title}
                author={book.author}
                isbn={book.isbn}
                category={book.category}
                to={`/books/detail/${book.id}`}
              ></BookSearchResultCard>
            ))}
          </div>
        ) : (
          <div className="text-xl my-3 flex items-center justify-center">
            <span>No Book Available</span>
          </div>
        )}
      </div>
      {data.total !== 0 ? (
        <PaginationBar
          pageCount={Math.ceil(data.total / pageSize)}
          currentPage={pageNumber}
          setPage={setPageNumber}
        ></PaginationBar>
      ) : (
        ""
      )}
    </PageLayout>
  );
}

export default BookAdvanceSearchPage;
