import { useEffect, useState } from "react";
import PageLayout from "../components/Layouts/PageLayout";
import Card from "../components/Fragments/Card";
import LoadingAnimation from "../components/Elements/LoadingAnimation";

function DashboardPage(props) {
  const {} = props;

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
    const departmentData = JSON.parse(
      localStorage.getItem("departments") || "[]"
    );
    const projectData = JSON.parse(localStorage.getItem("projects") || "[]");
    const assignmentData = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );
    if (employeeData && departmentData && projectData && assignmentData) {
      setEmployees(employeeData);
      setDepartments(departmentData);
      setProjects(projectData);
      setAssignments(assignmentData);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return (
    <PageLayout pageTitle="Dashboard">
      <div className="grid grid-cols-4 gap-4">
        <Card
          cardTitle="Number of Employees"
          data={employees.length}
          cardFooter="employees"
        ></Card>
        <Card
          cardTitle="Number of Departments"
          data={departments.length}
          cardFooter="departments"
        ></Card>
        <Card
          cardTitle="Number of Projects"
          data={projects.length}
          cardFooter="projects"
        ></Card>
        <Card
          cardTitle="Number of Assignments"
          data={assignments.length}
          cardFooter="assignments"
        ></Card>
      </div>
    </PageLayout>
  );
}

export default DashboardPage;
