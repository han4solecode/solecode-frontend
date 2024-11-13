import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";

function AssignmentFormPage(props) {
  const { isEditing } = props;
  const { empNo, projNo } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    empNo: "",
    projNo: "",
    dateWorked: "",
    hoursWorked: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [errors, setErrors] = useState(initialValues);

  useEffect(() => {
    const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
    const projectData = JSON.parse(localStorage.getItem("projects") || "[]");
    const assignmentData = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );
    if (projectData && employeeData && assignmentData) {
      setProjects(projectData);
      setEmployees(employeeData);
      setAssignments(assignmentData);
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      const assignmentData = JSON.parse(
        localStorage.getItem("assignments") || "[]"
      );
      const editedAssignment = assignmentData.find(
        (assignment) =>
          assignment.empNo === Number(empNo) &&
          assignment.projNo === Number(projNo)
      );
      //   console.log(empNo);
      setFormValues(editedAssignment);
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
    e.preventDefault(e);

    // validation
    let currentDate = new Date().toISOString().slice(0, 10);
    let errorMessages = {};

    if (!formValues.empNo) {
      errorMessages.empNo = "Employee is required";
    } else {
      errorMessages.empNo = "";
    }

    if (!formValues.projNo) {
      errorMessages.projNo = "Project is required";
    } else {
      errorMessages.projNo = "";
    }

    if (!formValues.dateWorked) {
      errorMessages.dateWorked = "Work Start Date is required";
    } else if (formValues.dateWorked > currentDate) {
      errorMessages.dateWorked = "Work Start Date is not valid";
    } else {
      errorMessages.dateWorked = "";
    }

    if (!formValues.hoursWorked) {
      errorMessages.hoursWorked = "Hours worked is required";
    } else {
      errorMessages.hoursWorked = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      let assignments = JSON.parse(localStorage.getItem("assignments") || "[]");

      if (isEditing) {
        let editedAssignment = {
          ...formValues,
          empNo: Number(formValues.empNo),
          projNo: Number(formValues.projNo),
        };

        console.log(editedAssignment);

        let updatedAssignmentData = assignments.map((assignment) =>
          assignment.empNo === Number(empNo) &&
          assignment.projNo === Number(projNo)
            ? editedAssignment
            : assignment
        );

        console.log(updatedAssignmentData);

        localStorage.setItem(
          "assignments",
          JSON.stringify(updatedAssignmentData)
        );

        alert(
          `Assignment of employee empNo ${empNo} in project projNo ${projNo} has been updated successfully`
        );
        navigate("/assignments");
      } else {
        assignments.push({
          ...formValues,
          empNo: Number(formValues.empNo),
          projNo: Number(formValues.projNo),
        });
        localStorage.setItem("assignments", JSON.stringify(assignments));

        alert("A new assignment has been created successfully");
        navigate("/assignments");
      }
    }
  };

  return (
    <PageLayout
      pageTitle={
        isEditing
          ? `Editing Assignment For Employee ${empNo} in Project ${projNo}`
          : "Add a New Assignment"
      }
    >
      <div className="w-full">
        <form autoComplete="off">
          <div className="mb-3">
            <label
              htmlFor="empNo"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Employee
            </label>
            <select
              name="empNo"
              id="empNo"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.empNo}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Employee
              </option>
              {employees.map((emp) => (
                <option value={emp.empNo} key={emp.empNo}>
                  {emp.fName} {emp.lName}
                </option>
              ))}
            </select>
            {errors.empNo && (
              <small className="text-red-600">{errors.empNo}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="projNo"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Project
            </label>
            <select
              name="projNo"
              id="projNo"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.projNo}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Project
              </option>
              {projects.map((proj) => (
                <option value={proj.projNo} key={proj.projNo}>
                  {proj.projName}
                </option>
              ))}
            </select>
            {errors.projNo && (
              <small className="text-red-600">{errors.projNo}</small>
            )}
          </div>
          <FormInput
            name="dateWorked"
            type="date"
            onChange={(e) => handleInputChange(e)}
            value={formValues.dateWorked}
            errorMessage={errors.dateWorked}
          >
            Work Start Date
          </FormInput>
          <FormInput
            name="hoursWorked"
            type="number"
            onChange={(e) => handleInputChange(e)}
            value={formValues.hoursWorked}
            errorMessage={errors.hoursWorked}
            min="0"
          >
            Hours Worked
          </FormInput>
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

export default AssignmentFormPage;
