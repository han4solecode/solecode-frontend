import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchLeaveRequest } from "../services/employees.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Button from "../components/Elements/Button";
import PageLayout from "../components/Layouts/PageLayout";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import DataTable from "../components/Fragments/DataTable";
import PaginationBar from "../components/Fragments/PaginationBar";

function LeaveRequestListPage(props) {
  const {} = props;
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  //   const [sortField, setSortField] = useState("processId");
  //   const [sortOrder, setSortOrder] = useState("asc");

  const fetchLeaveRequests = async ({
    pageNumber,
    pageSize,
    searchQuery,
    // sortField,
    // sortOrder,
  }) => {
    const { data } = await searchLeaveRequest({
      pageNumber: pageNumber,
      pageSize: pageSize,
      keyword: searchQuery,
      //   sortBy: sortField,
      //   sortOrder: sortOrder,
    });
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "leaveRequest",
      pageNumber,
      pageSize,
      searchQuery,
      //   sortField,
      //   sortOrder,
    ],
    queryFn: () =>
      fetchLeaveRequests({
        pageNumber,
        pageSize,
        searchQuery,
        // sortField,
        // sortOrder,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setPageNumber(1);
  };

  let tableHeader = [
    "Process ID",
    "Requester",
    "Request Date",
    "Leave Type",
    "Start Date",
    "End Date",
    "Days Total",
    "Reason",
    "Status",
    "Action",
  ];

  console.log(data);

  const TableBody = () => {
    return data.total !== 0 ? (
      <tbody>
        {data.data.map((leave) => {
          var requestDate = new Date(leave.requestDate).toLocaleDateString();
          var startDate = new Date(leave.leaveRequestNavigation?.startDate);
          var endDate = new Date(leave.leaveRequestNavigation?.endDate);
          var daysTotal = Math.round(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          );
          return (
            <tr
              key={leave.processId}
              className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
            >
              <td>{leave.processId}</td>
              <td>
                {leave.requesterIdNavigation?.fname}{" "}
                {leave.requesterIdNavigation?.lname}
              </td>
              <td>{requestDate}</td>
              <td>{leave.leaveRequestNavigation?.leaveType}</td>
              <td>{startDate.toLocaleDateString()}</td>
              <td>{endDate.toLocaleDateString()}</td>
              <td>{daysTotal}</td>
              <td>{leave.leaveRequestNavigation?.reason}</td>
              <td>
                <span
                  className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${
                    leave.status.includes("Pending")
                      ? "bg-yellow-200 text-yellow-800"
                      : leave.status.includes("Approve")
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
              <td className="flex justify-center p-1 items-center">
                <Button
                  onClick={() =>
                    navigate(
                      `/employees/requests/leave/review/${leave.processId}`
                    )
                  }
                >
                  Review
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    ) : (
      <tbody>
        <tr className="bg-slate-500">
          <td colSpan="10" className="text-black text-center text-xl py-10">
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
    <PageLayout pageTitle="Leave Request List">
      <div className="space-x-1">
        <label htmlFor="searchQuery">Search: </label>
        <input
          type="text"
          className="w-30 border border-gray-800 rounded p-1"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="keyword"
        />
      </div>
      <DataTable
        header={tableHeader}
        body={<TableBody />}
        // handleSort={handleSort}
        // sortField={sortField}
        // sortOrder={sortOrder}
      ></DataTable>
      <PaginationBar
        pageCount={Math.ceil(data.total / pageSize)}
        currentPage={pageNumber}
        setPage={setPageNumber}
      ></PaginationBar>
    </PageLayout>
  );
}

export default LeaveRequestListPage;
