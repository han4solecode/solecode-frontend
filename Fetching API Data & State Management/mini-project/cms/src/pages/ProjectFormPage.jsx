import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import { getAllDepartmentNoPaging } from "../services/departments.service";
import { addProject } from "../services/projects.service";

function ProjectFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    // projNo: 0,
    projname: "",
    deptno: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  // const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllDepartmentNoPaging()
      .then((res) => {
        if (res.status === 200) {
          setDepartments(res.data);
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

  useEffect(() => {
    if (isEditing) {
      const projectData = JSON.parse(localStorage.getItem("projects") || "[]");
      const editedProj = projectData.find((proj) => proj.projNo === Number(id));
      setFormValues(editedProj);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, isAvailable: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
    console.log(formValues);
  };

  const handleClearForm = (e) => {
    e.preventDefault();
    setFormValues(initialValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let errorMessages = {};

    if (!formValues.projname.trim()) {
      errorMessages.projname = "Project name is required";
    } else if (formValues.projname.length > 100) {
      errorMessages.projname = "Project name cannot exceed 100 character";
    } else {
      errorMessages.projname = "";
    }

    if (!formValues.deptno) {
      errorMessages.deptno = "Department is required";
    } else {
      errorMessages.deptno = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      let projects = JSON.parse(localStorage.getItem("projects") || "[]");

      if (isEditing) {
        let editedProject = {
          ...formValues,
          projNo: Number(formValues.projNo),
          deptNo: Number(formValues.deptNo),
        };

        let updatedProjectData = projects.map((proj) =>
          proj.projNo === editedProject.projNo ? editedProject : proj
        );

        localStorage.setItem("projects", JSON.stringify(updatedProjectData));

        alert(`Project ${editedProject.projNo} has been updated successfully`);
        navigate("/projects");
      } else {
        let newProject = { ...formValues, deptno: Number(formValues.deptno) };
        addProject(newProject)
          .then((res) => {
            if (res.status === 201) {
              alert("A new project has been created successfully");
              navigate("/projects");
            }
          })
          .catch((err) => {
            console.log(err);
            alert(
              `Error occurred. Please try again or contact admin. ERROR ${err}`
            );
          });
      }
    }
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
      pageTitle={isEditing ? `Editing Project ${id}` : "Add a New Project"}
    >
      <div className="w-full">
        <form autoComplete="off">
          <FormInput
            name="projname"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.projname}
            errorMessage={errors.projname}
          >
            Project Name
          </FormInput>
          <div className="mb-3">
            <label
              htmlFor="deptno"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Department
            </label>
            <select
              name="deptno"
              id="deptno"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.deptno}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Department
              </option>
              {departments.map((dept) => (
                <option value={dept.deptno} key={dept.deptno}>
                  {dept.deptname}
                </option>
              ))}
            </select>
            {errors.deptno && (
              <small className="text-red-600">{errors.deptno}</small>
            )}
          </div>
          <div className="mt-3 space-x-2">
            <Button type="submit" onClick={handleFormSubmit}>
              {isEditing ? "Edit" : "Add"}
            </Button>
            <Button
              type="reset"
              styleName="bg-gray-600"
              onClick={handleClearForm}
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}

export default ProjectFormPage;
