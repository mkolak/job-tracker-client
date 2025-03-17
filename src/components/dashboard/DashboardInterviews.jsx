import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { interviewsStore } from "../../stores/InterviewsStore";
import { useState } from "react";

import { formatDate } from "../../utils/helpers";

function DashboardInterviews() {
  const [isUpcoming, setIsUpcoming] = useState(true);

  useEffect(() => {
    interviewsStore.fetchInterviews();
  }, []);

  const interviews = isUpcoming
    ? interviewsStore.upcomingInterviews
    : interviewsStore.pastInterviews;

  return (
    <div className="flex flex-col gap-4 items-center h-full">
      <div className="flex justify-center mt-12  gap-5 w-full pb-6 ml-1 mb-4 border-b shadow-sm">
        <h1 className="font-bold text-xl">Interviews</h1>
        <select
          name="interviews"
          className="p-1 border rounded-lg focus:outline-teal-500 border-teal-200"
          value={isUpcoming.toString()}
          onChange={(e) => setIsUpcoming(e.target.value === "true")}
        >
          <option value="true">Upcoming</option>
          <option value="false">Past</option>
        </select>
      </div>
      <div className="h-[18rem] md:h-[40rem] w-full flex flex-col items-center gap-2 overflow-y-auto ">
        {interviews.map((interview) => (
          <div
            className="p-2 rounded-lg shadow-lg border border-teal-600 border-opacity-35 flex relative items-center justify-between h-16 w-3/4"
            key={interview._id}
          >
            <div className="flex flex-col px-2 w-full ">
              <div className="flex w-full items-center gap-0.5">
                <h3 className="text-lg w-1/2 font-semibold text-gray-800 whitespace-nowrap text-ellipsis overflow-hidden">
                  {interview.title}
                </h3>
                <p className="text-sm text-teal-500 uppercase">
                  {interview.advertiser}
                </p>
              </div>
              <h2 className="text-sm  text-gray-600">
                {formatDate(interview.datetime)}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(DashboardInterviews);
