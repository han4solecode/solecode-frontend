import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";

function EmployeesPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddEmployeeButtonClick = () => {
    navigate("/employees/new");
  };

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const departmentData = JSON.parse(
      localStorage.getItem("departments") || "[]"
    );
    const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
    if (departmentData && employeeData) {
      setDepartments(departmentData);
      setEmployees(employeeData);
    }
  }, []);

  const handleEditEmployeeButtonClick = (id) => {
    navigate(`/employees/${id}`);
  };

  const handleDeleteEmployee = (empNo) => {
    if (confirm(`Are you sure you want to delete employee empNo ${empNo}?`)) {
      let employees = JSON.parse(localStorage.getItem("employees"));
      employees = employees.filter((emp) => emp.empNo !== empNo);
      localStorage.setItem("employees", JSON.stringify(employees));
      if (employees.length === 0) {
        localStorage.removeItem("employees");
      }
      setEmployees(employees);
      alert(`Employee with EmpNo ${empNo} has been deleted successfully`);
    } else {
      return;
    }
  };

  const getDeptName = (deptNo) => {
    let dept = departments.find((dept) => dept.deptNo === deptNo);
    return dept.deptName;
  };

  const TableBody = () => {
    return employees.length !== 0 ? (
      <tbody>
        {employees.map((emp) => (
          <tr
            key={emp.empNo}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{emp.empNo}</td>
            <td>
              {emp.fName} {emp.lName}
            </td>
            <td>{emp.address}</td>
            <td>{emp.dob}</td>
            <td>{emp.sex}</td>
            <td>{emp.position}</td>
            <td>{getDeptName(emp.deptNo)}</td>
            <td className="flex gap-2 justify-center">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditEmployeeButtonClick(emp.empNo)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteEmployee(emp.empNo)}
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
      <Button onClick={handleAddEmployeeButtonClick} type="button">
        Add a New Employee
      </Button>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
    </PageLayout>
  );
}

export default EmployeesPage;
