import { useAuth } from "../components/firebase/Auth";
import DashboardInfo from "../components/dashboard/DashboardInfo";
import Calendar from "../components/calendar";

const dashboard = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto text-center">
        <DashboardInfo />
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
              2.7
            </h2>
            <p className="leading-relaxed">PTO Days YTD</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
              2.3
            </h2>
            <p className="leading-relaxed">PTO Days Left</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
              4
            </h2>
            <p className="leading-relaxed">Appointment Hours</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
              4.5
            </h2>
            <p className="leading-relaxed">Other PTO days</p>
          </div>
        </div>
      </div>
      <Calendar />
    </section>
  );
};

export default dashboard;
