const DaysOff = ({ days }) => {
  console.log(days);

  return (
    days &&
    days.map((day, idx) => (
      <div key={idx} className="flex justify-center items-center">
        <p className="px-5">Name: {day.name}</p>
        <p className="px-5">Start Date: {day.startDate}</p>
        <p className="px-5">End Date: {day.endDate}</p>
      </div>
    ))
  );
};

export default DaysOff;
