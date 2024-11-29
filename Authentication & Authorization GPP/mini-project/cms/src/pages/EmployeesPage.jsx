import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import { deleteEmployee, searchEmployees } from "../services/employees.service";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import FormInput from "../components/Fragments/FormInput";

import { useSelector } from "react-redux";

function EmployeesPage(props) {
  const {} = props;
  const { user: currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // // useEffect(() => {
  // //   if (!currentUser) {
  // //     navigate("/login");
  // //   }
  // // }, []);

  const handleAddEmployeeButtonClick = () => {
    navigate("/employees/new");
  };

  // const initialFilterQuery = {
  //   name: "",
  //   departmentname: "",
  //   position: "",
  //   level: "",
  //   employementtype: "",
  //   status: "Active",
  // };

  // const filters = ["Name", "Department Name", "Position", "Level"];

  // const [pageNumber, setPageNumber] = useState(1);
  // const [pageSize, setPageSize] = useState(5);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [sortField, setSortField] = useState("empNo");
  // const [sortOrder, setSortOrder] = useState("asc");
  // const [selectedFilter, setSelectedFilter] = useState("");
  // const [filterQuery, setFilterQuery] = useState(initialFilterQuery);
  // const [searchInput, setSearchInput] = useState("");

  // const tableHeader = [
  //   "Employee Name",
  //   "Department",
  //   "Job Position",
  //   "Level",
  //   "Employement Type",
  //   "Last Update Date",
  //   "Action",
  // ];

  // const fetchEmployees = async ({
  //   pageNumber,
  //   pageSize,
  //   searchQuery,
  //   sortField,
  //   sortOrder,
  //   filterQuery,
  // }) => {
  //   const { data } = await searchEmployees({
  //     pageNumber: pageNumber,
  //     pageSize: pageSize,
  //     keyword: searchQuery,
  //     sortBy: sortField,
  //     sortOrder: sortOrder,
  //     ...filterQuery,
  //   });
  //   return data;
  // };

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: [
  //     "employees",
  //     pageNumber,
  //     pageSize,
  //     searchQuery,
  //     sortField,
  //     sortOrder,
  //     filterQuery,
  //   ],
  //   queryFn: () =>
  //     fetchEmployees({
  //       pageNumber,
  //       pageSize,
  //       searchQuery,
  //       sortField,
  //       sortOrder,
  //       filterQuery,
  //     }),
  //   placeholderData: keepPreviousData,
  // });

  // // console.log(data);
  // // console.log(searchInput);
  // // console.log(filterQuery);

  // const handleEditEmployeeButtonClick = (id) => {
  //   navigate(`/employees/${id}`);
  // };

  // const handleDeleteEmployee = (empNo) => {
  //   if (confirm(`Are you sure you want to delete employee empNo ${empNo}?`)) {
  //     deleteEmployee(empNo)
  //       .then((res) => {
  //         if (res.status === 204) {
  //           alert(`Employee with EmpNo ${empNo} has been deleted successfully`);
  //         }
  //         navigate(0);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert(
  //           `Error occurred. Please try again or contact admin. ERROR ${err}`
  //         );
  //       });
  //   } else {
  //     return;
  //   }
  // };

  // const handleSort = (field) => {
  //   if (field === sortField) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortOrder("asc");
  //   }
  // };

  // const handleChangeFilter = (e) => {
  //   const { value } = e.target;
  //   setFilterQuery({ ...initialFilterQuery, status: filterQuery.status });
  //   setSelectedFilter(value);
  //   setSearchQuery("");
  //   setSearchInput("");
  // };

  // const handleSearchInputChange = (e) => {
  //   const { value } = e.target;
  //   setSearchInput(value);
  // };

  // const handleSearchButtonClick = () => {
  //   if (!selectedFilter) {
  //     setSearchQuery(searchInput);
  //   }
  //   setFilterQuery({
  //     ...filterQuery,
  //     [selectedFilter.replaceAll(" ", "")]: searchInput,
  //   });
  //   setPageNumber(1);
  // };

  // const handleResetButtonClick = () => {
  //   setFilterQuery({ ...initialFilterQuery, status: filterQuery.status });
  //   setSearchQuery("");
  //   setSearchInput("");
  //   setSelectedFilter("");
  // };

  // const handleEmployeeStatusSelectChange = (e) => {
  //   const { value } = e.target;
  //   setFilterQuery({ ...filterQuery, status: value });
  //   setPageNumber(1);
  // };

  // const TableBody = () => {
  //   return data.total !== 0 ? (
  //     <tbody>
  //       {data.data.map((emp) => (
  //         <tr
  //           key={emp.empno}
  //           className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
  //         >
  //           <td>
  //             {emp.fname} {emp.lname}
  //           </td>
  //           <td>{emp.deptnoNavigation.deptname}</td>
  //           <td>{emp.position}</td>
  //           <td>{emp.level}</td>
  //           <td>{emp.employmenttype}</td>
  //           <td>{emp.updatedAt}</td>
  //           <td className="flex gap-2 justify-center">
  //             <Button
  //               onClick={() => navigate(`/employees/${emp.empno}/detail`)}
  //             >
  //               Detail
  //             </Button>
  //             <Button
  //               styleName="bg-green-700"
  //               onClick={() => handleEditEmployeeButtonClick(emp.empno)}
  //             >
  //               Edit
  //             </Button>
  //             <Button
  //               styleName="bg-red-700"
  //               onClick={() => handleDeleteEmployee(emp.empno)}
  //             >
  //               Delete
  //             </Button>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   ) : (
  //     <tbody>
  //       <tr className="bg-slate-500">
  //         <td colSpan="8" className="text-black text-center text-xl py-10">
  //           No Data Available
  //         </td>
  //       </tr>
  //     </tbody>
  //   );
  // };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <LoadingAnimation></LoadingAnimation>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <span className="text-2xl">Error Fetching Data</span>
  //     </div>
  //   );
  // }

  return (
    <PageLayout pageTitle="Employees">
      <Button onClick={handleAddEmployeeButtonClick} type="button">
        Add a New Employee
      </Button>
      {/* 
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
        <div className="">
          <select
            name="status"
            id="status"
            className="border rounded w-fit p-2 text-lg"
            onChange={handleEmployeeStatusSelectChange}
            value={filterQuery.status}
          >
            <option value="Active">Active Employee</option>
            <option value="Not Active">Inactive Employee</option>
          </select>
        </div>
      </div>
      <DataTable
        header={tableHeader}
        body={<TableBody />}
        handleSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        enableSorting={true}
      ></DataTable>
      <div className="grid grid-cols-3 items-center">
        <div className="">
          <label htmlFor="perPage">Items per page: </label>
          <input
            type="number"
            className="w-10"
            min="0"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          />
        </div>
        <div>
          <PaginationBar
            pageCount={Math.ceil(data.total / pageSize)}
            currentPage={pageNumber}
            setPage={setPageNumber}
          ></PaginationBar>
        </div>
      </div> */}
    </PageLayout>
  );
}

export default EmployeesPage;
