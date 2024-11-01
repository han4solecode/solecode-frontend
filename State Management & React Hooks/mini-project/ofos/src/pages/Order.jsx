import { useEffect, useState } from "react";

import OrderForm from "../components/Order/OrderForm";

function Order(props) {
  const { sendOrderDataToApp, orderData, menus, customers } = props;

  const [orders, setOrders] = useState(orderData);

  const handlePlaceOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const handleCancelOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
    alert(`Order with ID ${id} has been canceled successfully`);
  };

  useEffect(() => {
    sendOrderDataToApp(orders);
  }, [orders]);

  const OrderCard = ({ order }) => {
    return (
      <>
        <div
          className="card mx-1 mb-2 shadow"
          style={{ width: "18rem" }}
          key={order.id}
        >
          <div
            className="card-header text-center"
            style={{ backgroundColor: "#A28B55" }}
          >
            <b className="text-white">Order ID {order.id}</b>
          </div>
          <div className="card-body">
            <h5 className="card-title mb-2">Customer Details</h5>
            <div className="d-flex flex-column mb-3">
              <span className="card-text">Name: {order.customer.name}</span>
              <span className="card-text">Email: {order.customer.email}</span>
              <span className="card-text">
                Phone Number: {order.customer.phoneNumber}
              </span>
              <span className="card-text">
                Address: {order.customer.address}
              </span>
            </div>
            <h5 className="card-title mb-2">Order Details</h5>
            <div className="d-flex flex-column mb-3">
              {order.cart.map((item) => {
                const menu = menus.find((menu) => menu.id === item.menuId);
                return (
                  <div className="d-flex justify-content-between">
                    <span className="card-text">{menu.name}</span>
                    <span className="card-text">x {item.quantity}</span>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between mt-2">
                <b>Total Cost</b>
                <b>
                  Rp{" "}
                  {order.totalPrice.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </b>
              </div>
            </div>
            <b>Status: {order.status.toUpperCase()}</b>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button
              className="btn btn-sm me-2"
              style={{
                backgroundColor: "#808080",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              onClick={() => handleCancelOrder(order.id)}
            >
              Cancel Order
            </button>
          </div>
        </div>
      </>
    );
  };

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
            </div>
          </div>
          <div className="col pt-5">
            {orders.length !== 0 ? (
              <>
                <div className="row">
                  <h2 style={{ color: "#86AB89" }}>Placed Order</h2>
                </div>
                <div className="row">
                  <div className="d-flex flex-wrap">
                    {orders.map((order) => (
                      <OrderCard order={order}></OrderCard>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
