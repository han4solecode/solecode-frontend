import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import Content from "./components/Content";
import Menu from "./components/Menu";
import Customer from "./components/Customer";
import Order from "./components/Order";

import "./App.css";

function App() {
  const [view, setView] = useState("menu");

  const renderView = () => {
    switch (view) {
      case "menu":
        return <Menu></Menu>;
      case "customer":
        return <Customer></Customer>;
      case "order":
        return <Order></Order>;
      default:
        <Menu></Menu>;
    }
  };

  return (
    <>
      <div className="App">
        <Header setView={setView}></Header>
        {/* <Content></Content> */}
        <div className="container">{renderView()}</div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
