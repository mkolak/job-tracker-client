import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobsStore } from "../stores/JobsStore";

import ManageInterview from "../components/manage/ManageInterview";
import ManageForm from "../components/manage/ManageForm";
import Loader from "../ui/Loader";

function Manage() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      jobsStore
        .fetchJob(id)
        .then(() => {})
        .catch((error) => console.error("Error fetching job:", error));
    }
  }, [id]);

  const job = jobsStore.currentJob;

  if (!((id && job) || !id)) return <Loader />;

  function onSubmit(data) {
    jobsStore.saveJob(data, id);
    navigate("/jobs");
  }

  return (
    <div className="flex flex-1 gap-1 mt-1 h-full">
      <div className="w-1/2 border-r border-gray-200">
        <div className="container flex flex-col gap-12 justify-start items-center mt-10 h-full">
          <h1 className="text-sm sm:text-xl header w-3/4 text-center font-semibold">
            {id ? (
              <>
                Editing advertisement{" "}
                <span className="font-bold">{job.advertisement}</span> posted by{" "}
                <span className="font-bold">{job.advertiser}</span>
              </>
            ) : (
              "Add new advertisement"
            )}
          </h1>
          <ManageForm values={job} onSubmit={onSubmit} />
        </div>
      </div>
      <div className="w-1/2 h-full">
        {id && job && <ManageInterview job={job} />}
        {!id && <ManageInterview />}
      </div>
    </div>
  );
}

export default observer(Manage);
