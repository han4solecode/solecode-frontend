import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, reset } from "../slices/authSlice";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";

function RegisterPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const { isLoading, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      alert(
        "Your account has been registered successfully. Please log in with your newly creted account."
      );
      navigate("/login");
    }

    dispatch(reset());
  }, [isSuccess, navigate, dispatch]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  console.log(formValues);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("asdasdas");

    // validation
    let errorMessages = {};

    if (!formValues.firstname.trim()) {
      errorMessages.firstname = "First name is required";
    } else if (formValues.firstname.length > 50) {
      errorMessages.firstname = "First name cannot exceed 50 characters";
    } else {
      errorMessages.firstname = "";
    }

    if (!formValues.lastname.trim()) {
      errorMessages.lastname = "Last name is required";
    } else if (formValues.lastname.length > 50) {
      errorMessages.lastname = "Last name cannot exceed 50 characters";
    } else {
      errorMessages.lastname = "";
    }

    if (!formValues.email) {
      errorMessages.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errorMessages.email = "Email is not valid";
    } else {
      errorMessages.email = "";
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
    } else if (formValues.password.length < 6) {
      errorMessages.password = "Passwword must be atleast 6 character long";
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
      dispatch(register(formValues));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-screen-md">
        <div className="mb-7 flex justify-center">
          <span className="text-3xl font-semibold">Register</span>
        </div>
        <div>
          <form autoComplete="off">
            <div className="flex gap-2">
              <FormInput
                name="firstname"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={formValues.firstname}
                errorMessage={errors.firstname}
              >
                First Name
              </FormInput>
              <FormInput
                name="lastname"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={formValues.lastname}
                errorMessage={errors.lastname}
              >
                Last Name
              </FormInput>
            </div>
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
              name="email"
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={formValues.email}
              errorMessage={errors.email}
            >
              Email
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
            <div className="flex justify-center items-center mb-2">
              <Button
                type="submit"
                disabled={isLoading}
                onClick={handleFormSubmit}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
          <div className="flex justify-center items-center">
            <small>
              Already have an account?{" "}
              <Link className="hover:text-blue-600" to="/login">
                Login
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
