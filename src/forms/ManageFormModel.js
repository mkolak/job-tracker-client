import MobxReactForm from "mobx-react-form";

import vjf from "mobx-react-form/lib/validators/VJF";
import validator from "validator";

const plugins = {
  vjf: vjf({ package: validator }),
};

const fields = {
  advertisement: {
    label: "Advertisement",
    placeholder: "Enter advertisement",
    validators: [
      (data) => {
        let value = data.form.values().advertisement;
        if (!value) return "Advertisement is required";
        if (typeof value !== "string" || value.length < 1 || value.length > 40)
          return "Advertisement must be between 1 and 40 characters";
        return true;
      },
    ],
  },

  advertisementUrl: {
    label: "Advertisement URL",
    placeholder: "Enter advertisement URL",
    validators: [
      (data) => {
        let value = data.form.values().advertisementUrl;
        if (!value) return true;
        if (!validator.isURL(value)) return "Invalid advertisement URL";
        return true;
      },
    ],
  },
  advertiser: {
    label: "Advertiser",
    placeholder: "Enter advertiser",
    validators: [
      (data) => {
        let value = data.form.values().advertiser;
        if (!value) return "Advertiser is required";
        if (typeof value !== "string" || value.length < 1 || value.length > 40)
          return "Advertiser must be between 1 and 40 characters";
        return true;
      },
    ],
  },
  advertiserWebsite: {
    label: "Advertiser Website",
    placeholder: "Enter advertiser website",
    validators: [
      (data) => {
        let value = data.form.values().advertiserWebsite;

        if (!value) return true;
        if (!validator.isURL(value)) return "Invalid advertiser website";
        return true;
      },
    ],
  },
  location: {
    label: "Location",
    placeholder: "Enter location",
    validators: [
      (data) => {
        let value = data.form.values().location;

        if (!value) return "Location is required";
        if (typeof value !== "string" || value.length < 1 || value.length > 40)
          return "Location must be between 1 and 40 characters";
        return true;
      },
    ],
  },
  status: {
    label: "Status",
    placeholder: "Select status",
    validators: [
      (data) => {
        let value = data.form.values().status;

        if (!value) return "Status is required";
        const validStatuses = ["pending", "interview", "rejected"];
        if (!validStatuses.includes(value))
          return "Status must be one of pending, interview, or rejected";
        return true;
      },
    ],
    default: "pending",
  },
  appliedAt: {
    label: "Date of Application",
    placeholder: "Select date",
    validators: [
      (data) => {
        let value = data.form.values().appliedAt;

        if (!value) return "Date of Application is required";
        return true;
      },
    ],
    default: new Date().toISOString(),
  },
};

export const manageForm = new MobxReactForm({ fields }, { plugins });
