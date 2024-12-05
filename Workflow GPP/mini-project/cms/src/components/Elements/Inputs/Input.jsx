function Input(props) {
  const { type, name, onChange, value, placeholder, min } = props;

  return (
    <input
      type={type}
      name={name}
      id={name}
      className="border rounded text-lg w-full p-2 border-gray-400 focus:border-gray-800 focus:ring-0 focus:outline-none"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      min={min}
    />
  );
}

export default Input;
