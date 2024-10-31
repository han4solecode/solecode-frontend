import { useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import Customer from "./pages/Customer";
import Order from "./pages/Order";

import "./App.css";

function App() {
  const [view, setView] = useState("menu");

  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Nasi Goreng",
      price: 20000,
      category: "Food",
      rating: 5,
      isAvailable: "true",
    },
    {
      id: 2,
      name: "Sop Iga",
      price: 40000,
      category: "Food",
      rating: 4,
      isAvailable: "true",
    },
    {
      id: 3,
      name: "Es Teh",
      price: 7000,
      category: "Beverage",
      rating: 4,
      isAvailable: "true",
    },
    {
      id: 4,
      name: "Es Teler",
      price: 14000,
      category: "Beverage",
      rating: 4,
      isAvailable: "false",
    },
    {
      id: 5,
      name: "Klepon",
      price: 10000,
      category: "Dessert",
      rating: 3,
      isAvailable: "true",
    },
  ]);
  const [customers, setCustomers] = useState([]);

  console.log(menus);

  const renderView = () => {
    switch (view) {
      case "menu":
        return <Menu sendDataToApp={setMenus} menuData={menus}></Menu>;
      case "customer":
        return <Customer sendDataToApp={setCustomers}></Customer>;
      case "order":
        return <Order menus={menus} customers={customers}></Order>;
      default:
        <Menu></Menu>;
    }
  };

  return (
    <>
      <div className="App">
        <Header setView={setView}></Header>
        <div className="container">{renderView()}</div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
