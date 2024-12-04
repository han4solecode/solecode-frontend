import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBookRequest } from "../services/books.service";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import PageLayout from "../components/Layouts/PageLayout";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";

function BookRequestListPage(props) {
  const {} = props;
  const navigate = useNavigate();

  const initialFilterQuery = {
    requester: "",
    booktitle: "",
    author: "",
    isbn: "",
    publisher: "",
  };

  const filters = [
    "Requester",
    "Book Title",
    "Author",
    "ISBN",
    "Publisher",
    "Status",
  ];

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("processId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterQuery, setFilterQuery] = useState(initialFilterQuery);
  const [searchInput, setSearchInput] = useState("");

  let ths = [
    "Process ID",
    "Request Date",
    "Requester",
    "Book Title",
    "Author",
    "ISBN",
    "Publisher",
    "Status",
    "Action",
  ];

  const fetchBookRequests = async ({
    pageNumber,
    pageSize,
    searchQuery,
    sortField,
    sortOrder,
    filterQuery,
  }) => {
    const { data } = await searchBookRequest({
      pageNumber: pageNumber,
      pageSize: pageSize,
      keyword: searchQuery,
      sortBy: sortField,
      sortOrder: sortOrder,
      ...filterQuery,
    });
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "book requests",
      pageNumber,
      pageSize,
      searchQuery,
      sortField,
      sortOrder,
      filterQuery,
    ],
    queryFn: () =>
      fetchBookRequests({
        pageNumber,
        pageSize,
        searchQuery,
        sortField,
        sortOrder,
        filterQuery,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleChangeFilter = (e) => {
    const { value } = e.target;
    setFilterQuery({ ...initialFilterQuery });
    setSelectedFilter(value);
    setSearchQuery("");
    setSearchInput("");
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;

    if (value === "") {
      handleResetButtonClick();
    }

    setSearchInput(value);
  };

  const handleSearchButtonClick = () => {
    if (!selectedFilter) {
      setSearchQuery(searchInput);
    }
    setFilterQuery({
      ...filterQuery,
      [selectedFilter.replaceAll(" ", "")]: searchInput,
    });
    setPageNumber(1);
  };

  const handleResetButtonClick = () => {
    setFilterQuery({ ...initialFilterQuery });
    setSearchQuery("");
    setSearchInput("");
    setSelectedFilter("");
  };

  console.log(data);

  const TableBody = () => {
    return data.total !== 0 ? (
      <tbody>
        {data.data.map((proc) => (
          <tr
            key={proc.processId}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{proc.processId}</td>
            <td>{proc.requestDate}</td>
            <td>
              {proc.requesterIdNavigation?.firstName}{" "}
              {proc.requesterIdNavigation?.lastName}
            </td>
            <td>{proc.bookRequestNavigation?.title}</td>
            <td>{proc.bookRequestNavigation?.author}</td>
            <td>{proc.bookRequestNavigation?.isbn}</td>
            <td>{proc.bookRequestNavigation?.publisher}</td>
            <td>
              <span
                className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                  proc.status.includes("Pending")
                    ? "bg-yellow-200 text-yellow-800"
                    : proc.status.includes("Approve")
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {proc.status}
              </span>
            </td>
            <td className="flex justify-center p-1 items-center">
              <Button
                onClick={() =>
                  navigate(`/books/review-request/${proc.processId}`)
                }
              >
                Review
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    ) : (
      <tbody>
        <tr className="bg-slate-500">
          <td colSpan="9" className="text-black text-center text-xl py-10">
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
    <PageLayout pageTitle="Book Request List">
      <div className="flex flex-row items-center justify-between">
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
            placeholder="keyword"
          ></FormInput>
          <Button type="submit" onClick={handleSearchButtonClick}>
            Search
          </Button>
          <Button
            type="reset"
            styleName="bg-gray-500"
            onClick={handleResetButtonClick}
          >
            Reset
          </Button>
        </div>
      </div>
      <DataTable
        header={ths}
        body={<TableBody />}
        handleSort={handleSort}
        enableSorting={true}
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

export default BookRequestListPage;
