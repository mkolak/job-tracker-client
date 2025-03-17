import MobxReactForm from "mobx-react-form";

import vjf from "mobx-react-form/lib/validators/VJF";
import validator from "validator";

const plugins = {
  vjf: vjf({ package: validator }),
};

const fields = {
  title: {
    label: "Title",
    placeholder: "Enter Title",
    validators: [
      (data) => {
        let value = data.form.values().title;
        if (!value) return "Title is required";
        if (typeof value !== "string" || value.length < 1 || value.length > 40)
          return "Title must be between 1 and 40 characters";
        return true;
      },
    ],
  },

  datetime: {
    label: "Interview Date",
    placeholder: "Select date",
    validators: [
      (data) => {
        let value = data.form.values().datetime;

        if (!value) return "Date of Application is required";
        return true;
      },
    ],
    default: new Date().toISOString(),
  },
};

export const interviewForm = new MobxReactForm({ fields }, { plugins });
