import Label from "../Elements/Inputs/Label";
import Input from "../Elements/Inputs/Input";
import TextArea from "../Elements/Inputs/TextArea";

function FormInput(props) {
  const {
    name,
    children,
    type,
    onChange,
    value,
    placeholder,
    errorMessage,
    isTextarea,
    min,
  } = props;

  return (
    <div className="mb-3 w-full">
      <Label htmlFor={name} label={children}></Label>
      {!isTextarea ? (
        <Input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          min={min}
        ></Input>
      ) : (
        <TextArea
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        ></TextArea>
      )}
      {errorMessage && <small className="text-red-600">{errorMessage}</small>}
    </div>
  );
}

export default FormInput;
