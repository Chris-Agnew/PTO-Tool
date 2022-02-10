import DashboardInfo from "../components/dashboard/DashboardInfo";
import Calendar from "../components/calendar";
import DaysOff from "../components/DaysOff";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../components/firebase/firebase";

const Dashboard = () => {
  const [days, setDays] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "days");
    const q = query(collectionRef, orderBy("name", "desc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setDays(
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          timestamp: serverTimestamp(),
        }))
      );
    });
    return unsubscribe;
  }, []);

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
      <DaysOff days={days} />
    </section>
  );
};

export default Dashboard;
