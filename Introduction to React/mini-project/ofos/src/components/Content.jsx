import Menu from "./Menu";
import Customer from "./Customer";
import Order from "./Order";
import { useState } from "react";

function Content() {
  let initialMenuData = [
    {
      id: 1,
      name: "Nasi Goreng",
      price: 20000,
      category: "Food",
      rating: 5,
      isAvailable: true,
    },
    {
      id: 2,
      name: "Sop Iga",
      price: 40000,
      category: "Food",
      rating: 4,
      isAvailable: true,
    },
    {
      id: 3,
      name: "Es Teh",
      price: 7000,
      category: "Beverage",
      rating: 4,
      isAvailable: true,
    },
    {
      id: 4,
      name: "Es Teler",
      price: 14000,
      category: "Beverage",
      rating: 4,
      isAvailable: false,
    },
    {
      id: 5,
      name: "Klepon",
      price: 10000,
      category: "Dessert",
      rating: 3,
      isAvailable: true,
    },
  ];

  const [menus, setMenus] = useState(initialMenuData);

  return (
    <>
      <div className="container d-flex flex-column">
        <Menu></Menu>
        <Customer></Customer>
        <Order></Order>
      </div>
    </>
  );
}

export default Content;
