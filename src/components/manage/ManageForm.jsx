import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { manageForm } from "../../forms/ManageFormModel";

import Button from "../../ui/Button";
import DatePicker from "react-datepicker";

function ManageForm({ values, onSubmit }) {
  useEffect(() => {
    manageForm.$("advertisement").set(values?.advertisement || "");
    manageForm.$("advertisementUrl").set(values?.advertisementUrl || "");
    manageForm.$("advertiser").set(values?.advertiser || "");
    manageForm.$("advertiserWebsite").set(values?.advertiserWebsite || "");
    manageForm.$("location").set(values?.location || "");
    manageForm.$("advertisement").set(values?.advertisement || "");
    manageForm.$("status").set(values?.status || "pending");
    manageForm
      .$("appliedAt")
      .set(values?.appliedAt || new Date().toISOString());
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    manageForm.validate().then(({ isValid }) => {
      if (isValid) onSubmit(manageForm.values());
      else manageForm.showErrors();
    });
  };

  return (
    <form
      className="text-xs sm:text-base grid grid-cols-1 lg:grid-cols-2 gap-y-5 items-center h-[32rem] sm:h-[40rem] g:h-auto overflow-auto w-4/5 lg:w-auto "
      onSubmit={handleSubmit}
    >
      <label>{manageForm.$("advertisement").label}*</label>
      <input
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...manageForm.$("advertisement").bind()}
      />
      {manageForm.$("advertisement").error && (
        <p className="text-xs text-red-500 col-span-2">
          {manageForm.$("advertisement").error}
        </p>
      )}

      <label>{manageForm.$("advertisementUrl").label}</label>
      <input
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...manageForm.$("advertisementUrl").bind()}
      />
      {manageForm.$("advertisementUrl").error && (
        <p className="text-xs text-red-500 col-span-2">
          {manageForm.$("advertisementUrl").error}
        </p>
      )}

      <label>{manageForm.$("advertiser").label}*</label>
      <input
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...manageForm.$("advertiser").bind()}
      />
      {manageForm.$("advertiser").error && (
        <p className="text-xs text-red-500 col-span-2">
          {manageForm.$("advertiser").error}
        </p>
      )}

      <label>{manageForm.$("advertiserWebsite").label}</label>
      <input
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...manageForm.$("advertiserWebsite").bind()}
      />
      {manageForm.$("advertiserWebsite").error && (
        <p className="text-xs text-red-500 col-span-2">
          {manageForm.$("advertiserWebsite").error}
        </p>
      )}

      <label>{manageForm.$("location").label}*</label>
      <input
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...manageForm.$("location").bind()}
      />
      {manageForm.$("location").error && (
        <p className="text-xs text-red-500 col-span-2">
          {manageForm.$("location").error}
        </p>
      )}

      <label>{manageForm.$("status").label}*</label>
      <select
        {...manageForm.$("status").bind()}
        className="p-2 border rounded-lg focus:outline-teal-500 border-teal-200"
        // defaultValue="pending"
      >
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
      </select>
      {manageForm.$("status").error && (
        <p className="text-xs text-red-500 col-span-2">
          {manageForm.$("status").error}
        </p>
      )}

      <label>{manageForm.$("appliedAt").label}*</label>
      <DatePicker
        portalId="root-portal"
        className="p-2 border rounded-lg focus:outline-teal-500 border-teal-200"
        onChange={(date) =>
          manageForm.$("appliedAt").onChange(date.toISOString())
        }
        selected={
          manageForm.$("appliedAt").value
            ? new Date(manageForm.$("appliedAt").value)
            : Date.now()
        }
        maxDate={Date.now()}
        dateFormat="MMMM d, yyyy"
      />
      {manageForm.$("appliedAt").error && (
        <p className="text-xs text-red-500 col-span-2">
          {manageForm.$("appliedAt").error}
        </p>
      )}

      <p className="text-xs">Fields with * are required</p>
      <Button
        type="primary"
        className="w-1/2  p-2"
        disabled={manageForm.isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}

export default observer(ManageForm);
