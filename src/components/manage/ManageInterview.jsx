import InterviewForm from "./interview/InterviewForm";
import InterviewList from "./interview/InterviewList";

function ManageInterview({ job }) {
  return (
    <div className="h-full">
      <div className="border-b border-gray-200 max-h-2/5 pb-4">
        <div className="flex flex-col gap-12 justify-start items-center mt-10 h-full">
          <h1 className="text-sm sm:text-xl header w-3/4 text-center font-semibold">
            {job?.status &&
              job?.status !== "interview" &&
              "You can add new interviews once the status field is updated to interview"}
            {job?.status === "interview" && "Add new interview"}
            {!job && "You can add interviews after adding a job advertisement"}
          </h1>
          {job?._id && job?.status === "interview" && (
            <InterviewForm job={job} />
          )}
        </div>
      </div>
      <InterviewList interviews={job?.interviews} />
    </div>
  );
}

export default ManageInterview;
