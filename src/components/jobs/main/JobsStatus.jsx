function JobsStatus({ status }) {
  let bgColor;
  if (status === "pending") bgColor = "bg-yellow-400";
  if (status === "rejected") bgColor = "bg-red-400";
  if (status === "interview") bgColor = "bg-green-400";
  return (
    <div
      className={`text-xs uppercase tracking-widest shadow-md rounded-lg  p-2 ${bgColor}`}
    >
      {status}
    </div>
  );
}

export default JobsStatus;
