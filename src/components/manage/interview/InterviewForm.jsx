import { observer } from "mobx-react-lite";
import { interviewForm } from "../../../forms/InterviewFormModel";

import DatePicker from "react-datepicker";
import Button from "../../../ui/Button";
import { interviewsStore } from "../../../stores/InterviewsStore";
import { useEffect } from "react";

function InterviewForm({ job }) {
  useEffect(() => {
    interviewForm.$("title").set("");
    interviewForm.$("datetime").set(Date.now());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    interviewForm.validate().then(({ isValid }) => {
      if (!isValid) interviewForm.showErrors();
      else {
        let newInterview = interviewForm.values();
        newInterview.jobAdvertisementId = job._id;
        interviewsStore.saveInterview(newInterview);
      }
    });
  };

  return (
    <form
      className="text-xs sm:text-base grid grid-cols-1 sm:grid-cols-2 gap-y-5 items-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">{interviewForm.$("title").label}*</label>
      <input
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...interviewForm.$("title").bind()}
      />
      {interviewForm.$("title").error && (
        <p className="text-xs text-red-500 col-span-2">
          {interviewForm.$("title").error}
        </p>
      )}

      <label>{interviewForm.$("datetime").label}*</label>
      <DatePicker
        portalId="root-portal"
        className="p-2 border rounded-lg focus:outline-teal-500 border-teal-200"
        onChange={(date) =>
          interviewForm.$("datetime").onChange(date.toISOString())
        }
        selected={
          interviewForm.$("datetime").value
            ? new Date(interviewForm.$("datetime").value)
            : Date.now()
        }
        minDate={new Date(job.appliedAt)}
        dateFormat="MMMM d, yyyy"
      />
      {interviewForm.$("datetime").error && (
        <p className="text-xs text-red-500 col-span-2">
          {interviewForm.$("datetime").error}
        </p>
      )}

      <p className="text-xs">Fields with * are required</p>
      <Button
        type="primary"
        className="w-1/2  p-2"
        disabled={interviewsStore.isLoading}
      >
        Submit
      </Button>
    </form>
  );
}

export default observer(InterviewForm);
