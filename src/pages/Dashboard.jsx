import DashboardChart from "../components/dashboard/DashboardChart";
import DashboardInterviews from "../components/dashboard/DashboardInterviews";
import DashboardStatusStats from "../components/dashboard/DashboardStatusStats";

function Dashboard() {
  return (
    <div className="md:grid  md:grid-cols-2  lg:grid-cols-3  h-full">
      <div className="lg:col-span-2 ">
        <DashboardStatusStats />
      </div>
      <div className="row-span-2 border-l">
        <DashboardInterviews />
      </div>
      <div className="lg:col-span-2 hidden md:block">
        <DashboardChart />
      </div>
    </div>
  );
}

export default Dashboard;
