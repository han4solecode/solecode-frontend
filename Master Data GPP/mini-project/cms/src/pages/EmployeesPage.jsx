import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import {
  deleteEmployee,
  getAllEmployees,
  getAllEmployeesNoPaging,
} from "../services/employees.service";

function EmployeesPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddEmployeeButtonClick = () => {
    navigate("/employees/new");
  };

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [allEmployees, setAllEmployees] = useState([]);

  const tableHeader = [
    "ID",
    "Full Name",
    "Address",
    "DOB",
    "Sex",
    "Position",
    "Department",
    "Action",
  ];

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllEmployees(perPage, page + 1), getAllEmployeesNoPaging()])
      .then((res) => {
        setEmployees(res[0].data);
        setAllEmployees(res[1].data);
      })
      .catch((err) => {
        console.log(err[0], err[1]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchEmployees = async (perPage, page) => {
      const res = await getAllEmployees(perPage, page);
      if (res.status === 200) {
        console.log(res.data);
        setEmployees(res.data);
        setLoading(false);
      }
    };
    fetchEmployees(perPage, page + 1);
  }, [page, perPage]);

  const handleEditEmployeeButtonClick = (id) => {
    navigate(`/employees/${id}`);
  };

  const handleDeleteEmployee = (empNo) => {
    if (confirm(`Are you sure you want to delete employee empNo ${empNo}?`)) {
      deleteEmployee(empNo)
        .then((res) => {
          if (res.status === 204) {
            alert(`Employee with EmpNo ${empNo} has been deleted successfully`);
          }
          navigate(0);
        })
        .catch((err) => {
          console.log(err);
          alert(
            `Error occurred. Please try again or contact admin. ERROR ${err}`
          );
        });
    } else {
      return;
    }
  };

  const TableBody = () => {
    return employees.length !== 0 ? (
      <tbody>
        {employees.map((emp) => (
          <tr
            key={emp.empno}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{emp.empno}</td>
            <td>
              {emp.fname} {emp.lname}
            </td>
            <td>{emp.address}</td>
            <td>{emp.dob}</td>
            <td>{emp.sex}</td>
            <td>{emp.position}</td>
            <td>{emp.deptnoNavigation.deptname}</td>
            <td className="flex gap-2 justify-center">
              <Button
                onClick={() => navigate(`/employees/${emp.empno}/detail`)}
              >
                Detail
              </Button>
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditEmployeeButtonClick(emp.empno)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteEmployee(emp.empno)}
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return (
    <PageLayout pageTitle="Employees">
      <div className="flex justify-between items-center">
        <Button onClick={handleAddEmployeeButtonClick} type="button">
          Add a New Employee
        </Button>
        <div>
          <label htmlFor="perPage">Items per page: </label>
          <input
            type="number"
            className="w-10"
            min="0"
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
          />
        </div>
      </div>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
      <PaginationBar
        pageCount={Math.ceil(allEmployees.length / perPage)}
        setPage={setPage}
      ></PaginationBar>
    </PageLayout>
  );
}

export default EmployeesPage;
