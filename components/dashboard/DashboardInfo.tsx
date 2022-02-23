import { useAuth } from '../firebase/Auth'
import { day } from './table/Table'
import { differenceInSeconds } from 'date-fns'

// calculate the total time for the day

export const totalTime = (time: any) => {
  if (time > 8) {
    return 8
  } else {
    return time - 1
  }
}
// calculate the time between the start and end date
export const timeBetween = (start: any, end: any) => {
  const difference = end - start
  return difference / 3600
}

const DashboardInfo = ({ days }: day) => {
  const { currentUser }: any = useAuth()
  console.log(days)

  //sum total time
  const sumTotalTime = (time: any) => {
    let total = 0
    time.forEach((item: any) => {
      total += totalTime(item)
    })
    return total
  }

  return (
    <div className="my-24">
      <h2 className="text-4xl">Welcome {currentUser.displayName}</h2>
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

      {days.map((day) => (
        <p key={day.id}>{day.total}</p>
      ))}
    </div>
  )
}

export default DashboardInfo
