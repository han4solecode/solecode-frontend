import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import {
  deleteDepartment,
  getAllDepartment,
  getAllDepartmentNoPaging,
} from "../services/departments.service";

function DepartmentsPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const handleAddDepartmentButtonClick = () => {
    navigate("/departments/new");
  };

  const [departments, setDepartments] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const tableHeader = ["ID", "Department Name", "Manager", "Action"];

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllDepartment(perPage, page), getAllDepartmentNoPaging()])
      .then((res) => {
        setDepartments(res[0].data);
        setAllDepartments(res[1].data);
      })
      .catch((err) => {
        console.log(err[0], err[1]);
      })
      .finally(() => {
        setLoading(false);
      });
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
    fetchDepartments(perPage, page);
  }, [page, perPage]);

  const handleDetailButtonClick = (id) => {
    navigate(`/departments/${id}/detail`);
  };

  const handleEditDepartmentButtonClick = (id) => {
    navigate(`/departments/${id}`);
  };

  const handleDeleteDepartment = (deptNo) => {
    if (
      confirm(`Are you sure you want to delete department deptNo ${deptNo}?`)
    ) {
      deleteDepartment(deptNo)
        .then((res) => {
          if (res.status === 204) {
            alert(
              `Department with DeptNo ${deptNo} has been deleted successfully`
            );
            navigate(0);
          }
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
              <Button onClick={() => handleDetailButtonClick(dept.deptno)}>
                Detail
              </Button>
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditDepartmentButtonClick(dept.deptno)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteDepartment(dept.deptno)}
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
      <div className="flex justify-between items-center">
        <Button onClick={handleAddDepartmentButtonClick} type="button">
          Add a New Department
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
        pageCount={Math.ceil(allDepartments.length / perPage)}
        setPage={setPage}
        currentPage={page}
      ></PaginationBar>
    </PageLayout>
  );
}

export default DepartmentsPage;
