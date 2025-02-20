const Select = ({ value, onChange, options = [] }) => {
    if (!Array.isArray(options)) {
      console.error("Invalid options provided to Select component", options);
      options = []; // Set default empty array if options is not an array
    }
  
    return (
      <select value={value} onChange={onChange} className="select">
        {options.map((opt, index) => (
          <option key={index} value={opt}>{opt}</option>
        ))}
      </select>
    );
  };
  export default Select;
  