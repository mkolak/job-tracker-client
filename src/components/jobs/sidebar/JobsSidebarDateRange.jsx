import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX } from "react-icons/fi";

function JobsSidebarDateRange({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <div className="p-4 flex flex-col text-md justify-between border-b border-gray-200">
      <h2 className="font-bold mb-2">Application Date</h2>
      <div className="items-center gap-2 pb-1 relative">
        <label className=" text-sm text-gray-600">From</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date.toISOString())}
          maxDate={endDate}
          className="border-teal-600 rounded-full border pl-2 focus:outline-none"
          wrapperClassName="absolute right-0"
        />
        {startDate && (
          <FiX
            className="absolute right-1.5 top-1.5 hover:opacity-100 opacity-20 font-bold transition-opacity cursor-pointer"
            onClick={() => setStartDate(null)}
          />
        )}
      </div>
      <div className="mt-1 items-center gap-2 pb-1 relative">
        <label className=" text-sm text-gray-600">To</label>
        <DatePicker
          selected={endDate}
          minDate={startDate}
          onChange={(date) => setEndDate(date.toISOString())}
          className="border-teal-600 rounded-full border pl-2 focus:outline-none"
          wrapperClassName="absolute right-0"
        />
        {endDate && (
          <FiX
            className="absolute right-1.5 top-1.5 hover:opacity-100 opacity-20 font-bold transition-opacity cursor-pointer"
            onClick={() => setEndDate(null)}
          />
        )}
      </div>
    </div>
  );
}

export default JobsSidebarDateRange;
