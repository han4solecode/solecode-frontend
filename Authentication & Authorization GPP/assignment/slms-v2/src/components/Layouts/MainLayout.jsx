import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../Fragments/Navbar";
import Footer from "../Fragments/Footer";

function MainLayout(props) {
  const { allowedRoles } = props;

  const { user, isSuccess } = useSelector((state) => state.auth);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentUser, setCurrentUser] = useState({});

  // console.log(user);
  // console.log(allowedRoles);

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (user) {
  //     setIsLoading(false);
  //   }
  // }, []);

  const hasRequiredRole = () => {
    if (!allowedRoles) {
      return true;
    }

    if (user) {
      return user?.roles?.some((role) => allowedRoles.includes(role)) || false;
    } else {
      return true;
    }
  };

  // if (isLoading) {
  //   return (
  //     <PageLayout>
  //       <div className="flex justify-center items-center h-screen">
  //         <LoadingAnimation></LoadingAnimation>
  //       </div>
  //     </PageLayout>
  //   );
  // }

  if (allowedRoles && !hasRequiredRole()) {
    return <Navigate to="/unauthorized"></Navigate>;
  }

  // console.log(allowedRoles && !hasRequiredRole);
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
