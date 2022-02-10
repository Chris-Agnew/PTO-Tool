import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/firebase/firebase";
import { db } from "../components/firebase/firebase";

const Request = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [user] = useAuthState(auth);

  const handleSubmit = async () => {
    const collectionRef = collection(db, "days");
    const name = user.displayName;

    const payload = { name, startDate, endDate };
    await addDoc(collectionRef, payload);
    console.log(payload);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="start Date">Start Date</label>
        <input
          type="date"
          placeholder="start date"
          onChange={e =>
            setStartDate(e.target.value).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }
        />
        <label htmlFor="end Date">End Date</label>

        <input
          type="date"
          placeholder="end date"
          onChange={e =>
            setEndDate(e.target.value).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }
        />
        <button
          type="submit"
          className="p-3 bg-yellow-500 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Request;
