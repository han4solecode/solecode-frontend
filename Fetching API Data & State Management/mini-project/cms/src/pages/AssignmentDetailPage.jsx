import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import { getAssignmentById } from "../services/assignments.service";

function AssignmentDetailPage(props) {
  const {} = props;
  const { empNo, projNo } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState({});
  const [project, setProject] = useState({});
  const [projDept, setProjDept] = useState({});
  const [employee, setEmployee] = useState({});
  const [empDept, setEmpDept] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAssignmentById(Number(empNo), Number(projNo))
      .then((res) => {
        if (res.status === 200) {
          setAssignment(res.data);
          setEmployee(res.data.empnoNavigation);
          setEmpDept(res.data.empnoNavigation.deptnoNavigation);
          setProject(res.data.projnoNavigation);
          setProjDept(res.data.projnoNavigation.deptnoNavigation);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          `Error occurred. Please try again or contact admin. ERROR ${err}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return (
    <PageLayout pageTitle="Assignment Detail">
      <div className="mb-3">
        <h1 className="text-2xl font-semibold mb-1">Employee Data</h1>
        <p>
          Full Name: {employee.fname} {employee.lname}
        </p>
        <p>Department: {empDept.deptname}</p>
        <p>Position: {employee.position}</p>
      </div>
      <div className="mb-3">
        <h1 className="text-2xl font-semibold mb-1">Project Data</h1>
        <p>Project Name: {project.projname}</p>
        <p>Department: {projDept.deptname}</p>
      </div>
      <div className="mb-3">
        <h1 className="text-2xl font-semibold mb-1">Peformance</h1>
        <p>Work Start Date: {assignment.dateworked}</p>
        <p>
          Hours Worked:{" "}
          {assignment.hoursworked <= 1
            ? `${assignment.hoursworked} hour`
            : `${assignment.hoursworked} hours`}
        </p>
      </div>
      <Button onClick={() => navigate("/assignments")}>Go Back</Button>
    </PageLayout>
  );
}

export default AssignmentDetailPage;
