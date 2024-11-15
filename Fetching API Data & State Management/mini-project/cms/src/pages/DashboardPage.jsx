import { useEffect, useState } from "react";
import PageLayout from "../components/Layouts/PageLayout";
import Card from "../components/Fragments/Card";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import { getAllEmployeesNoPaging } from "../services/employees.service";
import { getAllDepartmentNoPaging } from "../services/departments.service";
import { getAllProjectsNoPaging } from "../services/projects.service";
import { getAllAssignmentsNoPaging } from "../services/assignments.service";

function DashboardPage(props) {
  const {} = props;

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllEmployeesNoPaging(),
      getAllDepartmentNoPaging(),
      getAllProjectsNoPaging(),
      getAllAssignmentsNoPaging(),
    ])
      .then((res) => {
        setEmployees(res[0].data);
        setDepartments(res[1].data);
        setProjects(res[2].data);
        setAssignments(res[3].data);
      })
      .catch((err) => {
        console.log(err);
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
