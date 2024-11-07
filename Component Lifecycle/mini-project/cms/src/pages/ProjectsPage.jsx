import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";

function ProjectsPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);

  const tableHeader = ["ID", "Project Name", "Department", "Action"];

  useEffect(() => {
    const departmentData = JSON.parse(
      localStorage.getItem("departments") || "[]"
    );
    const projectData = JSON.parse(localStorage.getItem("projects") || "[]");
    if (departmentData && projectData) {
      setDepartments(departmentData);
      setProjects(projectData);
    }
  }, []);

  const handleAddProjectButtonClick = () => {
    navigate("/projects/new");
  };

  const handleEditProjectButtonClick = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleDeleteProject = (projNo) => {
    if (confirm(`Are you sure you want to delete project projNo ${projNo}?`)) {
      let projects = JSON.parse(localStorage.getItem("projects"));
      projects = projects.filter((proj) => proj.projNo !== projNo);
      localStorage.setItem("projects", JSON.stringify(projects));
      if (projects.length === 0) {
        localStorage.removeItem("projects");
      }
      setProjects(projects);
      alert(`Project with projNo ${projNo} has been deleted successfully`);
    } else {
      return;
    }
  };

  const getDeptName = (deptNo) => {
    let dept = departments.find((dept) => dept.deptNo === deptNo);
    return dept.deptName;
  };

  const TableBody = () => {
    return projects.length !== 0 ? (
      <tbody>
        {projects.map((proj) => (
          <tr
            key={proj.projNo}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{proj.projNo}</td>
            <td>{proj.projName}</td>
            <td>{getDeptName(proj.deptNo)}</td>
            <td className="flex gap-2 justify-center">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditProjectButtonClick(proj.projNo)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteProject(proj.projNo)}
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
    <PageLayout pageTitle="Projects">
      <Button onClick={handleAddProjectButtonClick} type="button">
        Add a New Project
      </Button>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
    </PageLayout>
  );
}

export default ProjectsPage;
