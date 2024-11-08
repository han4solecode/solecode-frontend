import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";

function MemberFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    id: 0,
    fullName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    address: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  useState(() => {
    if (isEditing) {
      const memberData = JSON.parse(localStorage.getItem("members") || "[]");
      const editedMember = memberData.find(
        (member) => member.id === Number(id)
      );
      setFormValues(editedMember);
    }
  }, []);

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
    // ((!/\S+@\S+\.\S+/.test(email)))
    let emailRegex = /\S+@\S+\.\S+/;
    let phoneNumberRegex = /^(\+62)8[1-9][0-9]{6,9}$/;
    let errorMessages = {};

    if (!formValues.fullName.trim()) {
      errorMessages.fullName = "Full name cannot be empty";
    } else {
      errorMessages.fullName = "";
    }

    if (!formValues.email) {
      errorMessages.email = "Email cannot be empty";
    } else if (!emailRegex.test(formValues.email)) {
      errorMessages.email = "Email is not valid";
    } else {
      errorMessages.email = "";
    }

    if (!formValues.gender) {
      errorMessages.gender = "Gender cannot be empty";
    } else {
      errorMessages.gender = "";
    }

    if (!formValues.phoneNumber) {
      errorMessages.phoneNumber = "Phone number cannot be empty";
    } else if (!phoneNumberRegex.test(formValues.phoneNumber)) {
      errorMessages.phoneNumber = "Phone number is not valid";
    } else {
      errorMessages.phoneNumber = "";
    }

    if (!formValues.address.trim()) {
      errorMessages.address = "Address cannot be empty";
    } else if (formValues.address.length > 200) {
      errorMessages.address = "Address cannot exceed 200 characters";
    } else {
      errorMessages.address = "";
    }

    setErrors(errorMessages);

    let formValid = true;
    for (let propName in errorMessages) {
      if (errorMessages[propName].length > 0) {
        formValid = false;
      }
    }

    if (formValid) {
      let members = JSON.parse(localStorage.getItem("members") || "[]");

      if (isEditing) {
        let editedMember = {
          ...formValues,
          id: Number(formValues.id),
        };

        let updatedMemberData = members.map((member) =>
          member.id === editedMember.id ? editedMember : member
        );

        localStorage.setItem("members", JSON.stringify(updatedMemberData));

        alert(
          `Member with ID ${editedMember.id} has been updated successfully`
        );
        navigate("/members");
      } else {
        if (members.length === 0) {
          var id = 1;
        } else {
          var id = members[members.length - 1].id + 1;
        }
        members.push({ ...formValues, id: Number(id) });
        localStorage.setItem("members", JSON.stringify(members));

        alert("A new member has been created successfully");
        navigate("/members");
      }
    }
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
              htmlFor="text"
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
              htmlFor="gender"
              className="block text-black mb-2 text-lg text-semibold"
            >
              Gender
            </label>
            <div className="flex items-center ps-4">
              <input
                id="bordered-radio-1"
                type="radio"
                value="Male"
                name="gender"
                className="w-6 h-6"
                checked={formValues.gender === "Male"}
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
                name="gender"
                className="w-6 h-6"
                checked={formValues.gender === "Female"}
                onChange={(e) => handleInputChange(e)}
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ms-2 text-lg font-medium"
              >
                Female
              </label>
            </div>
            {errors.gender && (
              <small className="text-red-600">{errors.gender}</small>
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
              placeholder="+62XXXXXXXXXXX"
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
