function Button(props) {
  const { styleName = "bg-gray-800", onClick, children, type } = props;

  return (
    <button
      type={type}
      className={`rounded-md ${styleName} px-3 py-2 text-sm font-medium text-white size-fit`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
