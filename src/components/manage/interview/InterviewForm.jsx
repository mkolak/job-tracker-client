import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InterviewsService } from "../../../services/InterviewsService";

import DatePicker from "react-datepicker";
import Button from "../../../ui/Button";

function InterviewForm({ job }) {
  const queryClient = useQueryClient();

  const interviewsService = new InterviewsService();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isPending, mutate } = useMutation({
    mutationFn: async (data) => await interviewsService.createInterview(data),
    onSuccess: () => {
      alert("Success");
      queryClient.invalidateQueries({
        queryKey: [`job_${job._id}`],
      });
      queryClient.invalidateQueries(["interviews"]);
    },
    onError: (err) => alert(err.message),
  });

  function onSubmit(data) {
    let newInterview = data;
    newInterview.jobAdvertisementId = job._id;
    mutate(newInterview);
  }

  console.log(job.appliedAt);

  return (
    <form
      className="text-xs sm:text-base grid grid-cols-1 sm:grid-cols-2 gap-y-5 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="title">Title*</label>
      <input
        type="text"
        name="title"
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...register("title", {
          required: "title is required",
        })}
      />
      {errors.title && (
        <p className="text-xs text-red-500 col-span-2">
          {errors.title.message}
        </p>
      )}

      <label htmlFor="datetime">Interview Date*</label>
      <Controller
        control={control}
        name="datetime"
        defaultValue={Date.now()}
        render={({ field }) => (
          <DatePicker
            portalId="root-portal"
            placeholderText="Select date and time"
            onChange={(date) => field.onChange(date)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={job.appliedAt}
            selected={field.value ? new Date(field.value) : null}
            value={field.value ? new Date(field.value) : null}
            className="p-2 border rounded-lg focus:outline-teal-500 border-teal-200"
          />
        )}
      />

      <p className="text-xs">Fields with * are required</p>
      <Button type="primary" className="w-1/2  p-2" disabled={isPending}>
        Submit
      </Button>
    </form>
  );
}

export default InterviewForm;
