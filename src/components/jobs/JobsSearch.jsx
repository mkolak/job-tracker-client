import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import Button from "../../ui/Button";
import Select from "../../ui/Select";

const categoryOptions = ["advertisement", "advertiser"];

function JobsSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);

  function handleSubmit(e) {
    e.preventDefault();
    const queryParams = query ? { [category]: query } : {};
    setSearchParams(queryParams);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="sm:ml-4 my-4 flex gap-5 justify-between">
        <div className="text-xs sm:text-base bg-stone-200 relative rounded-3xl flex gap-1.5 p-4 items-center w-3/5 shadow-md">
          <p className="hidden sm:inline">
            <FiSearch />
          </p>
          <input
            type="text"
            placeholder="Search Jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder:text-stone-400 bg-transparent focus:outline-none w-full"
          />
        </div>

        <div className="relative w-2/6 text-xs sm:text-base">
          <Select
            value={category}
            setValue={setCategory}
            options={categoryOptions}
          />
        </div>

        <Button
          type="primary"
          className="w-1/5 flex items-center justify-center"
        >
          <p className="sm:hidden">
            <FiSearch />
          </p>
          <p className="hidden sm:inline">Search</p>
        </Button>
      </div>
    </form>
  );
}

export default JobsSearch;
