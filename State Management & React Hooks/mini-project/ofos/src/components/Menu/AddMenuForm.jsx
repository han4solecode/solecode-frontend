import { useEffect, useRef, useState } from "react";

function AddMenuForm(props) {
  const { menus, onAddMenu, onUpdateMenu, editingMenu, onDoneUpdate } = props;

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const editInput = useRef(null);

  useEffect(() => {
    editInput.current.focus();
  }, []);

  useEffect(() => {
    if (editingMenu) {
      editInput.current.focus();
      setFormValues(editingMenu);
    }
  }, [editingMenu]);

  const handleCancelEdit = () => {
    onDoneUpdate();
    setFormValues(initialValues);
    editInput.current.focus();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingMenu) {
      let updatedMenu = {
        id: editingMenu.id,
        name: formValues.name,
        price: Number(formValues.price),
        category: formValues.category,
        rating: Number(formValues.rating),
        isAvailable: formValues.isAvailable,
      };

      onUpdateMenu(updatedMenu);

      onDoneUpdate();

      setFormValues(initialValues);

      alert(`Menu with ID ${updatedMenu.id} has been updated successfully`);
    } else {
      if (menus.length === 0) {
        var id = 1;
      } else {
        var id = menus[menus.length - 1].id + 1;
      }

      let newMenu = {
        id: id,
        name: formValues.name,
        price: Number(formValues.price),
        category: formValues.category,
        rating: Number(formValues.rating),
        isAvailable: formValues.isAvailable,
      };

      onAddMenu(newMenu);

      setFormValues(initialValues);

      alert(`A menu with ID ${newMenu.id} has been created successfully`);
    }
  };

  return (
    <>
      <form id="addMenuForm" autoComplete="off" onSubmit={handleFormSubmit}>
        {editingMenu ? (
          <caption className="row">
            <span>Editing {editingMenu.name} Menu</span>
          </caption>
        ) : (
          <caption className="row">
            <span>Add a New Menu</span>
          </caption>
        )}
        <div className="my-1 mb-4 row">
          <label htmlFor="inputMenuName" className="col-sm-2 col-form-label">
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
              ref={editInput}
            />
          </div>
        </div>
        <div className="my-3 mb-4 row">
          <label htmlFor="inputMenuPrice" className="col-sm-2 col-form-label">
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
              {categories.map((val, key) => (
                <option value={val} key={key}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="my-3 mb-4 row">
          <label htmlFor="inputMenuRating" className="col-sm-2 col-form-label">
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
        {editingMenu ? (
          <>
            <button
              type="submit"
              style={{
                backgroundColor: "#A28B55",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
              }}
              className="me-2"
            >
              Update
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{
                backgroundColor: "#808080",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "4px",
              }}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
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
        )}
      </form>
    </>
  );
}

export default AddMenuForm;
