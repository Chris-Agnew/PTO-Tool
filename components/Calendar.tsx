const calendar = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_qij2pdnr23tibnjc8627gt371o%40group.calendar.google.com&ctz=America%2FNew_York"
        style={{
          border: 'solid 2px #777',
          borderRadius: '10px',
          padding: '15px',
        }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  )
}

export default calendar
