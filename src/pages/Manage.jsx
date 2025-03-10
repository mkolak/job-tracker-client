import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { JobsService } from "../services/JobsService";

import ManageInterview from "../components/manage/ManageInterview";
import ManageForm from "../components/manage/ManageForm";
import Loader from "../ui/Loader";

function Manage() {
  const params = useParams();
  const id = params.id;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const jobsService = new JobsService();

  const { data: jobData } = useQuery({
    queryKey: [`job_${id}`, id],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey;
      return jobsService.getJob(id);
    },
    enabled: Boolean(id),
  });

  const job = jobData?.job || "";

  const saveJob = async (data) => {
    return id
      ? await jobsService.editJob(id, data)
      : await jobsService.createJob(data);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: saveJob,
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["monthly"]);
      queryClient.invalidateQueries(["status"]);
      if (id) queryClient.invalidateQueries([`job_${id}`]);
      navigate("/jobs");
    },
    onError: (err) => alert(err.message),
  });

  function onSubmit(data) {
    mutate(data);
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
          {(id && job) || !id ? (
            <ManageForm
              values={job}
              onSubmit={onSubmit}
              disableSubmit={isPending}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className="w-1/2 h-full">
        {id && job && <ManageInterview job={job} />}
        {!id && <ManageInterview />}
      </div>
    </div>
  );
}

export default Manage;
