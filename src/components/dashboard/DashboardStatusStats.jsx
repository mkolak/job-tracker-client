import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { statsStore } from "../../stores/StatsStore";
import { capitalize } from "../../utils/helpers";
import Loader from "../../ui/Loader";

const colors = {
  interview: "text-green-400",
  pending: "text-yellow-400",
  rejected: "text-red-400",
  total: "text-teal-400",
};

function DashboardStatusStats() {
  useEffect(() => {
    statsStore.fetchStatus();
  }, []);

  let status = statsStore.status;

  if (!status.length) return <Loader />;

  const totalApplications = status.reduce((acc, st) => acc + st.count, 0);
  status = [...status, { _id: "total", count: totalApplications }];

  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-xl my-10 md:text-2xl font-semibold">
        Job Applications
      </h1>
      <div className="hidden lg:flex w-full  p-10 justify-between items-center gap-3 h-52 ">
        {status.map((st) => (
          <div
            className="p-2 rounded-lg shadow-lg border border-teal-600 border-opacity-35 flex flex-col items-center h-52 w-1/4"
            key={st._id}
          >
            <h3 className="mt-4 text-base font-semibold uppercase text-gray-800 tracking-wider">
              {st._id}
            </h3>
            <p
              className={`mt-4 text-5xl border h-24 w-24 flex justify-center items-center rounded-full border-teal-600 border-opacity-35 shadow-sm ${
                colors[st._id]
              }`}
            >
              {st.count}
            </p>
          </div>
        ))}
      </div>
      <div className="flex lg:hidden p-6 rounded-lg shadow-lg border border-teal-600 border-opacity-35 flex-col w-3/4 gap-4">
        {status.map((st) => (
          <div className="flex justify-between" key={st._id}>
            <p>{capitalize(st._id)}</p>
            <p className="text-teal-500">{st.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(DashboardStatusStats);
