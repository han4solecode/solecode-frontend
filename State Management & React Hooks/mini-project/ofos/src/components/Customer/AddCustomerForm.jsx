import { useState } from "react";

function AddCustomerForm(props) {
  const { customers, onAddCustomer } = props;

  const initialValues = {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (customers.length === 0) {
      var id = 1;
    } else {
      var id = customers[customers.length - 1].id + 1;
    }

    let newCustomer = {
      id: id,
      name: formValues.name,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      address: formValues.address,
    };

    onAddCustomer(newCustomer);

    setFormValues(initialValues);

    alert(`A customer with ID ${newCustomer.id} has been created successfully`);
  };

  return (
    <>
      <form id="addCustomerForm" autoComplete="off" onSubmit={handleFormSubmit}>
        <caption className="row">
          <span>Add a New Customer</span>
        </caption>
        <div className="my-1 mb-4 row">
          <label
            htmlFor="inputCustomerName"
            className="col-sm-2 col-form-label"
          >
            Name
          </label>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="inputCustomerName"
              name="name"
              required
              minLength="2"
              maxLength="100"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="my-1 mb-4 row">
          <label
            htmlFor="inputCustomerEmail"
            className="col-sm-2 col-form-label"
          >
            Email
          </label>
          <div className="col">
            <input
              type="email"
              className="form-control"
              id="inputCustomerEmail"
              name="email"
              placeholder="email@example.com"
              required
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="my-1 mb-4 row">
          <label
            htmlFor="inputCustomerPhoneNumber"
            className="col-sm-2 col-form-label"
          >
            Phone Number
          </label>
          <div className="col">
            <input
              type="tel"
              className="form-control"
              id="inputCustomerPhoneNumber"
              name="phoneNumber"
              // required
              pattern="^(\+62|62|0)8[1-9][0-9]{6,9}$"
              placeholder="(+62)(62)(0)8XXXXXXX"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="my-1 mb-4 row">
          <label
            htmlFor="inputCustomerAddress"
            className="col-sm-2 col-form-label"
          >
            Address
          </label>
          <div className="col">
            <textarea
              type="text"
              className="form-control"
              id="inputCustomerAddress"
              name="address"
              // required
              maxLength="200"
              value={formValues.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#A28B55",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
          }}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default AddCustomerForm;
