import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deactivateEmployee } from "../services/employees.service";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";
import PageLayout from "../components/Layouts/PageLayout";

function EmployeeDeactivationFormPage(props) {
  const {} = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ reason: "" });

  const handleInputChange = (e) => {
    const { value } = e.target;
    setReason(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let errorMessages = {};

    if (!reason) {
      errorMessages.reason = "Deactivation reason is required";
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
      deactivateEmployee(Number(id), { reason })
        .then((res) => {
          if (res.status === 204) {
            alert(
              `Employee with empNo ${id} has been deactivated successfully`
            );
            navigate("/employees");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            `Error occurred. Please try again or contact admin. ERROR ${err}`
          );
        });
    }
  };

  return (
    <PageLayout pageTitle="Employee Deactivation">
      <div className="w-full">
        <form autoComplete="off">
          <FormInput
            name="reason"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={reason}
            errorMessage={errors.reason}
          >
            Deactivation Reason
          </FormInput>
          <div className="space-x-2">
            <Button onClick={handleFormSubmit}>Submit</Button>
            <Button
              styleName="bg-gray-600"
              onClick={() => navigate(`/employees/${id}/detail`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}

export default EmployeeDeactivationFormPage;
