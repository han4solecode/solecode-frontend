import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function MemberFormPage(props) {
  const {} = props;

  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    address: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues({ ...formValues, isAvailable: checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleClearForm = (e) => {
    e.preventDefault();

    setFormValues(initialValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <PageLayout pageTitle="Add a New Member">
      <div className="w-full">
        <form autoComplete="off">
          <div className="mb-3">
            <label
              htmlFor="fullName"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.fullName}
            />
            {errors.fullName && (
              <small className="text-red-600">{errors.fullName}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.email}
            />
            {errors.email && (
              <small className="text-red-600">{errors.email}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="phoneNumber"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.phoneNumber}
            />
            {errors.phoneNumber && (
              <small className="text-red-600">{errors.phoneNumber}</small>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="address"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Address
            </label>
            <textarea
              type="text"
              name="address"
              id="address"
              className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
              onChange={(e) => handleInputChange(e)}
              value={formValues.address}
            />
            {errors.address && (
              <small className="text-red-600">{errors.address}</small>
            )}
          </div>
          <div className="mt-3 space-x-2">
            <Button type="submit" onClick={handleFormSubmit}>
              Submit
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

export default MemberFormPage;
