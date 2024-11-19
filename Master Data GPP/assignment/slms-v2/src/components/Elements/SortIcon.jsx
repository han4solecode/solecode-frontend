import { FaArrowsUpDown, FaArrowUp, FaArrowDown } from "react-icons/fa6";

FaUpDown;

function SortIcon(props) {
  const { sortField, field, sortOrder } = props;

  if (sortField !== field) {
    return (
      <FaArrowsUpDown
        style={{ color: "white", fontSize: "1.5em" }}
      ></FaArrowsUpDown>
    );
  }
  return sortOrder === "asc" ? (
    <FaArrowUp style={{ color: "white", fontSize: "1.5em" }}></FaArrowUp>
  ) : (
    <FaArrowDown style={{ color: "white", fontSize: "1.5em" }}></FaArrowDown>
  );
}

export default SortIcon;
