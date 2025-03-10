import InterviewCard from "./InterviewCard";

function InterviewList({ interviews }) {
  return (
    <div className="flex flex-col gap-8 justify-start items-center py-8 h-[24rem] sm:h-[34rem]">
      <h1 className="text-sm sm:text-xl header w-3/4 text-center font-semibold">
        Related Interviews
      </h1>
      {!interviews?.length && (
        <p className="text-sm">No interviews scheduled</p>
      )}
      <div className="flex flex-col items-center gap-2 w-3/4 overflow-auto">
        {interviews?.map((interview) => (
          <InterviewCard interview={interview} key={interview._id} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
