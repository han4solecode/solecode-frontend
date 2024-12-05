import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../services/projects.service";
import PageLayout from "../components/Layouts/PageLayout";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import Button from "../components/Elements/Button";

function ProjectDetailPage(props) {
  const {} = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableHeader = [
    "ID",
    "Full Name",
    "Address",
    "DOB",
    "Sex",
    "Position",
    "Department",
  ];

  useEffect(() => {
    setLoading(true);
    getProjectById(Number(id))
      .then((res) => {
        setProject(res.data);
        setEmployees(res.data.worksons);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(project);
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
              {emp.empnoNavigation.fname} {emp.empnoNavigation.lname}
            </td>
            <td>{emp.empnoNavigation.address}</td>
            <td>{emp.empnoNavigation.dob}</td>
            <td>{emp.empnoNavigation.sex}</td>
            <td>{emp.empnoNavigation.position}</td>
            <td>{emp.empnoNavigation.deptnoNavigation.deptname}</td>
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
    <PageLayout pageTitle={`List of Employees on Project ${project.projname}`}>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
      <Button onClick={() => navigate("/projects")}>Go Back</Button>
    </PageLayout>
  );
}

export default ProjectDetailPage;
