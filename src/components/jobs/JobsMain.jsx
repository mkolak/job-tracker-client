import { useEffect, useRef } from "react";
import JobsCard from "./main/JobsCard";

function JobsMain({ jobs, fetchNextPage, isFetchingNextPage }) {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    const toCleanup = loaderRef.current;
    return () => {
      if (toCleanup) {
        observer.unobserve(toCleanup);
      }
    };
  }, [isFetchingNextPage, fetchNextPage]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {jobs.map((job) => (
        <JobsCard job={job} key={job._id} />
      ))}
      <div ref={loaderRef} className="w-full text-center mt-4">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  );
}

export default JobsMain;
