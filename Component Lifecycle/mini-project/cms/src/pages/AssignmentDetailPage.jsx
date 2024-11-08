import { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function AssignmentDetailPage(props) {
  const {} = props;
  const { empNo, projNo } = useParams();

  const [employees, setEmployees] = useState({});
  const [projects, setProjects] = useState({});
  const [assignments, setAssignments] = useState({});
  const [empDept, setEmpDept] = useState({});
  const [projDept, setProjDept] = useState({});

  useState(() => {
    const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
    const projectData = JSON.parse(localStorage.getItem("projects") || "[]");
    const assignmentData = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );
    const departmentData = JSON.parse(
      localStorage.getItem("departments") || "[]"
    );

    const employee = employeeData.find((emp) => emp.empNo === Number(empNo));
    const project = projectData.find((proj) => proj.projNo === Number(projNo));
    const assignment = assignmentData.find(
      (assignment) =>
        assignment.empNo === Number(empNo) &&
        assignment.projNo === Number(projNo)
    );
    const empDept = departmentData.find(
      (dept) => dept.deptNo === employee.deptNo
    );
    const projDept = departmentData.find(
      (dept) => dept.deptNo === project.deptNo
    );

    if (employee && project && assignment && empDept && projDept) {
      setEmployees(employee);
      setProjects(project);
      setAssignments(assignment);
      setEmpDept(empDept);
      setProjDept(projDept);
    }
  }, []);

  return (
    <PageLayout pageTitle="Assignment Detail">
      <div className="mb-3">
        <h1 className="text-2xl font-semibold mb-1">Employee Data</h1>
        <p>
          Full Name: {employees.fName} {employees.lName}
        </p>
        <p>Department: {empDept.deptName}</p>
        <p>Position: {employees.position}</p>
      </div>
      <div className="mb-3">
        <h1 className="text-2xl font-semibold mb-1">Project Data</h1>
        <p>Project Name: {projects.projName}</p>
        <p>Department: {projDept.deptName}</p>
      </div>
      <div className="mb-3">
        <h1 className="text-2xl font-semibold mb-1">Peformance</h1>
        <p>Work Start Date: {assignments.dateWorked}</p>
        <p>
          Hours Worked:{" "}
          {assignments.hoursWorked <= 1
            ? `${assignments.hoursWorked} hour`
            : `${assignments.hoursWorked} hours`}
        </p>
      </div>
    </PageLayout>
  );
}

export default AssignmentDetailPage;
