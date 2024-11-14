import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import { getAllDepartment } from "../services/departments.service";

function DepartmentsPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddDepartmentButtonClick = () => {
    navigate("/departments/new");
  };

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const tableHeader = ["ID", "Department Name", "Manager", "Action"];

  useEffect(() => {
    setLoading(true);
    const fetchDepartments = async (perPage, page) => {
      const res = await getAllDepartment(perPage, page);
      if (res.status === 200) {
        setDepartments(res.data);
        console.log(res.data);
        setLoading(false);
      }
    };
    fetchDepartments(perPage, page + 1);
  }, []);

  useEffect(() => {
    const fetchDepartments = async (perPage, page) => {
      const res = await getAllDepartment(perPage, page);
      if (res.status === 200) {
        setDepartments(res.data);
        console.log(res.data);
        setLoading(false);
      }
    };
    fetchDepartments(perPage, page + 1);
  }, [page]);

  const handleEditDepartmentButtonClick = (id) => {
    navigate(`/departments/${id}`);
  };

  const handleDeleteDepartment = (deptNo) => {
    if (
      confirm(`Are you sure you want to delete department deptNo ${deptNo}?`)
    ) {
      let departments = JSON.parse(localStorage.getItem("departments"));
      departments = departments.filter((dept) => dept.deptNo !== deptNo);
      localStorage.setItem("departments", JSON.stringify(departments));
      if (departments.length === 0) {
        localStorage.removeItem("departments");
      }
      setDepartments(departments);
      alert(`Department with DeptNo ${deptNo} has been deleted successfully`);
    } else {
      return;
    }
  };

  const TableBody = () => {
    return departments.length !== 0 ? (
      <tbody>
        {departments.map((dept) => (
          <tr
            key={dept.deptno}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{dept.deptno}</td>
            <td>{dept.deptname}</td>
            {!dept.mgrempno ? (
              <td className="text-red-500">Not Assigned Yet</td>
            ) : (
              <td>
                {dept.mgrempnoNavigation.fname} {dept.mgrempnoNavigation.lname}
              </td>
            )}
            <td className="flex gap-2 justify-center">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditDepartmentButtonClick(dept.deptNo)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteDepartment(dept.deptNo)}
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
    <PageLayout pageTitle="Departments">
      <Button onClick={handleAddDepartmentButtonClick} type="button">
        Add a New Department
      </Button>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
      <PaginationBar pageCount={10} setPage={setPage}></PaginationBar>
    </PageLayout>
  );
}

export default DepartmentsPage;
