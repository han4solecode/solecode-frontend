import { useState } from "react";
import { requestLeave } from "../services/employees.service";
import PageLayout from "../components/Layouts/PageLayout";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";
import { useSelector } from "react-redux";

function RequestLeavePage(props) {
  const {} = props;
  const { user: currentUser } = useSelector((state) => state.auth);

  const initialValues = {
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const leaveTypes = ["Sick Leave", "Personal Leave"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
    let errorMessages = {};

    if (!formValues.leaveType) {
      errorMessages.leaveType = "Leave type is required";
    } else {
      errorMessages.leaveType = "";
    }

    if (!formValues.startDate) {
      errorMessages.startDate = "Start date is required";
    } else if (formValues.startDate < currentDate) {
      errorMessages.startDate = "Start date must be greater than current date";
    } else {
      errorMessages.startDate = "";
    }

    if (!formValues.startDate) {
      errorMessages.endDate = "End date is required";
    } else if (formValues.endDate < currentDate) {
      errorMessages.endDate = "End date must be greater than current date";
    } else if (formValues.endDate < formValues.startDate) {
      errorMessages.endDate = "End date must be greater than start date";
    } else {
      errorMessages.endDate = "";
    }

    if (!formValues.reason.trim()) {
      errorMessages.reason = "Reason is required";
    } else {
      errorMessages.reason = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      // send leave request
      setIsLoading(true);
      requestLeave(formValues)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
          setFormValues(initialValues);
        });
    }
  };

  return (
    <PageLayout pageTitle="Leave Request Form">
      <div className="max-w-screen-sm">
        <form autoComplete="off">
          <FormInput
            type="text"
            value={`${currentUser?.user?.fname} ${currentUser?.user?.lname}`}
          >
            Employee Name
          </FormInput>
          <div className="mb-3 w-full">
            <label
              htmlFor="leaveType"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Leave Type
            </label>
            <select
              name="leaveType"
              id="leaveType"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              value={formValues.leaveType}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled hidden>
                Select Leave Type
              </option>
              {leaveTypes.map((lt, index) => (
                <option value={lt} key={index}>
                  {lt}
                </option>
              ))}
            </select>
            {errors.leaveType && (
              <small className="text-red-600">{errors.leaveType}</small>
            )}
          </div>
          <FormInput
            name="startDate"
            type="date"
            onChange={(e) => handleInputChange(e)}
            value={formValues.startDate}
            errorMessage={errors.startDate}
          >
            Start Date
          </FormInput>
          <FormInput
            name="endDate"
            type="date"
            onChange={(e) => handleInputChange(e)}
            value={formValues.endDate}
            errorMessage={errors.endDate}
          >
            End Date
          </FormInput>
          <FormInput
            name="reason"
            type="date"
            onChange={(e) => handleInputChange(e)}
            value={formValues.reason}
            errorMessage={errors.reason}
            isTextarea={true}
          >
            Reason
          </FormInput>
          <div className="mt-3 space-x-2">
            <Button type="submit" onClick={handleFormSubmit}>
              {isLoading ? "Requesting..." : "Submit Request"}
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

export default RequestLeavePage;
