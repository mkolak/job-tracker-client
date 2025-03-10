import { FiFilter } from "react-icons/fi";
import Button from "../../../ui/Button";

const style = "gap-0.5 py-2 w-1/2 text-sm flex items-center justify-center";

function JobsSidebarHeader({ onApply, onClear }) {
  return (
    <div className="p-4 flex text-md justify-between border-b border-gray-200">
      <div className="flex items-center font-bold text-lg">Filters</div>
      <div className="flex w-2/3 gap-1.5">
        <Button type="primary" className={style} action={onApply}>
          <FiFilter />
          Apply
        </Button>
        <Button type="secondary" className={style} action={onClear}>
          <FiFilter />
          Clear
        </Button>
      </div>
    </div>
  );
}

export default JobsSidebarHeader;
