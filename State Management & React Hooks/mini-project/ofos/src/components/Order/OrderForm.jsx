import { useEffect, useState } from "react";

function OrderForm(props) {
  const { orders, customers, menus, onPlaceOrder } = props;

  const initialValues = {
    customerId: customers[0].id,
  };

  const [availableMenu, setAvailableMenu] = useState(
    menus.filter((menu) => menu.isAvailable === "true")
  );
  const [formValues, setFormValues] = useState(initialValues);
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  console.log(customerId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: Number(value) });
    console.log(formValues);
  };

  const handleAddToCart = (menuId) => {
    if (cart.find((item) => item.menuId === menuId)) {
      setCart(
        cart.map((item) =>
          item.menuId === menuId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          menuId,
          quantity: 1,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (menuId) => {
    setCart(cart.filter((item) => item.menuId !== menuId));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (orders.length === 0) {
      var id = 1;
    } else {
      var id = orders[orders.length - 1].id + 1;
    }

    if (cart.length === 0) {
      alert("Can't place order when cart is empty");
      return;
    }

    var menusCart = [];

    cart.forEach((item) => {
      let menu = menus.find((menu) => menu.id === item.menuId);
      menusCart.push(menu);
      //   console.log(menusCart);
    });

    var customer = customers.find((customer) => customer.id === customerId);

    let newOrder = {
      id: id,
      customer: customer,
      //   cart: [...menusCart, cart],
      cart: cart,
      totalPrice: totalPrice,
      status: "processed",
    };

    onPlaceOrder(newOrder);

    setCustomerId(customers[0].id);
    setCart([]);
    setTotalPrice(0);

    alert(`A new order with ID ${id} has been placed successfully`);
  };

  useEffect(() => {
    const priceSum = cart.reduce((n, item) => {
      const menu = availableMenu.find((menu) => menu.id === item.menuId);
      return n + menu.price * item.quantity;
    }, 0);
    setTotalPrice(priceSum);
  }, [cart]);

  console.log(cart);

  const MenuCards = () => {
    return (
      <>
        <div className="d-flex flex-wrap">
          {availableMenu.map((menu) => (
            <div
              className="card mx-1 mb-2 shadow"
              style={{ width: "9rem" }}
              key={menu.id}
            >
              {menu.category === "Food" ? (
                <img
                  src="https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg"
                  className="card-img-top"
                  alt="Food Image"
                  width="60"
                  height="120"
                />
              ) : menu.category === "Beverage" ? (
                <img
                  src="https://img.freepik.com/free-photo/glass-with-fruit-ice-tea_23-2148555504.jpg?t=st=1730390880~exp=1730394480~hmac=b3d863b297143ca5559aa8c235fdbe69c8692cfd48bb5586a4e5766368aecfa5&w=740"
                  className="card-img-top"
                  alt="Food Image"
                  width="60"
                  height="120"
                />
              ) : (
                <img
                  src="https://img.freepik.com/free-photo/high-angle-tasty-cinnamon-roll-with-sauce_23-2148904731.jpg?t=st=1730391172~exp=1730394772~hmac=3773d53384821a027f0d54a23f83547b7e704fe9c4ec28129a1850a3dc84ac85&w=740"
                  className="card-img-top"
                  alt="Food Image"
                  width="60"
                  height="120"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{menu.name}</h5>
                <p className="card-text">{menu.category}</p>
                <div className="d-flex align-items-center">
                  {[...Array(menu.rating)].map((_) => (
                    <>
                      <img
                        src="https://img.icons8.com/fluency/48/star--v1.png"
                        width="18"
                        height="18"
                      ></img>
                    </>
                  ))}
                  <span className="mx-1">({menu.rating})</span>
                </div>
                <b>
                  Rp{" "}
                  {menu.price.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </b>
              </div>
              <div className="card-footer d-flex justify-content-center">
                <button
                  className="btn btn-sm me-2"
                  style={{
                    backgroundColor: "#A28B55",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleAddToCart(menu.id)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col">
          {/* order form title */}
          <div className="d-flex">
            <caption>Place a New Order</caption>
          </div>
          {/* customer name input */}
          <div className="my-3 mb-4 row">
            <label
              htmlFor="inputCustomerId"
              className="col-sm-2 col-form-label"
            >
              Customer
            </label>
            <div className="col">
              <select
                name="customerId"
                id="inputCustomerId"
                className="form-select"
                value={customerId}
                // onChange={handleInputChange}
                onChange={(e) => setCustomerId(Number(e.target.value))}
              >
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* menu list to input to cart */}
          <MenuCards></MenuCards>
        </div>
        <div className="col">
          <div className="d-flex">
            <caption>Ordered Menu</caption>
          </div>
          <table style={{ width: "100%" }} className="table">
            <thead>
              <tr className="text-center">
                <th scope="col">No</th>
                <th scope="col">Menu Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, key) => {
                const menu = menus.find((menu) => menu.id === item.menuId);
                return (
                  <>
                    <tr key={key}>
                      <td className="text-center">{key + 1}</td>
                      <td className="text-center">{menu.name}</td>
                      <td className="text-center">
                        Rp{" "}
                        {menu.price.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center">
                        Rp{" "}
                        {(item.quantity * menu.price).toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleRemoveFromCart(menu.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
              {cart.length !== 0 ? (
                <tr className="text-center">
                  <th colSpan="4">Total Cost</th>
                  <th className="text-center">
                    Rp{" "}
                    {totalPrice.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "IDR",
                    })}
                  </th>
                  <td></td>
                </tr>
              ) : (
                <tr className="text-center">
                  <td colSpan="6">No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
          {cart.length === 0 ? (
            <button
              type="button"
              style={{
                backgroundColor: "#808080",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
              }}
              disabled
            >
              Place Order
            </button>
          ) : (
            <button
              type="button"
              style={{
                backgroundColor: "#A28B55",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
              }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderForm;
