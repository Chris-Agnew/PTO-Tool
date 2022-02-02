const calendar = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FNew_York&src=YWR2YW5jZWQtcnYuY29tX3JmbW9qOWoxczAxOGIycmRnMnFiZW5jdDFjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23C0CA33"
        style={{
          border: "solid 2px #777",
          borderRadius: "10px",
          padding: "15px",
        }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default calendar;
