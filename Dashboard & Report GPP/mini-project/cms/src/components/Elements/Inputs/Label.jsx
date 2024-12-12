function Label(props) {
  const { htmlFor, label } = props;

  return (
    <label htmlFor={htmlFor} className="block text-black mb-2 text-lg">
      {label}
    </label>
  );
}

export default Label;
