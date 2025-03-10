import { format } from "date-fns";

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function formatDate(date) {
  return format(new Date(date), "MMMM d, yyyy h:mm aa");
}
