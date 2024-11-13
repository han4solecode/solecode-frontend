import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";

function EmployeeFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    // empNo: 0,
    fName: "",
    lName: "",
    address: "",
    dob: "",
    sex: "",
    position: "",
    deptNo: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState(initialValues);

  useEffect(() => {
    const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
    const departmentData = JSON.parse(
      localStorage.getItem("departments") || "[]"
    );
    if (employeeData && departmentData) {
      setEmployees(employeeData);
      setDepartments(departmentData);
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      const employeeData = JSON.parse(
        localStorage.getItem("employees") || "[]"
      );
      const editedEmp = employeeData.find((emp) => emp.empNo === Number(id));
      setFormValues(editedEmp);
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
    let currentDate = new Date().toISOString().slice(0, 10);
    console.log(currentDate);
    let errorMessages = {};

    if (!formValues.fName.trim()) {
      errorMessages.fName = "First name is required";
    } else if (formValues.fName.length > 50) {
      errorMessages.fName = "First name cannot exceed 50 characters";
    } else {
      errorMessages.fName = "";
    }

    if (formValues.lname.length > 50) {
      errorMessages.lname = "Last name cannot exceed 50 characters";
    } else {
      errorMessages.lname = "";
    }

    if (!formValues.address.trim()) {
      errorMessages.address = "Address is required";
    } else if (formValues.address.length > 200) {
      errorMessages.address = "Address cannot exceed 200 characters";
    } else {
      errorMessages.address = "";
    }

    if (!formValues.dob) {
      errorMessages.dob = "Date of birth is required";
    } else if (formValues.dob > currentDate) {
      errorMessages.dob = "Date of birth is not valid";
    } else {
      errorMessages.dob = "";
    }

    if (!formValues.sex) {
      errorMessages.sex = "Sex is required";
    } else {
      errorMessages.sex = "";
    }

    if (!formValues.position) {
      errorMessages.position = "Position is required";
    } else {
      errorMessages.position = "";
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
      let employees = JSON.parse(localStorage.getItem("employees") || "[]");

      if (isEditing) {
        let editedEmployee = {
          ...formValues,
          empNo: Number(formValues.empNo),
          deptNo: Number(formValues.deptNo),
        };

        let updatedEmployeeData = employees.map((emp) =>
          emp.empNo === editedEmployee.empNo ? editedEmployee : emp
        );

        localStorage.setItem("employees", JSON.stringify(updatedEmployeeData));

        alert(`Employee ${editedEmployee.empNo} has been updated successfully`);
        navigate("/employees");
      } else {
        if (employees.length === 0) {
          var empNo = 1;
        } else {
          var empNo = employees[employees.length - 1].empNo + 1;
        }
        employees.push({
          ...formValues,
          empNo: Number(empNo),
          deptNo: Number(formValues.deptNo),
        });
        localStorage.setItem("employees", JSON.stringify(employees));

        alert("A new employee has been created successfully");
        navigate("/employees");
      }
    }
  };

  return (
    <PageLayout
      pageTitle={isEditing ? `Editing Employee ${id}` : "Add a New Employee"}
    >
      <div className="w-full">
        <form autoComplete="off">
          <FormInput
            name="fName"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.fName}
            errorMessage={errors.fName}
          >
            First Name
          </FormInput>
          <FormInput
            name="lName"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.lName}
            errorMessage={errors.lName}
          >
            Last Name
          </FormInput>
          <FormInput
            name="address"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.address}
            errorMessage={errors.address}
            isTextarea={true}
          >
            Address
          </FormInput>
          <FormInput
            name="dob"
            type="date"
            onChange={(e) => handleInputChange(e)}
            value={formValues.dob}
            errorMessage={errors.dob}
          >
            Date of Birth
          </FormInput>
          <div className="mb-3">
            <label
              htmlFor="sex"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Sex
            </label>
            <div className="flex items-center ps-4">
              <input
                id="bordered-radio-1"
                type="radio"
                value="Male"
                name="sex"
                className="w-6 h-6"
                checked={formValues.sex === "Male"}
                onChange={(e) => handleInputChange(e)}
              />
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-4 ms-2 text-lg font-medium"
              >
                Male
              </label>
            </div>
            <div className="flex items-center ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                value="Female"
                name="sex"
                className="w-6 h-6"
                checked={formValues.sex === "Female"}
                onChange={(e) => handleInputChange(e)}
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ms-2 text-lg font-medium"
              >
                Female
              </label>
            </div>
            {errors.sex && <small className="text-red-600">{errors.sex}</small>}
          </div>
          <FormInput
            name="position"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.position}
            errorMessage={errors.position}
          >
            Position
          </FormInput>
          <div className="mb-3">
            <label
              htmlFor="deptno"
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

export default EmployeeFormPage;
