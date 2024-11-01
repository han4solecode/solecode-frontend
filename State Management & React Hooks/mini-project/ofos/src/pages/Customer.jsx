import { useEffect, useState } from "react";

import CustomerList from "../components/Customer/CustomerList";
import AddCustomerForm from "../components/Customer/AddCustomerForm";

function Customer(props) {
  const { sendDataToApp, customerData } = props;

  const [customers, setCustomers] = useState(customerData);

  const [customerToEdit, setCustomerToEdit] = useState(null);

  // props to CustomerList
  const handleCustomerEditMode = (id) => {
    setCustomerToEdit(id);
  };

  const handleDeleteCustomer = (id) => {
    if (confirm(`Are you sure you want to delete customer ID ${id}?`)) {
      setCustomers(customers.filter((customer) => customer.id !== id));
      alert(`Customer with ID ${id} has been deleted successfully`);
    } else {
      return;
    }
  };
  // end props to CustomerList

  // props to AddCustomerForm
  const handleAddCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  const handleDoneUpdateCustomer = () => {
    setCustomerToEdit(null);
  };
  // end props to AddCustomerForm

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
                onEdit={handleCustomerEditMode}
                onDelete={handleDeleteCustomer}
              ></CustomerList>
            </div>
            <div className="row">
              <AddCustomerForm
                customers={customers}
                onAddCustomer={handleAddCustomer}
                onUpdateCustomer={handleUpdateCustomer}
                editingCustomer={
                  customerToEdit !== null &&
                  customers.find((customer) => customer.id === customerToEdit)
                }
                onDoneUpdate={handleDoneUpdateCustomer}
              ></AddCustomerForm>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
