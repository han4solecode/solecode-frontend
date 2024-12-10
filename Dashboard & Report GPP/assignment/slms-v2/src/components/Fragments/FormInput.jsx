import Label from "../Elements/Inputs/Label";
import Input from "../Elements/Inputs/Input";
import TextArea from "../Elements/Inputs/Textarea";

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
  } = props;

  return (
    <div className="mb-3">
      <Label htmlFor={name} label={children}></Label>
      {!isTextarea ? (
        <Input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
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
