function JobsSidebarCheckboxFilter({ name, options, value, setValue }) {
  return (
    <div className="p-4 flex flex-col text-md justify-between border-b">
      <h2 className="font-bold mb-2">{name}</h2>
      {options.map((option) => (
        <div className="flex items-center pb-1" key={option._id}>
          <input
            type="checkbox"
            id={option._id}
            name={option._id}
            value={option._id}
            checked={value.includes(option._id)}
            onChange={() =>
              setValue((value) =>
                value.includes(option._id)
                  ? value.filter((item) => item !== option._id)
                  : [...value, option._id]
              )
            }
            className="form-radio accent-teal-600"
          />
          <label
            htmlFor={option._id}
            className="ml-2 text-sm text-gray-600 relative"
          >
            {option._id}{" "}
            <span className="text-xs font-bold">{option.count}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default JobsSidebarCheckboxFilter;
