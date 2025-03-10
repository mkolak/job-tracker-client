function JobsSidebarRadioFilter({ name, options, value, setValue }) {
  return (
    <div className="p-4 flex flex-col text-md justify-between border-b border-gray-200">
      <h2 className="font-bold mb-2">{name}</h2>
      {options.map((option) => (
        <div className="flex items-center pb-1" key={option.name}>
          <input
            type="radio"
            id={`${option.name}.${option.value}`}
            checked={value === option.value}
            onChange={() => setValue(option.value)}
            className="form-radio accent-teal-60"
          />
          <label
            htmlFor={`${option.name}.${option.value}`}
            className="ml-2 text-sm text-gray-600"
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default JobsSidebarRadioFilter;
