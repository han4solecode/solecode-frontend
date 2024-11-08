import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";

function AssignmentsPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);

  const tableHeader = [
    "Employee",
    "Project",
    "Work Start Date",
    "Hours Worked",
    "Action",
  ];

  useEffect(() => {
    const projectData = JSON.parse(localStorage.getItem("projects") || "[]");
    const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
    const assignmentData = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );
    if (projectData && employeeData && assignmentData) {
      setProjects(projectData);
      setEmployees(employeeData);
      setAssignments(assignmentData);
    }
  }, []);

  const handleAddAssignmentButtonClick = () => {
    navigate("/assignments/new");
  };

  const handleAssignmentDetailButtonClick = (empNo, projNo) => {
    navigate(`/assignments/${empNo}/${projNo}/detail`);
  };

  const handleEditAssignmentButtonClick = (empNo, projNo) => {
    navigate(`/assignments/${empNo}/${projNo}`);
  };

  const handleDeleteAssignment = (empNo, projNo) => {
    if (
      confirm(
        `Are you sure you want to delete assignment of employee empNo ${empNo} in project projNo ${projNo}?`
      )
    ) {
      let assignments = JSON.parse(localStorage.getItem("assignments"));
      assignments = assignments.filter(
        (assignment) =>
          assignment.empNo !== empNo && assignment.projNo !== projNo
      );
      localStorage.setItem("assignment", JSON.stringify(assignments));
      if (assignments.length === 0) {
        localStorage.removeItem("assignments");
      }
      setAssignments(assignments);
      alert(
        `Assignment of employee empNo ${empNo} in project projNo ${projNo} has been deleted successfully`
      );
    } else {
      return;
    }
  };

  const getEmployeeName = (empNo) => {
    let emp = employees.find((emp) => emp.empNo === empNo);
    return `${emp.fName} ${emp.lName}`;
  };

  const getProjectName = (projNo) => {
    let proj = projects.find((proj) => proj.projNo === projNo);
    return proj.projName;
  };

  const TableBody = () => {
    return assignments.length !== 0 ? (
      <tbody>
        {assignments.map((assignment, key) => (
          <tr
            key={key}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{getEmployeeName(assignment.empNo)}</td>
            <td>{getProjectName(assignment.projNo)}</td>
            <td>{assignment.dateWorked}</td>
            <td>{assignment.hoursWorked}</td>
            <td className="flex gap-2 justify-center">
              <Button
                onClick={() =>
                  handleAssignmentDetailButtonClick(
                    assignment.empNo,
                    assignment.projNo
                  )
                }
              >
                Detail
              </Button>
              <Button
                styleName="bg-green-700"
                onClick={() =>
                  handleEditAssignmentButtonClick(
                    assignment.empNo,
                    assignment.projNo
                  )
                }
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() =>
                  handleDeleteAssignment(assignment.empNo, assignment.projNo)
                }
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

  return (
    <PageLayout pageTitle="Assignments">
      <Button onClick={handleAddAssignmentButtonClick} type="button">
        Add a New Assignment
      </Button>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
    </PageLayout>
  );
}

export default AssignmentsPage;
