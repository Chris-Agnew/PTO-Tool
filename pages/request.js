import { useState } from "react";
import { addDoc, collection, deleteDoc } from "firebase/firestore";
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
    const image = user.photoURL;
    const email = user.email;

    const payload = { name, image, email, startDate, endDate };
    await addDoc(collectionRef, payload);
    console.log(payload);
  };

  const handleDelete = async () => {
    const collectionRef = collection(db, "days");
    await deleteDoc(collectionRef, "1");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="start Date">Start Date</label>
        <input
          type="datetime-local"
          placeholder="start date"
          onChange={e => setStartDate(e.target.value)}
        />
        <label htmlFor="end Date">End Date</label>

        <input
          type="datetime-local"
          placeholder="end date"
          onChange={e => setEndDate(e.target.value)}
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
