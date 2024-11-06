function Button(props) {
  const { styleName, onClick, children, type } = props;

  return (
    <button
      type={type}
      className={
        styleName
          ? styleName
          : "rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white size-fit"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
