import { useEffect, useState } from "react";

import OrderForm from "../components/Order/OrderForm";

function Order(props) {
  const { sendOrderDataToApp, orderData, menus, customers } = props;

  const [orders, setOrders] = useState(orderData);

  const handlePlaceOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  useEffect(() => {
    sendOrderDataToApp(orders);
  }, [orders]);

  // return (
  //   <>
  //     <div className="container d-flex my-3 flex-column">
  //       <div className="row">
  //         <div className="col border-top">
  //           <h2 style={{ color: "#86AB89" }}>Order</h2>
  //         </div>
  //       </div>
  //       <div className="row">
  //         <div className="col">
  //           <div className="row">
  //             <caption>Place a New Order</caption>
  //           </div>
  //           {menus.map((menu, key) => (
  //             <div className="form-check" key={key}>
  //               {menu.isAvailable === "true" ? (
  //                 <input
  //                   type="checkbox"
  //                   className="form-check-input"
  //                   id="checkMenu"
  //                   value={menu.id}
  //                   onChange={checkMenuHandler}
  //                 />
  //               ) : (
  //                 <input
  //                   type="checkbox"
  //                   className="form-check-input"
  //                   value={key}
  //                   id="checkMenu"
  //                   disabled
  //                 />
  //               )}
  //               {menu.isAvailable === "true" ? (
  //                 <label htmlFor="checkMenu" className="form-check-label">
  //                   {menu.name} | Rp{" "}
  //                   {menu.price.toLocaleString("id-ID", {
  //                     styles: "currency",
  //                     currency: "IDR",
  //                   })}{" "}
  //                   | {menu.rating} star rating
  //                 </label>
  //               ) : (
  //                 <label htmlFor="checkMenu" className="form-check-label">
  //                   {menu.name} | Rp{" "}
  //                   {menu.price.toLocaleString("id-ID", {
  //                     styles: "currency",
  //                     currency: "IDR",
  //                   })}{" "}
  //                   | {menu.rating} star rating (sold out)
  //                 </label>
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //         <div className="col">
  //           <table className="table caption-top wo-auto align-middle">
  //             <caption>Order Details</caption>
  //             <thead>
  //               <tr className="text-center">
  //                 <th scope="col">No</th>
  //                 <th scope="col">Menu Name</th>
  //                 <th scope="col">Quantity</th>
  //                 <th scope="col">Price</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {menus.map((menu, key) => (
  //                 <tr className="align-middle" key={key}>
  //                   <td className="text-center">{key + 1}</td>
  //                   <td className="text-center">{menu.name}</td>
  //                   <td className="text-center">3</td>
  //                   <td className="text-center">{menu.price}</td>
  //                 </tr>
  //               ))}
  //               <tr className="text-center">
  //                 <td colSpan="3">Total Cost</td>
  //                 <td>99999</td>
  //               </tr>
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="container d-flex my-3 flex-column">
        <div className="row">
          <div className="col">
            <h2 style={{ color: "#86AB89" }}>Order</h2>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <OrderForm
                  orders={orders}
                  customers={customers}
                  menus={menus}
                  onPlaceOrder={handlePlaceOrder}
                ></OrderForm>
              </div>
              {/* <div className="col">
                <div className="d-flex">
                  <caption>Ordered Menu</caption>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
