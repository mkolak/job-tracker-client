function JobsSummary({ total, shown }) {
  return (
    <div className="ml-4 my-4 text-stone-700 text-md">
      Total jobs found: <span className="font-bold">{total}</span>
      {"\t"}
      Shown: <span className="font-bold">{shown}</span>
    </div>
  );
}

export default JobsSummary;
