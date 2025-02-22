const Input = ({ type = "text", value, onChange, placeholder }) => {
    return <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="input" />;
  };
  export default Input;
  