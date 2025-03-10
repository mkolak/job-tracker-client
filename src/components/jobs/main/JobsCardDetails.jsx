import JobsStatus from "./JobsStatus";

function JobsCardDetails({ job }) {
  const appliedAt = new Date(job.appliedAt).toLocaleDateString();

  return (
    <div className="flex justify-between items-center gap-0.5">
      <div>
        <p className="text-md text-gray-500 font-bold whitespace-nowrap text-ellipsis overflow-hidden w-40">
          {job?.location || "Unknown"}
        </p>
        <div className="mt-1 text-sm text-gray-600">{appliedAt}</div>
      </div>
      <div className="status">
        <JobsStatus status={job.status} />
      </div>
    </div>
  );
}

export default JobsCardDetails;
