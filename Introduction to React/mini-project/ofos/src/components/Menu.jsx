import { useState } from "react";

function Menu() {
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

  const categories = ["Food", "Beverage", "Dessert"];

  const initialValues = {
    id: 0,
    name: "",
    price: 0,
    category: categories[0],
    rating: 0,
    isAvailable: true,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [menus, setMenus] = useState(initialMenu);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setMenus([...menus, formValues]);
  };

  return (
    <>
      <div className="container d-flex my-3 flex-column">
        <div className="row">
          <div className="col border-top">
            <h2 style={{ color: "#86AB89" }}>Menus</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
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
              <tbody>
                {menus.map((menu) => (
                  <tr className="align-middle">
                    <td className="text-center">{menu.id}</td>
                    <td className="text-center">{menu.name}</td>
                    <td className="text-center">{menu.price}</td>
                    <td className="text-center">{menu.category}</td>
                    <td className="text-center">{menu.rating}</td>
                    {menu.isAvailable ? (
                      <td className="text-center">Yes</td>
                    ) : (
                      <td className="text-center">No</td>
                    )}
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
              id="addMenuForm"
              autoComplete="off"
              onSubmit={handleFormSubmit}
            >
              <caption className="row">
                <span>Add a New Menu</span>
              </caption>
              <div className="my-1 mb-4 row">
                <label
                  htmlFor="inputMenuId"
                  className="col-sm-2 col-form-label"
                >
                  ID
                </label>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="inputMenuId"
                    name="id"
                    required
                    value={formValues.id}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-3 mb-4 row">
                <label
                  htmlFor="inputMenuName"
                  className="col-sm-2 col-form-label"
                >
                  Name
                </label>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMenuName"
                    name="name"
                    required
                    minLength="2"
                    maxLength="100"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-3 mb-4 row">
                <label
                  htmlFor="inputMenuPrice"
                  className="col-sm-2 col-form-label"
                >
                  Price
                </label>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="inputMenuPrice"
                    name="price"
                    required
                    min="0"
                    max="100000"
                    value={formValues.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-3 mb-4 row">
                <label
                  htmlFor="inputMenuCategory"
                  className="col-sm-2 col-form-label"
                >
                  Category
                </label>
                <div className="col">
                  <select
                    name="category"
                    id="inputMenuCategory"
                    className="form-select"
                    value={formValues.category}
                    onChange={handleInputChange}
                  >
                    {categories.map((val) => (
                      <option value={val}>{val}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="my-3 mb-4 row">
                <label
                  htmlFor="inputMenuRating"
                  className="col-sm-2 col-form-label"
                >
                  Rating
                </label>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    id="inputMenuRating"
                    name="rating"
                    required
                    min="0"
                    max="5"
                    value={formValues.rating}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="my-3 mb-4 row">
                <label
                  htmlFor="inputMenuAvailability"
                  className="col-sm-2 col-form-label"
                >
                  Availability
                </label>
                <div className="col">
                  <select
                    name="isAvailable"
                    id="inputMenuAvailability"
                    className="form-select"
                    value={formValues.isAvailable}
                    onChange={handleInputChange}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
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

export default Menu;
