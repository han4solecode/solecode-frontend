import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function ProjectFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    projNo: 0,
    projName: "",
    deptNo: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [projects, setProjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState(initialValues);

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

  console.log(departments);

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
    // console.log(formValues);
  };

  const handleClearForm = (e) => {
    e.preventDefault();
    setFormValues(initialValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let errorMessages = {};

    if (!formValues.projName.trim()) {
      errorMessages.projName = "Project name is required";
    } else if (formValues.projName.length > 100) {
      errorMessages.projName = "Project name cannot exceed 100 character";
    } else {
      errorMessages.projName = "";
    }

    if (!formValues.deptNo) {
      errorMessages.deptNo = "Department is required";
    } else {
      errorMessages.deptNo = "";
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
        if (projects.length === 0) {
          var projNo = 1;
        } else {
          var projNo = projects[projects.length - 1].projNo + 1;
        }
        projects.push({
          ...formValues,
          projNo: Number(projNo),
          deptNo: Number(formValues.deptNo),
        });
        localStorage.setItem("projects", JSON.stringify(projects));

        alert("A new project has been created successfully");
        navigate("/projects");
      }
    }
  };

  return (
    <PageLayout
      pageTitle={isEditing ? `Editing Project ${id}` : "Add a New Project"}
    >
      <div className="w-full">
        <form autoComplete="off">
          <div className="mb-3">
            <label
              htmlFor="projName"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Project Name
            </label>
            <input
              type="text"
              name="projName"
              id="projName"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.projName}
            />
            {errors.projName && (
              <small className="text-red-600">{errors.projName}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="deptNo"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Department
            </label>
            <select
              name="deptNo"
              id="deptNo"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.deptNo}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Department
              </option>
              {departments.map((dept) => (
                <option value={dept.deptNo} key={dept.deptNo}>
                  {dept.deptName}
                </option>
              ))}
            </select>
            {errors.deptNo && (
              <small className="text-red-600">{errors.deptNo}</small>
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
