import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Request = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateForm, setStartDateForm] = useState("");
  const [endDateForm, setEndDateForm] = useState("");

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setStartDateForm(start);
    setEndDateForm(end);
  };
  const handleOnSubmit = () => {
    setStartDateForm = "";
    setEndDateForm = "";
  };

  return (
    <div>
      <div className="flex justify-center items-center my-10">
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="start Date">Start Date</label>
        <input type="text" placeholder="start date" value={startDateForm} />

        <label htmlFor="end Date">End Date</label>
        <input type="text" placeholder="end date" value={endDateForm} />
        <button
          type="submit"
          onSubmit={handleOnSubmit}
          className="p-3 bg-yellow-500 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Request;
