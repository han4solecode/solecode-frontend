import { useEffect, useState } from "react";

import CustomerList from "../components/Customer/CustomerList";
import AddCustomerForm from "../components/Customer/AddCustomerForm";

function Customer(props) {
  const { sendDataToApp, customerData } = props;

  const [customers, setCustomers] = useState(customerData);

  // props to CustomerList
  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    alert(`Customer with ID ${id} has been deleted successfully`);
  };
  // end props to CustomerList

  // props to AddCustomerForm
  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };
  // end props to AddCustomerForm

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCustomers([...customers, formValues]);
  };

  useEffect(() => {
    sendDataToApp(customers);
  }, [customers]);

  return (
    <>
      <div className="container d-flex my-3 flex-column">
        <div className="row">
          <div className="col">
            <h2 style={{ color: "#86AB89" }}>Customers</h2>
          </div>
        </div>
        <div className="container">
          <div className="col">
            <div className="row">
              <CustomerList
                customers={customers}
                onDelete={handleDeleteCustomer}
              ></CustomerList>
            </div>
            <div className="row">
              <AddCustomerForm
                customers={customers}
                onAddCustomer={handleAddCustomer}
              ></AddCustomerForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
