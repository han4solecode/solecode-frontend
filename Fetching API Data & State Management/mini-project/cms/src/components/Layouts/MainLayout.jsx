import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../Fragments/Navbar";
import Footer from "../Fragments/Footer";

function MainLayout(props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;
