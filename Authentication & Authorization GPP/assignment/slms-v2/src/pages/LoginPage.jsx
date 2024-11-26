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

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    // if (isSuccess) {
    //   navigate("/profile");
    // }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  console.log(formValues);
  console.log(isError);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formValues));
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
              //   errorMessage={errors.isbn}
            >
              Username
            </FormInput>
            <FormInput
              name="password"
              type="password"
              onChange={(e) => handleInputChange(e)}
              value={formValues.password}
              //   errorMessage={errors.isbn}
            >
              Password
            </FormInput>
            <div className="flex justify-center items-center mb-2">
              <Button
                type="submit"
                disabled={isLoading}
                onClick={handleFormSubmit}
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
