import "./Tombol.style.css";

const Tombol = (props) => {
  const handleButtonClick = () => {
    props.onTombolClick(props.children);
  };

  return (
    <button onClick={handleButtonClick} style={{ margin: "10px" }}>
      {props.children}
    </button>
  );
};

export default Tombol;
