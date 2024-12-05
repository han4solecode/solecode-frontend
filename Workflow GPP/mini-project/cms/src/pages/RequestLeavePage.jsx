import { useState } from "react";
import { requestLeave } from "../services/employees.service";
import PageLayout from "../components/Layouts/PageLayout";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";
import { useSelector } from "react-redux";

function RequestLeavePage(props) {
  const {} = props;
  const { user: currentUser } = useSelector((state) => state.auth);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg"];

  const initialValues = {
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    // medicalCertFile: null,
  };

  const initialErrorValues = {
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    medicalCertFile: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrorValues);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const leaveTypes = ["Annual Leave", "Sick Leave", "Personal Leave"];

  // file helper functions
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      //   setFormValues({ ...formValues, medicalCertFile: files[0] });
      setSelectedFile(files[0]);
    }
    setFormValues({ ...formValues, [name]: value });
  };

  //   console.log(formValues);
  //   console.log(selectedFile);

  const handleClearForm = (e) => {
    e.preventDefault();
    setFormValues(initialValues);
    setSelectedFile(null);
  };

  //   console.log(errors);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let currentDate = new Date().toISOString().slice(0, 10);

    // calculate sick leave total days
    var startDate = new Date(formValues.startDate);
    var endDate = new Date(formValues.endDate);
    let daysTotal =
      Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      ) + 1;

    let errorMessages = {};

    // console.log(daysTotal);

    if (!formValues.leaveType) {
      errorMessages.leaveType = "Leave type is required";
    } else {
      errorMessages.leaveType = "";
    }

    if (!formValues.startDate) {
      errorMessages.startDate = "Start date is required";
    } else if (formValues.startDate < currentDate) {
      errorMessages.startDate =
        "Start date must be equal or greater than current date";
    } else {
      errorMessages.startDate = "";
    }

    if (!formValues.endDate) {
      errorMessages.endDate = "End date is required";
    } else if (formValues.endDate < formValues.startDate) {
      errorMessages.endDate =
        "End date must be equal or greater than start date";
    } else {
      errorMessages.endDate = "";
    }

    if (!formValues.reason.trim()) {
      errorMessages.reason = "Reason is required";
    } else {
      errorMessages.reason = "";
    }

    if (
      !selectedFile &&
      formValues.leaveType === "Sick Leave" &&
      daysTotal > 1
    ) {
      errorMessages.medicalCertFile = "Medical certificate file is required";
    } else if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      errorMessages.medicalCertFile = "File size exceeds 5MB limit";
    } else if (
      selectedFile &&
      !ALLOWED_FILE_TYPES.includes(selectedFile.type)
    ) {
      errorMessages.medicalCertFile = "Only PDF and JPG/JPEG file are allowed";
    } else {
      errorMessages.medicalCertFile = "";
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

      let requestLeaveFormData = new FormData();
      requestLeaveFormData.append("leaveType", formValues.leaveType);
      requestLeaveFormData.append("startDate", formValues.startDate);
      requestLeaveFormData.append("endDate", formValues.endDate);
      requestLeaveFormData.append("reason", formValues.reason);
      requestLeaveFormData.append(
        "medicalCertFile",
        selectedFile ? selectedFile : null
      );

      console.log("form data", requestLeaveFormData);

      requestLeave(requestLeaveFormData)
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
          {formValues.leaveType === "Sick Leave" ? (
            <div className="mb-3 w-full">
              <label
                htmlFor="medicalCertFile"
                className="block text-black mb-2 text-lg text-semibold"
              >
                Choose Medical Certificate File (PDF or JPG/JPEG, max 5MB)
              </label>
              <input
                type="file"
                onChange={(e) => handleInputChange(e)}
                accept=".pdf,.jpg,.jpeg"
                name="medicalCertFile"
              />
              <div className="flex flex-col">
                {selectedFile && (
                  <div className="mt-2 text-gray-600">
                    Selected file: {selectedFile.name} (
                    {formatFileSize(selectedFile.size)})
                  </div>
                )}
                {errors.medicalCertFile && (
                  <small className="text-red-600 mt-2">
                    {errors.medicalCertFile}
                  </small>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
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
