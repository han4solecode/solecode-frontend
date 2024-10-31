function CustomerList(props) {
  const { customers } = props;

  const TableBody = () => {
    return (
      <tbody>
        {customers.map((customer) => (
          <tr className="align-middle" key={customer.id}>
            <td className="text-center">{customer.id}</td>
            <td className="text-center">{customer.name}</td>
            <td className="text-center">{customer.email}</td>
            <td className="text-center">{customer.phoneNumber}</td>
            <td className="text-center">{customer.address}</td>
            <td>
              <button
                type="button"
                className="btn btn-warning mx-1"
                // onClick={() => handleEditButtonClick(menu.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                // onClick={() => onDelete(menu.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
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
        {customers.length ? (
          <TableBody></TableBody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="6" className="text-black text-center">
                No Data Available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
}

export default CustomerList;
