import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";
import LoadingAnimation from "../components/Elements/LoadingAnimation";
import {
  addEmployee,
  getEmployeeById,
  updateEmployee,
} from "../services/employees.service";
import {
  getAllDepartmentNoPaging,
  getDepartmentById,
} from "../services/departments.service";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../slices/authSlice";

function EmployeeFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const initialValues = {
    fname: "",
    lname: "",
    address: "",
    dob: "",
    sex: "",
    // position: "",
    deptno: "",
    ssn: "",
    phonenumber: "",
    email: "",
    employmenttype: "",
    salary: "",
    supervisorempno: "",
    level: "",
    // status: "",
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [availableSupervisors, setAvailableSupervisors] = useState([]);

  // employee dependent states
  const initialEDValues = {
    name: "",
    dob: "",
    sex: "",
    relationship: "",
  };
  const [edFormValues, setEDFormValues] = useState(initialEDValues);
  const [employeeDependents, setEmployeeDependents] = useState([]);

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess) {
      alert("A new employee has been created successfully");
      navigate("/employees");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    setLoading(true);
    getAllDepartmentNoPaging()
      .then((res) => {
        // if (res.status === 200) {
        // }
        console.log(res);

        setDepartments(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(
          `Error occurred. Please try again or contact admin. ERROR ${err}`
        );
        navigate("/dashboard");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      getEmployeeById(Number(id))
        .then((res) => {
          if (res.status === 200) {
            setFormValues(res.data);
            setEmployeeDependents(res.data.empdependents);
          }
          console.log(res);
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

  useEffect(() => {
    if (formValues.deptno !== 0) {
      getDepartmentById(Number(formValues.deptno))
        .then((res) => {
          // console.log(res.data);
          setAvailableSupervisors(
            res.data.employees?.filter((emp) => {
              return emp.status === "Active";
            })
          );
          // setAvailableSupervisors(res.data.employees);
        })
        .catch((err) => {
          console.log(err);
          // alert(
          //   `Error occurred. Please try again or contact admin. ERROR ${err}`
          // );
        });
    }
  }, [formValues.deptno]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, isAvailable: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
      if (name === "deptno") {
        setFormValues({ ...formValues, supervisorempno: "", deptno: value });
      }
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
    let currentDate = new Date().toISOString().slice(0, 10);
    console.log(currentDate);
    let phoneNumberRegex = /^(0)8[1-9][0-9]{6,9}$/;
    let errorMessages = {};

    if (!formValues.fname.trim()) {
      errorMessages.fname = "First name is required";
    } else if (formValues.fname.length > 50) {
      errorMessages.fname = "First name cannot exceed 50 characters";
    } else {
      errorMessages.fname = "";
    }

    if (!formValues.lname.trim()) {
      errorMessages.lname = "Last name is required";
    } else if (formValues.lname.length > 50) {
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

    // if (!formValues.position) {
    //   errorMessages.position = "Position is required";
    // } else {
    //   errorMessages.position = "";
    // }

    if (!formValues.deptno) {
      errorMessages.deptno = "Department is required";
    } else {
      errorMessages.deptno = "";
    }

    if (!formValues.email) {
      errorMessages.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errorMessages.email = "Email is not valid";
    } else {
      errorMessages.email = "";
    }

    if (!formValues.phonenumber) {
      errorMessages.phonenumber = "Phone number is required";
    } else if (!phoneNumberRegex.test(formValues.phonenumber)) {
      errorMessages.phonenumber = "Phone number is not valid";
    } else {
      errorMessages.phonenumber = "";
    }

    if (!formValues.ssn) {
      errorMessages.ssn = "SSN is required";
    } else {
      errorMessages.ssn = "";
    }

    if (!formValues.employmenttype) {
      errorMessages.employmenttype = "Employment type is required";
    } else {
      errorMessages.employmenttype = "";
    }

    if (!formValues.salary) {
      errorMessages.salary = "Salary is required";
    } else {
      errorMessages.salary = "";
    }

    if (!formValues.level) {
      errorMessages.level = "Level is required";
    } else {
      errorMessages.level = "";
    }

    if (!formValues.username.trim()) {
      errorMessages.username = "Username is required";
    } else if (formValues.username.length > 50) {
      errorMessages.username = "Username cannot exceed 50 characters";
    } else {
      errorMessages.username = "";
    }

    if (!formValues.password) {
      errorMessages.password = "Passwword is required";
    } else if (formValues.password.length < 8) {
      errorMessages.password = "Passwword must be atleast 8 character long";
    } else if (
      !/[A-Z]/.test(formValues.password) ||
      !/[a-z]/.test(formValues.password)
    ) {
      errorMessages.password =
        "Passwword must contain uppercase and lowercase letter";
    } else {
      errorMessages.password = "";
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
        let updatedEmployee = {
          ...formValues,
          deptno: Number(formValues.deptno),
          salary: Number(formValues.salary),
          supervisorempno:
            formValues.supervisorempno === null
              ? formValues.supervisorempno
              : Number(formValues.supervisorempno),
          level: Number(formValues.level),
          empdependents:
            employeeDependents.length === 0 ? null : employeeDependents,
        };

        updateEmployee(Number(id), updatedEmployee)
          .then((res) => {
            if (res.status === 200) {
              alert(`Employee ${id} has been updated successfully`);
              navigate("/employees");
            }
          })
          .catch((err) => {
            console.log(err);
            alert(
              `Error occurred. Please try again or contact admin. ERROR ${err}`
            );
          });
      } else {
        let newEmployee = {
          ...formValues,
          deptno: Number(formValues.deptno),
          salary: Number(formValues.salary),
          supervisorempno:
            formValues.supervisorempno === ""
              ? null
              : formValues.supervisorempno,
          level: Number(formValues.level),
          status: "Active",
          empdependent:
            employeeDependents.length === 0 ? [] : employeeDependents,
        };
        // addEmployee(newEmployee)
        //   .then((res) => {
        //     if (res.status === 201) {
        //       alert("A new employee has been created successfully");
        //       navigate("/employees");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     alert(
        //       `Error occurred. Please try again or contact admin. ERROR ${err}`
        //     );
        //   });
        dispatch(register(newEmployee));
      }
    }
  };

  const handleEDInputChange = (e) => {
    const { name, value } = e.target;
    setEDFormValues({ ...edFormValues, [name]: value });
  };

  const handleClearEDForm = (e) => {
    e.preventDefault();
    setEDFormValues(initialEDValues);
  };

  const handleEDFormSubmit = (e) => {
    e.preventDefault();
    setEmployeeDependents([...employeeDependents, edFormValues]);
    setEDFormValues(initialEDValues);
  };

  const handleRemoveEDButtonClick = (index, e) => {
    e.preventDefault();
    const newEDArray = [
      ...employeeDependents.slice(0, index),
      ...employeeDependents.slice(index + 1),
    ];
    setEmployeeDependents(newEDArray);
  };

  console.log(edFormValues);
  console.log(employeeDependents);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return (
    <PageLayout
      pageTitle={isEditing ? `Editing Employee ${id}` : "Add a New Employee"}
    >
      <div className="w-full">
        <form autoComplete="off">
          <div className="flex gap-4">
            <FormInput
              name="username"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.username}
              errorMessage={errors.username}
            >
              Username
            </FormInput>
            <FormInput
              name="password"
              type="password"
              onChange={(e) => handleInputChange(e)}
              value={formValues.password}
              errorMessage={errors.password}
            >
              Password
            </FormInput>
          </div>
          <div className="flex gap-4">
            <FormInput
              name="fname"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.fname}
              errorMessage={errors.fname}
            >
              First Name
            </FormInput>
            <FormInput
              name="lname"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.lname}
              errorMessage={errors.lname}
            >
              Last Name
            </FormInput>
          </div>
          <div className="flex gap-4">
            <FormInput
              name="email"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.email}
              errorMessage={errors.email}
              placeholder="example@email.com"
            >
              Email
            </FormInput>
            <FormInput
              name="phonenumber"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.phonenumber}
              errorMessage={errors.phonenumber}
              placeholder="08XXXXXXXX"
            >
              Phone Number
            </FormInput>
            <FormInput
              name="ssn"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.ssn}
              errorMessage={errors.ssn}
            >
              Social Security Number
            </FormInput>
          </div>
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
          <div className="flex items-center gap-4">
            {/* <FormInput
              name="position"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.position}
              errorMessage={errors.position}
            >
              Position
            </FormInput> */}
            <div className="mb-3 w-full">
              <label
                htmlFor="employmenttype"
                className="block text-black mb-2 text-lg text-semibold"
              >
                Employment Type
              </label>
              <select
                name="employmenttype"
                id="employmenttype"
                className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
                value={formValues.employmenttype}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled hidden>
                  Select Employment Type
                </option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
              {errors.employmenttype && (
                <small className="text-red-600">{errors.employmenttype}</small>
              )}
            </div>
            <FormInput
              name="salary"
              type="number"
              onChange={(e) => handleInputChange(e)}
              value={formValues.salary}
              errorMessage={errors.salary}
              min="0"
            >
              Salary
            </FormInput>
            <FormInput
              name="level"
              type="number"
              onChange={(e) => handleInputChange(e)}
              value={formValues.level}
              errorMessage={errors.level}
              min="0"
            >
              Level
            </FormInput>
          </div>
          <div className="mb-3 w-full">
            <label
              htmlFor="supervisorempno"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Supervisor
            </label>
            {availableSupervisors !== undefined ? (
              <select
                name="supervisorempno"
                id="supervisorempno"
                className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
                value={formValues.supervisorempno}
                onChange={(e) => handleInputChange(e)}
              >
                <option value={null} hidden>
                  Select Supervisor
                </option>
                {availableSupervisors.map((sup) => (
                  <option value={sup.id} key={sup.id}>
                    {sup.fname} {sup.lname}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-red-600">No Supervisor Available</span>
            )}
          </div>
          <div className="mb-3 w-full">
            <div className="my-3">
              <span className="text-xl font-semibold">
                Add Employee Dependent
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <form autoComplete="off">
                <FormInput
                  name="name"
                  type="text"
                  onChange={(e) => handleEDInputChange(e)}
                  value={edFormValues.name}
                  // errorMessage={errors.email}
                  // placeholder="example@email.com"
                >
                  Name
                </FormInput>
                <FormInput
                  name="dob"
                  type="date"
                  onChange={(e) => handleEDInputChange(e)}
                  value={edFormValues.dob}
                  // errorMessage={errors.email}
                  // placeholder="example@email.com"
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
                      checked={edFormValues.sex === "Male"}
                      onChange={(e) => handleEDInputChange(e)}
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
                      checked={edFormValues.sex === "Female"}
                      onChange={(e) => handleEDInputChange(e)}
                    />
                    <label
                      htmlFor="bordered-radio-2"
                      className="w-full py-4 ms-2 text-lg font-medium"
                    >
                      Female
                    </label>
                  </div>
                  {/* {errors.sex && (
                    <small className="text-red-600">{errors.sex}</small>
                  )} */}
                </div>
                <FormInput
                  name="relationship"
                  type="text"
                  onChange={(e) => handleEDInputChange(e)}
                  value={edFormValues.relationship}
                  // errorMessage={errors.email}
                  // placeholder="example@email.com"
                >
                  Relationship
                </FormInput>
                <div className="mt-3 space-x-2">
                  <Button type="submit" onClick={handleEDFormSubmit}>
                    Add Dependent
                  </Button>
                  <Button
                    type="reset"
                    styleName="bg-gray-600"
                    onClick={handleClearEDForm}
                  >
                    Clear
                  </Button>
                </div>
              </form>
              <div>
                <table className="shadow-lg rounded table-fixed w-full">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Date of Birth</th>
                      <th>Sex</th>
                      <th>Relationship</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {employeeDependents.length !== 0 ? (
                    <tbody>
                      {employeeDependents.map((ed, index) => (
                        <tr
                          key={index}
                          className="text-center align-middle odd:bg-white even:bg-slate-200 text-black"
                        >
                          <td>{index + 1}</td>
                          <td>{ed.name}</td>
                          <td>{ed.dob}</td>
                          <td>{ed.sex}</td>
                          <td>{ed.relationship}</td>
                          <td>
                            <Button
                              styleName="bg-red-700"
                              onClick={(e) =>
                                handleRemoveEDButtonClick(index, e)
                              }
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr className="bg-slate-500">
                        <td
                          colSpan="6"
                          className="text-black text-center text-xl py-10"
                        >
                          No Employee Dependent Added
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
          <div className="mt-3 space-x-2 flex justify-end">
            <Button type="submit" onClick={handleFormSubmit}>
              {isEditing
                ? "Edit"
                : isLoading
                ? "Creating Employee..."
                : "Add New Employee"}
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
