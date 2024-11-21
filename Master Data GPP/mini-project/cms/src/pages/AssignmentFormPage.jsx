import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import { getAllEmployeesNoPaging } from "../services/employees.service";
import { getAllProjectsNoPaging } from "../services/projects.service";
import {
  addAssignment,
  getAssignmentById,
  updateAssignment,
} from "../services/assignments.service";

function AssignmentFormPage(props) {
  const { isEditing } = props;
  const { empNo, projNo } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    empno: "",
    projno: "",
    dateworked: "",
    hoursworked: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllEmployeesNoPaging(), getAllProjectsNoPaging()])
      .then((res) => {
        setEmployees(res[0].data);
        setProjects(res[1].data);
      })
      .catch((err) => {
        console.log(err[0], err[1]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getAssignmentById(Number(empNo), Number(projNo))
        .then((res) => {
          if (res.status === 200) {
            setFormValues(res.data);
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

    if (!formValues.empno) {
      errorMessages.empno = "Employee is required";
    } else {
      errorMessages.empno = "";
    }

    if (!formValues.projno) {
      errorMessages.projno = "Project is required";
    } else {
      errorMessages.projno = "";
    }

    if (!formValues.dateworked) {
      errorMessages.dateworked = "Work Start Date is required";
    } else if (formValues.dateworked > currentDate) {
      errorMessages.dateworked = "Work Start Date is not valid";
    } else {
      errorMessages.dateworked = "";
    }

    if (!formValues.hoursworked) {
      errorMessages.hoursworked = "Hours worked is required";
    } else {
      errorMessages.hoursworked = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      // let assignments = JSON.parse(localStorage.getItem("assignments") || "[]");

      if (isEditing) {
        let updatedAssignemt = {
          ...formValues,
          empno: Number(formValues.empno),
          projno: Number(formValues.projno),
        };

        updateAssignment(Number(empNo), Number(projNo), updatedAssignemt)
          .then((res) => {
            if (res.status === 200) {
              alert(
                `Assignment of employee empNo ${empNo} in project projNo ${projNo} has been updated successfully`
              );
              navigate("/assignments");
            }
          })
          .catch((err) => {
            console.log(err);
            alert(
              `Error occurred. Please try again or contact admin. ERROR ${err}`
            );
          });
      } else {
        let newAssignment = {
          ...formValues,
          empno: Number(formValues.empno),
          projno: Number(formValues.projno),
        };
        addAssignment(newAssignment)
          .then((res) => {
            if (res.status === 201) {
              alert("A new assignment has been created successfully");
              navigate("/assignments");
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
              htmlFor="empno"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Employee
            </label>
            <select
              name="empno"
              id="empno"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.empno}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Employee
              </option>
              {employees.map((emp) => (
                <option value={emp.empno} key={emp.empno}>
                  {emp.fname} {emp.lname}
                </option>
              ))}
            </select>
            {errors.empno && (
              <small className="text-red-600">{errors.empno}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="projno"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Project
            </label>
            <select
              name="projno"
              id="projno"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.projno}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Project
              </option>
              {projects.map((proj) => (
                <option value={proj.projno} key={proj.projno}>
                  {proj.projname}
                </option>
              ))}
            </select>
            {errors.projno && (
              <small className="text-red-600">{errors.projno}</small>
            )}
          </div>
          <FormInput
            name="dateworked"
            type="date"
            onChange={(e) => handleInputChange(e)}
            value={formValues.dateworked}
            errorMessage={errors.dateworked}
          >
            Work Start Date
          </FormInput>
          <FormInput
            name="hoursworked"
            type="number"
            onChange={(e) => handleInputChange(e)}
            value={formValues.hoursworked}
            errorMessage={errors.hoursworked}
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
