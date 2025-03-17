import { useEffect, useRef, useState } from "react";
import { capitalize } from "../utils/helpers";

import { FiChevronDown } from "react-icons/fi";

function Select({ value, options, setValue }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => setIsDropdownOpen(false), 100);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="bg-stone-200 relative rounded-3xl flex gap-1.5 p-4 items-center shadow-md cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        ref={dropdownRef}
      >
        <span className="text-gray-700">{capitalize(value)}</span>
        <FiChevronDown className="absolute right-4" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
              onClick={() => {
                setValue(option);
                setIsDropdownOpen(false);
              }}
            >
              {capitalize(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
