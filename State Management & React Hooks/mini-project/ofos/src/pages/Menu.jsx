import { useEffect, useState } from "react";

import MenuList from "../components/Menu/MenuList";
import AddMenuForm from "../components/Menu/AddMenuForm";

function Menu(props) {
  const { sendDataToApp } = props;

  let initialMenu = [
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
  ];

  const [menus, setMenus] = useState(initialMenu);

  const [menuToEdit, setMenuToEdit] = useState(null);

  // props to MenuList
  const handleMenuEditMode = (id) => {
    setMenuToEdit(id);
  };

  const handleDeleteMenu = (id) => {
    setMenus(menus.filter((menu) => menu.id !== id));
    alert(`Menu with ID ${id} has been deleted successfully`);
  };
  // end props to MenuList

  // props to AddMenuForm
  const handleAddMenu = (newMenu) => {
    setMenus([...menus, newMenu]);
  };

  const handleUpdateMenu = (updatedMenu) => {
    setMenus(
      menus.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu))
    );
  };

  const handleDoneUpdateMenu = () => {
    setMenuToEdit(null);
  };
  // end props to AddMenuForm

  useEffect(() => {
    sendDataToApp(menus);
    // localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  return (
    <>
      <div className="container d-flex my-3 flex-column">
        <div className="row">
          <div className="col">
            <h2 style={{ color: "#86AB89" }}>Menus</h2>
          </div>
        </div>
        <div className="container">
          <div className="col">
            <div className="row">
              <MenuList
                menus={menus}
                onEdit={handleMenuEditMode}
                onDelete={handleDeleteMenu}
              ></MenuList>
            </div>
            <div className="row">
              <AddMenuForm
                menus={menus}
                onAddMenu={handleAddMenu}
                onUpdateMenu={handleUpdateMenu}
                editingMenu={
                  menuToEdit !== null &&
                  menus.find((menu) => menu.id === menuToEdit)
                }
                onDoneUpdate={handleDoneUpdateMenu}
              ></AddMenuForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
