import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import DataTable from "../components/Fragments/DataTable";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import PaginationBar from "../components/Fragments/PaginationBar";
import { deleteProject, getAllProjects } from "../services/projects.service";

function ProjectsPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const tableHeader = ["ID", "Project Name", "Department", "Action"];

  useEffect(() => {
    setLoading(true);
    getAllProjects(perPage, page + 1)
      .then((res) => {
        if (res.status === 200) {
          setProjects(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchProjects = async (perPage, page) => {
      const res = await getAllProjects(perPage, page);
      if (res.status === 200) {
        setProjects(res.data);
        setLoading(false);
      }
    };
    fetchProjects(perPage, page + 1);
  }, [page]);

  const handleAddProjectButtonClick = () => {
    navigate("/projects/new");
  };

  const handleEditProjectButtonClick = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleDeleteProject = (projNo) => {
    if (confirm(`Are you sure you want to delete project projNo ${projNo}?`)) {
      deleteProject(projNo)
        .then((res) => {
          if (res.status === 204) {
            alert(
              `Project with projNo ${projNo} has been deleted successfully`
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            `Error occurred. Please try again or contact admin. ERROR ${err}`
          );
        });

      // let projects = JSON.parse(localStorage.getItem("projects"));
      // projects = projects.filter((proj) => proj.projNo !== projNo);
      // localStorage.setItem("projects", JSON.stringify(projects));
      // if (projects.length === 0) {
      //   localStorage.removeItem("projects");
      // }
      // setProjects(projects);
      // alert(`Project with projNo ${projNo} has been deleted successfully`);
    } else {
      return;
    }
  };

  const TableBody = () => {
    return projects.length !== 0 ? (
      <tbody>
        {projects.map((proj) => (
          <tr
            key={proj.projno}
            className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
          >
            <td>{proj.projno}</td>
            <td>{proj.projname}</td>
            <td>{proj.deptnoNavigation.deptname}</td>
            <td className="flex gap-2 justify-center">
              <Button
                styleName="bg-green-700"
                onClick={() => handleEditProjectButtonClick(proj.projno)}
              >
                Edit
              </Button>
              <Button
                styleName="bg-red-700"
                onClick={() => handleDeleteProject(proj.projno)}
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
    <PageLayout pageTitle="Projects">
      <Button onClick={handleAddProjectButtonClick} type="button">
        Add a New Project
      </Button>
      <DataTable header={tableHeader} body={<TableBody />}></DataTable>
      <PaginationBar pageCount={10} setPage={setPage}></PaginationBar>
    </PageLayout>
  );
}

export default ProjectsPage;
