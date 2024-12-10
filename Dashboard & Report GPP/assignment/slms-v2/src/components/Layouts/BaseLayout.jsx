import { Outlet } from "react-router-dom";
import Navbar from "../Fragments/Navbar";
import Footer from "../Fragments/Footer";

function BaseLayout(props) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default BaseLayout;
