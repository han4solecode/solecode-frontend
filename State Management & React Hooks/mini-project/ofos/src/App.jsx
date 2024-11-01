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

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Customer 1",
      email: "customer1@gmail.com",
      phoneNumber: "0813818181",
      address: "Jl. Pisok 1, Bintaro",
    },
    {
      id: 2,
      name: "Customer 2",
      email: "customer2@gmail.com",
      phoneNumber: "0813818182",
      address: "Jl. Pisok 2, Bintaro",
    },
    {
      id: 3,
      name: "Customer 3",
      email: "customer3@gmail.com",
      phoneNumber: "0813818183",
      address: "Jl. Pisok 3, Bintaro",
    },
    {
      id: 4,
      name: "Customer 4",
      email: "customer4@gmail.com",
      phoneNumber: "0813818184",
      address: "Jl. Pisok 4, Bintaro",
    },
    {
      id: 5,
      name: "Customer 5",
      email: "customer5@gmail.com",
      phoneNumber: "0813818185",
      address: "Jl. Pisok 5, Bintaro",
    },
  ]);

  const [orders, setOrders] = useState([]);

  console.log(orders);

  const renderView = () => {
    switch (view) {
      case "menu":
        return <Menu sendDataToApp={setMenus} menuData={menus}></Menu>;
      case "customer":
        return (
          <Customer
            sendDataToApp={setCustomers}
            customerData={customers}
          ></Customer>
        );
      case "order":
        return (
          <Order
            sendOrderDataToApp={setOrders}
            orderData={orders}
            menus={menus}
            customers={customers}
          ></Order>
        );
      default:
        <Menu sendDataToApp={setMenus} menuData={menus}></Menu>;
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
