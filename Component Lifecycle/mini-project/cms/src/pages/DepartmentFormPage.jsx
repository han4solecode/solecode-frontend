import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function DepartmentFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    deptNo: 0,
    deptName: "",
    mgrEmpNo: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [employees, setEmployees] = useState([]);
  const [empsInDept, setEmpsInDept] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState(initialValues);

  useState(() => {
    const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
    const departmentData = JSON.parse(
      localStorage.getItem("departments") || "[]"
    );

    // get all employees in a specific department (from params :id)
    const empsInDept = employeeData.filter((emp) => emp.deptNo === Number(id));
    console.log(empsInDept);

    if (employeeData && departmentData && empsInDept) {
      setEmployees(employeeData);
      setDepartments(departmentData);
      setEmpsInDept(empsInDept);
    }
  }, []);

  useState(() => {
    if (isEditing) {
      const departmentData = JSON.parse(
        localStorage.getItem("departments") || "[]"
      );
      const editedDept = departmentData.find(
        (dept) => dept.deptNo === Number(id)
      );
      setFormValues(editedDept);
    }
  }, []);

  console.log(formValues);
  //   console.log(empsInDept);

  const getEmpsInDept = (deptNo) => {
    let filteredEmployees = employees.filter(
      (employee) => employee.deptNo === deptNo
    );
    return filteredEmployees;
  };

  //   useState(() => {
  //     const employeeData = JSON.parse(localStorage.getItem("employees") || "[]");
  //     const empsInDept = employeeData.filter((emp) => emp.deptNo === id);
  //     console.log(employeeData);
  //     console.log(formValues);
  //     console.log(empsInDept);
  //     setEmpsInDept(empsInDept);
  //   }, []);

  //   console.log(empsInDept);

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

    if (!formValues.deptName.trim()) {
      errorMessages.deptName = "Department name is required";
    } else {
      errorMessages.deptName = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      let departments = JSON.parse(localStorage.getItem("departments") || "[]");

      if (isEditing) {
        let editedDepartment = {
          ...formValues,
          deptNo: Number(formValues.deptNo),
          mgrEmpNo: Number(formValues.mgrEmpNo),
        };

        let updatedDepartmentData = departments.map((dept) =>
          dept.deptNo === editedDepartment.deptNo ? editedDepartment : dept
        );

        localStorage.setItem(
          "departments",
          JSON.stringify(updatedDepartmentData)
        );

        alert(
          `Department ${editedDepartment.deptNo} has been updated successfully`
        );
        navigate("/departments");
      } else {
        // auto generate deptNo
        if (departments.length === 0) {
          var deptNo = 1;
        } else {
          var deptNo = departments[departments.length - 1].deptNo + 1;
        }
        departments.push({
          ...formValues,
          deptNo: Number(deptNo),
          mgrEmpNo: Number(formValues.mgrEmpNo),
        });
        localStorage.setItem("departments", JSON.stringify(departments));

        alert("A new department has been created successfully");
        navigate("/departments");
      }
    }
  };

  return (
    <PageLayout
      pageTitle={
        isEditing ? `Editing Department ${id}` : "Add a New Department"
      }
    >
      <div className="w-full">
        <form autoComplete="off">
          <div className="mb-3">
            <label
              htmlFor="deptName"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Department Name
            </label>
            <input
              type="text"
              name="deptName"
              id="deptName"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.deptName}
            />
            {errors.deptName && (
              <small className="text-red-600">{errors.deptName}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="mgrEmpNo"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Manager
            </label>
            {employees.length !== 0 ? (
              <select
                name="mgrEmpNo"
                id="mgrEmpNo"
                className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
                value={formValues.mgrEmpNo}
                onChange={(e) => handleInputChange(e)}
                // defaultValue={empsInDept[0].empNo}
              >
                <option value="" disabled hidden>
                  Select Manager
                </option>
                {employees.map((emp) => (
                  <option key={emp.empNo} value={emp.empNo}>
                    {emp.fName} {emp.lName}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-red-600">No Employee Available</span>
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

export default DepartmentFormPage;
