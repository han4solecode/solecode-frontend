import { useState } from "react";

function Customer() {
  let initialCustomer = [
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
  ];

  const initialValues = {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [customers, setCustomers] = useState(initialCustomer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCustomers([...customers, formValues]);
  };

  return (
    <>
      <div className="container d-flex my-3 flex-column">
        <div className="row">
          <div className="col border-top">
            <h2 style={{ color: "#86AB89" }}>Customer</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table caption-top w-auto align-middle table-striped">
              <caption>List of Customers</caption>
              <thead>
                <tr className="text-center">
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr className="align-middle">
                    <td className="text-center">{customer.id}</td>
                    <td className="text-center">{customer.name}</td>
                    <td className="text-center">{customer.email}</td>
                    <td className="text-center">{customer.phoneNumber}</td>
                    <td className="text-center">{customer.address}</td>
                    <td className="text-center">
                      <a href="" className="text-decoration-none">
                        Update
                      </a>{" "}
                      |{" "}
                      <a href="" className="text-decoration-none">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col">
            <form
              id="addCustomerForm"
              autoComplete="off"
              onSubmit={handleFormSubmit}
            >
              <caption className="row">
                <span>Add a New Customer</span>
              </caption>
              <div className="my-1 mb-4 row">
                <label
                  htmlFor="inputCustomerId"
                  className="col-sm-2 col-form-label"
                >
                  ID
                </label>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="inputCustomerId"
                    name="id"
                    min="1"
                    required
                    value={formValues.id}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
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
                    placeholder="08138181789"
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
                  <input
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
