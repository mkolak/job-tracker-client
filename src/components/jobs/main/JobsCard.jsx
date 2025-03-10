import { useState } from "react";

import JobsCardHeader from "./JobsCardHeader";
import JobsCardDetails from "./JobsCardDetails";
import JobsCardActionButtons from "./JobsCardActionButtons";
import JobsCardExpander from "./JobsCardExpander";

function JobsCard({ job }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-lg border border-teal-600 border-opacity-35  transition-all relative justify-between group ${
        isExpanded ? "h-64" : "h-52"
      }`}
    >
      <div className="h-24">
        <JobsCardHeader job={job} />
      </div>
      <div className="h-16 mt-3 flex flex-col gap-3">
        <JobsCardDetails job={job} />
      </div>
      <div className="h-16">
        <JobsCardActionButtons id={job._id} show={isExpanded} />
      </div>
      <JobsCardExpander setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
    </div>
  );
}

export default JobsCard;
