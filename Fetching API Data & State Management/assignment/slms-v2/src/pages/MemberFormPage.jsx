import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/Layouts/PageLayout";
import Button from "../components/Elements/Button";
import FormInput from "../components/Fragments/FormInput";
import {
  createNewUser,
  getUserById,
  updateExistingUser,
} from "../services/users.service";

function MemberFormPage(props) {
  const { isEditing } = props;
  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    // id: 0,
    // fullName: "",
    name: "",
    email: "",
    address: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  useEffect(() => {
    if (isEditing) {
      const fetchMemberToEdit = async () => {
        const member = await getUserById(Number(id));
        if (member) {
          setFormValues(member);
        }
      };
      fetchMemberToEdit();
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
    // ((!/\S+@\S+\.\S+/.test(email)))
    let emailRegex = /\S+@\S+\.\S+/;
    let phoneNumberRegex = /^(\+62)8[1-9][0-9]{6,9}$/;
    let errorMessages = {};

    if (!formValues.name.trim()) {
      errorMessages.name = "Full name cannot be empty";
    } else {
      errorMessages.name = "";
    }

    if (!formValues.email) {
      errorMessages.email = "Email cannot be empty";
    } else if (!emailRegex.test(formValues.email)) {
      errorMessages.email = "Email is not valid";
    } else {
      errorMessages.email = "";
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
      if (isEditing) {
        const updateMember = async (id, updatedBook) => {
          const res = await updateExistingUser(id, updatedBook);
          if (res) {
            alert(`Member with ID ${id} has been updated successfully`);
            navigate("/members");
          } else {
            alert("Error! Please try again");
          }
        };

        updateMember(Number(id), formValues);
      } else {
        const createMember = async (user) => {
          const newMember = await createNewUser(user);
          if (newMember) {
            alert("A new member has been created successfully");
            navigate("/members");
          } else {
            alert("Error! Please try again");
          }
        };

        createMember(formValues);
      }
    }
  };

  return (
    <PageLayout
      pageTitle={isEditing ? `Editing Member ID ${id}` : "Add a New Member"}
    >
      <div className="w-full">
        <form autoComplete="off">
          <FormInput
            name="name"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.name}
            errorMessage={errors.name}
          >
            Full Name
          </FormInput>
          <FormInput
            name="email"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={formValues.email}
            errorMessage={errors.email}
          >
            Email
          </FormInput>
          {/* <div className="mb-3">
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
          </div> */}
          {/* <div className="mb-3">
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
          </div> */}
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

export default MemberFormPage;
