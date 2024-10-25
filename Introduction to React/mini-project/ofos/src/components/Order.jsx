import { useState } from "react";

function Order() {
  let initialMenu = [
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

  const [menus, setMenus] = useState(initialMenu);
  const [selectedMenu, setSelectedMenu] = useState([]);

  const checkMenuHandler = (e) => {
    let isChecked = e.target.checked;
    let value = e.target.value;

    if (isChecked) {
      setSelectedMenu([...selectedMenu, value]);
    } else {
      setSelectedMenu((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };

  return (
    <>
      <div className="container d-flex my-3 flex-column">
        <div className="row">
          <div className="col border-top">
            <h2 style={{ color: "#86AB89" }}>Order</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="row">
              <caption>Place a New Order</caption>
            </div>
            {menus.map((menu, key) => (
              <div className="form-check" key={key}>
                {menu.isAvailable ? (
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="checkMenu"
                    value={menu.id}
                    onChange={checkMenuHandler}
                  />
                ) : (
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={key}
                    id="checkMenu"
                    disabled
                  />
                )}
                {menu.isAvailable ? (
                  <label htmlFor="checkMenu" className="form-check-label">
                    {menu.name} | Rp {menu.price} | {menu.rating} star rating
                  </label>
                ) : (
                  <label htmlFor="checkMenu" className="form-check-label">
                    {menu.name} | Rp {menu.price} | {menu.rating} star rating
                    (sold out)
                  </label>
                )}
              </div>
            ))}
          </div>
          <div className="col">
            <table className="table caption-top wo-auto align-middle">
              <caption>Order Details</caption>
              <thead>
                <tr className="text-center">
                  <th scope="col">No</th>
                  <th scope="col">Menu Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu, key) => (
                  <tr className="align-middle">
                    <td className="text-center">{key + 1}</td>
                    <td className="text-center">{menu.name}</td>
                    <td className="text-center">3</td>
                    <td className="text-center">{menu.price}</td>
                  </tr>
                ))}
                <tr className="text-center">
                  <td colSpan="3">Total Cost</td>
                  <td>99999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
