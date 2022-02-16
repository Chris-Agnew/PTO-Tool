import DashboardInfo from "../components/dashboard/DashboardInfo";
import Calendar from "../components/Calendar";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Table from "../components/dashboard/table/Table";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../components/firebase/firebase";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  const [days, setDays] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const collectionRef = collection(db, "days");
    const q = query(collectionRef, where("uid", "==", user.uid));
    // const qAll = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setDays(
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          timestamp: serverTimestamp(),
        }))
      );
    });
    console.log("time off has been added");
    return unsubscribe;
  }, [user.uid]);

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
      <Table days={days} />
    </section>
  );
};

export default Dashboard;
