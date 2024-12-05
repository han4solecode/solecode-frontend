import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDepartmentById } from "../services/departments.service";
import PageLayout from "../components/Layouts/PageLayout";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import Button from "../components/Elements/Button";

function DepartmentDetailPage(props) {
  const {} = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableHeader = ["ID", "Full Name", "Address", "DOB", "Sex", "Position"];

  useEffect(() => {
    setLoading(true);
    getDepartmentById(Number(id))
      .then((res) => {
        if (res.status === 200) {
          setDepartment(res.data);
          setEmployees(res.data.employees);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(employees);

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
    <PageLayout pageTitle={`Employees at ${department.deptname} Department`}>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
      <Button onClick={() => navigate("/departments")}>Go Back</Button>
    </PageLayout>
  );
}

export default DepartmentDetailPage;
