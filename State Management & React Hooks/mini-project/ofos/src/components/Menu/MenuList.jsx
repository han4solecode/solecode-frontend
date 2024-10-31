function MenuList(props) {
  const { menus, onEdit, onDelete } = props;

  const handleEditButtonClick = (id) => {
    onEdit(id);
  };

  const TableBody = () => {
    return (
      <tbody>
        {menus.map((menu) => (
          <tr className="align-middle" key={menu.id}>
            <td className="text-center">{menu.id}</td>
            <td className="text-center">{menu.name}</td>
            <td className="text-center">{menu.price}</td>
            <td className="text-center">{menu.category}</td>
            <td className="text-center">{menu.rating}</td>
            {menu.isAvailable === "true" ? (
              <td className="text-center">Yes</td>
            ) : (
              <td className="text-center">No</td>
            )}
            <td>
              <button
                type="button"
                className="btn btn-warning mx-1"
                onClick={() => handleEditButtonClick(menu.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={() => onDelete(menu.id)}
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
        <caption>List of Menus</caption>
        <thead>
          <tr className="text-center">
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Rating</th>
            <th scope="col">Availability</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {menus.length ? (
          <TableBody></TableBody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="7" className="text-black text-center">
                No Data Available
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
}

export default MenuList;
