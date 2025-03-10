import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

import Button from "../../ui/Button";

const URL_REGEX =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function ManageForm({ values, onSubmit, disableSubmit }) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      advertisement: values?.advertisement || "",
      advertisementUrl: values?.advertisementUrl || "",
      advertiser: values?.advertiser || "",
      advertiserWebsite: values?.advertiserWebsite || "",
      location: values?.location || "",
      status: values?.status || "pending",
      appliedAt: values?.appliedAt || Date.now(),
    },
  });

  return (
    <form
      className="text-xs sm:text-base grid grid-cols-1 lg:grid-cols-2 gap-y-5 items-center h-[32rem] g:h-auto overflow-auto w-4/5 lg:w-auto "
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="advertisement">Advertisement*</label>
      <input
        type="text"
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        defaultValue={values?.advertisement}
        {...register("advertisement", {
          required: "Advertisement is required",
          maxLength: {
            value: 40,
            message: "Advertisement cannot exceed 40 characters",
          },
        })}
      />
      {errors.advertisement && (
        <p className="text-xs text-red-500 col-span-2">
          {errors.advertisement.message}
        </p>
      )}

      <label htmlFor="advertisementUrl">Advertisement URL</label>
      <input
        type="text"
        name="advertisementUrl"
        defaultValue={values?.advertisementUrl}
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...register("advertisementUrl", {
          pattern: {
            value: URL_REGEX,
            message: "Enter a valid URL",
          },
        })}
      />
      {errors.advertisementUrl && (
        <p className="text-xs text-red-500 col-span-2">
          {errors.advertisementUrl.message}
        </p>
      )}

      <label htmlFor="advertiser">Advertiser*</label>
      <input
        type="text"
        name="advertiser"
        defaultValue={values?.advertiser}
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...register("advertiser", {
          required: "Advertiser is required",
          maxLength: {
            value: 40,
            message: "Advertiser name cannot exceed 40 characters",
          },
        })}
      />
      {errors.advertiser && (
        <p className="text-xs text-red-500 col-span-2">
          {errors.advertiser.message}
        </p>
      )}

      <label htmlFor="advertiserWebsite">Advertiser Website</label>
      <input
        type="text"
        name="advertiserWebsite"
        defaultValue={values?.advertiserWebsite}
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...register("advertiserWebsite", {
          pattern: {
            value: URL_REGEX,
            message: "Enter a valid URL (must start with http:// or https://)",
          },
        })}
      />
      {errors.advertiserWebsite && (
        <p className="text-xs text-red-500 col-span-2">
          {errors.advertiserWebsite.message}
        </p>
      )}

      <label htmlFor="location">Location*</label>
      <input
        type="text"
        name="location"
        defaultValue={values?.location}
        className="p-2 border rounded-lg w-full focus:outline-teal-500 border-teal-200"
        {...register("location", {
          required: "Location is required",
          maxLength: {
            value: 40,
            message: "Location cannot exceed 40 characters",
          },
        })}
      />
      {errors.location && (
        <p className="text-xs text-red-500 col-span-2">
          {errors.location.message}
        </p>
      )}

      <label htmlFor="status">Status*</label>
      <select
        name="status"
        defaultValue={values?.status || "pending"}
        {...register("status", {
          required: "Status is required",
          validate: (value) =>
            ["pending", "interview", "rejected"].includes(value) ||
            "Status must be one of pending, interview, or rejected",
        })}
        className="p-2 border rounded-lg focus:outline-teal-500 border-teal-200"
      >
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
      </select>
      {errors.status && (
        <p className="text-xs text-red-500">{errors.status.message}</p>
      )}

      <label htmlFor="appliedAt">Date of Application*</label>
      <Controller
        control={control}
        name="appliedAt"
        defaultValue={Date.now()}
        render={({ field }) => (
          <DatePicker
            portalId="root-portal"
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value ? new Date(field.value) : null}
            value={field.value ? new Date(field.value) : null}
            maxDate={Date.now()}
            dateFormat="MMMM d, yyyy"
            className="p-2 border rounded-lg focus:outline-teal-500 border-teal-200"
          />
        )}
      />
      <p className="text-xs">Fields with * are required</p>
      <Button type="primary" className="w-1/2  p-2" disabled={disableSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default ManageForm;
