import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../Fragments/Navbar";
import Footer from "../Fragments/Footer";

function MainLayout(props) {
  const { allowedRoles } = props;

  const { user } = useSelector((state) => state.auth);

  const hasRequiredRole = () => {
    if (!allowedRoles) {
      return true;
    }

    return user?.roles?.some((role) => allowedRoles.includes(role)) || false;
  };

  // if (allowedRoles && !hasRequiredRole()) {
  //   if (!user) {
  //     return <Navigate to="/login" replace></Navigate>;
  //   }
  //   return <Navigate to="/unauthorized"></Navigate>;
  // }

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
