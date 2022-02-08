import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useState, useEffect } from "react";

const DaysOff = () => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "days");
    const q = query(collectionRef, orderBy("name", "desc"));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setDays([
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().Timestamp?.toDate().getTime(),
        })),
      ]);
    });
    return unsubscribe;
  }, []);
  console.log(days);
  return (
    <div>
      {days.map(day => (
        <div key={day.id}>
          <p>{day.name}</p>
          <p>{day.day}</p>
          <p>{day.id}</p>
        </div>
      ))}
    </div>
  );
};

export default DaysOff;
