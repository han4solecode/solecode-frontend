import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, reset } from "../slices/authSlice";
import FormInput from "../components/Fragments/FormInput";
import Button from "../components/Elements/Button";

function LoginPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/profile");
    }
    // if (isSuccess) {
    //   navigate("/profile");
    // }
    setFormValues(initialValues);
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  console.log(formValues);
  console.log(isError);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validation
    let errorMessages = {};

    if (!formValues.username) {
      errorMessages.username = "Username is required";
    } else {
      errorMessages.username = "";
    }

    if (!formValues.password) {
      errorMessages.password = "Password is required";
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
      dispatch(login(formValues));
    }
  };

  //   if (isLoading) {
  //     return (
  //       <PageLayout>
  //         <div className="flex justify-center items-center h-screen">
  //           <LoadingAnimation></LoadingAnimation>
  //         </div>
  //       </PageLayout>
  //     );
  //   }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-screen-md">
        <div className="mb-3 flex justify-center">
          <span className="text-3xl font-semibold">Login</span>
        </div>
        <div>
          <form autoComplete="off">
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
            <div className="flex justify-center items-center mb-2">
              <Button
                type="submit"
                disabled={isLoading}
                onClick={handleFormSubmit}
                styleName={isLoading ? "bg-gray-600" : "bg-gray-800"}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="flex justify-center items-center">
            <small>
              Don't have an account?{" "}
              <Link className="hover:text-blue-600" to="/register">
                Register
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
