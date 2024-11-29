import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../Fragments/Navbar";
import Footer from "../Fragments/Footer";
import LoadingAnimation from "../Elements/LoadingAnimation";

function MainLayout(props) {
  const { allowedRoles } = props;
  const { user, isLoading } = useSelector((state) => state.auth);

  console.log(user);

  const hasRequiredRole = () => {
    if (!isLoading) {
      if (!allowedRoles) {
        return true;
      }

      return user?.roles?.some((role) => allowedRoles.includes(role)) || false;
    }
  };

  if (allowedRoles && !hasRequiredRole()) {
    return <Navigate to="/unauthorized"></Navigate>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation></LoadingAnimation>
      </div>
    );
  }

  return user ? (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
}

export default MainLayout;
