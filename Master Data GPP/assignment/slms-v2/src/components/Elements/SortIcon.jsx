import { FaArrowsUpDown, FaArrowUp, FaArrowDown } from "react-icons/fa6";

function SortIcon(props) {
  const { sortField, field, sortOrder } = props;

  if (sortField !== field) {
    return <FaArrowsUpDown style={{ color: "white" }}></FaArrowsUpDown>;
  }
  return sortOrder === "asc" ? (
    <FaArrowUp style={{ color: "white" }}></FaArrowUp>
  ) : (
    <FaArrowDown style={{ color: "white" }}></FaArrowDown>
  );
}

export default SortIcon;
