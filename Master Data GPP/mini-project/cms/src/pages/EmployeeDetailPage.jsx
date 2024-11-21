import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../services/employees.service";
import PageLayout from "../components/Layouts/PageLayout";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import Button from "../components/Elements/Button";

function EmployeeDetailPage(props) {
  const {} = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableHeader = ["Project Name", "Work Start Date", "Hours Worked"];

  useEffect(() => {
    setLoading(true);
    getEmployeeById(Number(id))
      .then((res) => {
        setEmployee(res.data);
        setAssignments(res.data.worksons);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(employee);
  console.log(assignments);

  const TableBody = () => {
    return assignments.length !== 0 ? (
      <tbody>
        {assignments.map((assignment, key) => (
          <tr
            key={key}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{assignment.projnoNavigation.projname}</td>
            <td>{assignment.dateworked}</td>
            <td>{assignment.hoursworked}</td>
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
    <PageLayout
      pageTitle={`${employee.fname} ${employee.lname} Assignment History`}
    >
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
      <Button onClick={() => navigate("/employees")}>Go Back</Button>
    </PageLayout>
  );
}

export default EmployeeDetailPage;
