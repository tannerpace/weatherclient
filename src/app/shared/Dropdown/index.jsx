const Dropdown = ({ options, onChange }) => (
  <select className="drop-down" onChange={(e) => onChange(e.target.value)}>
    <option value="">Select Allergen</option>
    {options.map((option) => (
      <option
        style={{
          fontSize: 4,
          fontWeight: "bold",
        }}
        key={option.value}
        value={option.value}
      >
        {option.label}
      </option>
    ))}
  </select>
)

export default Dropdown
