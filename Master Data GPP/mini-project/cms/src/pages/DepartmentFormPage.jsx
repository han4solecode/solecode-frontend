import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/departments.service";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";
import LoadingAnimation from "../components/Elements/LoadingAnimation";

function DepartmentFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    // deptNo: 0,
    deptname: "",
    mgrempno: "",
    address: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [employees, setEmployees] = useState([]);
  const [empsInDept, setEmpsInDept] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getDepartmentById(Number(id))
        .then((res) => {
          if (res.status === 200) {
            setFormValues({
              ...res.data,
              address:
                res.data.locations.length === 0
                  ? ""
                  : res.data.locations[0].address,
            });
            setEmployees(res.data.employees);
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

  console.log(formValues);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, isAvailable: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  console.log(formValues);

  const handleClearForm = (e) => {
    e.preventDefault();
    setFormValues(initialValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let errorMessages = {};

    if (!formValues.deptname.trim()) {
      errorMessages.deptname = "Department name is required";
    } else {
      errorMessages.deptname = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      if (isEditing) {
        let updatedDepartment = {
          ...formValues,
          mgrempno:
            formValues.mgrempno === null
              ? formValues.mgrempno
              : Number(formValues.mgrempno),
          locations: [{ address: formValues.address }],
        };

        updateDepartment(Number(id), updatedDepartment)
          .then((res) => {
            if (res.status === 200) {
              alert(`Department ${id} has been updated successfully`);
              navigate("/departments");
            }
          })
          .catch((err) => {
            console.log(err);
            alert(
              `Error occurred. Please try again or contact admin. ERROR ${err}`
            );
          });
      } else {
        let newDepartment = {
          deptname: formValues.deptname,
          locations: [{ address: formValues.address }],
        };
        addDepartment(newDepartment)
          .then((res) => {
            if (res.status === 201) {
              alert("A new department has been created successfully");
              navigate("/departments");
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
        isEditing ? `Editing Department ${id}` : "Add a New Department"
      }
    >
      <div className="w-full">
        <form autoComplete="off">
          <FormInput
            name="deptname"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.deptname}
            errorMessage={errors.deptname}
          >
            Department Name
          </FormInput>
          <FormInput
            name="address"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.address}
            errorMessage={errors.address}
            isTextarea={true}
          >
            Department Address
          </FormInput>
          <div className="mb-3">
            <label
              htmlFor="mgrempno"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Manager
            </label>
            {employees.length !== 0 ? (
              <select
                name="mgrempno"
                id="mgrempno"
                className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
                value={formValues.mgrempno}
                onChange={(e) => handleInputChange(e)}
                // defaultValue={empsInDept[0].empNo}
              >
                <option value={null} hidden>
                  Select Manager
                </option>
                {employees.map((emp) => (
                  <option key={emp.empno} value={emp.empno}>
                    {emp.fname} {emp.lname}
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
