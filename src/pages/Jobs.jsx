import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { JobsService } from "../services/JobsService";

import JobsSearch from "../components/jobs/JobsSearch";
import JobsSidebar from "../components/jobs/JobsSidebar";
import JobsMain from "../components/jobs/JobsMain";
import JobsSummary from "../components/jobs/JobsSummary";
import Loader from "../ui/Loader";

function Jobs() {
  const [searchParams] = useSearchParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const query = Object.fromEntries(searchParams.entries());

  const jobsService = new JobsService();

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["jobs", query],
      queryFn: ({ queryKey, pageParam = 1 }) => {
        const [, params] = queryKey;
        return jobsService.getJobs(params, pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  if (isError) return <div>Error loading data</div>;

  const jobs =
    data?.pages
      .flat()
      .reduce((allJobs, page) => [...allJobs, ...page.jobs], []) || [];

  const totalJobs = data?.pages.at(-1).nbHits || 0;
  let shownJobs = data?.pages.at(-1).currentPage * 10 || 0;
  if (shownJobs > totalJobs) shownJobs = totalJobs;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="border-b border-gray-200 p-4">
        <JobsSearch />
        <JobsSummary total={totalJobs} shown={shownJobs} />
      </div>

      {/* ON SMALL SCREEN */}
      <button
        className="sm:hidden p-2 text-teal-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      <div
        className={`sm:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div
          className="w-3/4 sm:w-1/2 bg-white p-4 shadow-lg h-full overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <JobsSidebar />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="hidden sm:block sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 overflow-auto">
          <JobsSidebar />
        </div>
        <div className="w-full sm:w-1/2 md:w-3/5 lg:w-2/3 xl:w-3/4 bg-stone-100 overflow-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <JobsMain
              jobs={jobs}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
