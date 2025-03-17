import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { statsStore } from "../../stores/StatsStore";

import JobsSidebarHeader from "./sidebar/JobsSidebarHeader";
import JobsSidebarRadioFilter from "./sidebar/JobsSidebarRadioFilter";
import JobsSidebarDateRange from "./sidebar/JobsSidebarDateRange";
import JobsSidebarCheckboxFilter from "./sidebar/JobsSidebarCheckboxFilter";

const sortOptions = [
  { name: "A-Z", value: "advertisement" },
  { name: "Z-A", value: "-advertisement" },
  { name: "Least Recent", value: "appliedAt" },
  { name: "Most Recent", value: "-appliedAt" },
];

function JobsSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [status, setStatus] = useState([]);
  const [location, setLocation] = useState(
    searchParams.get("location")?.split("+") || []
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || null
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || null);

  const query = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  useEffect(() => {
    statsStore.fetchStatus(query);
    statsStore.fetchLocations(query);
  }, [query]);

  const statusCount = statsStore.status;
  const locations = statsStore.locations;

  function handleApply(e) {
    e.preventDefault();
    setSearchParams((params) => {
      if (sort) params.set("sort", sort);
      else params.delete("sort");

      if (location.length) params.set("location", location.join("+"));
      else params.delete("location");

      if (status.length) params.set("status", status.join(","));
      else params.delete("status");

      if (startDate) params.set("startDate", startDate);
      else params.delete("startDate");

      if (endDate) params.set("endDate", endDate);
      else params.delete("endDate");

      return params;
    });
  }

  function handleClear(e) {
    e.preventDefault();
    let revertedParams = {};
    if (searchParams.get("advertisement"))
      revertedParams["advertisement"] = searchParams.get("advertisement");
    else if (searchParams.get("advertiser"))
      revertedParams["advertiser"] = searchParams.get("advertiser");

    setSearchParams(revertedParams);
    setSort("");
    setStartDate(null);
    setEndDate(null);
    setLocation([]);
    setStatus([]);
  }

  return (
    <div className="flex flex-col pr-1">
      <JobsSidebarHeader onApply={handleApply} onClear={handleClear} />

      {/* SORT BY */}
      <JobsSidebarRadioFilter
        name="Sort By"
        options={sortOptions}
        value={sort}
        setValue={setSort}
      />
      {/* APPLICATION DATE */}
      <JobsSidebarDateRange
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {/* STATUS */}
      <JobsSidebarCheckboxFilter
        name="Status"
        options={statusCount}
        value={status}
        setValue={setStatus}
      />

      {/* LOCATION */}
      <JobsSidebarCheckboxFilter
        name="Location"
        options={locations}
        value={location}
        setValue={setLocation}
      />
    </div>
  );
}

export default observer(JobsSidebar);
