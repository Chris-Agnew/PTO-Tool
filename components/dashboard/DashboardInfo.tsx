import { useAuth } from '../firebase/Auth'
import { day } from './table/Table'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../components/firebase/firebase'
import CountUp from 'react-countup'

export interface MyItem {
  id: string
  name: string
  email: string
  startDate: Date
  endDate: Date
  total: number
  image: string
  uid: string
}

export type MyItemList = [MyItem]

// calculate the total time for the day

export const totalTime = (time: number) => {
  if (time > 8) {
    return 8
  } else {
    return time - 1
  }
}
// calculate the time between the start and end date
export const timeBetween = (start: number, end: number) => {
  const difference = end - start
  return difference / 3600
}

const DashboardInfo = ({ days }: day) => {
  const { currentUser }: any = useAuth()
  console.log(days)
  const [user] = useAuthState(auth)

  //sum total time
  const sumTotalTime = (time: MyItemList) => {
    let total: number = 0
    time.forEach((item) => {
      user?.uid == item.uid ? (total += item.total) : total
    })
    return total
  }

  return (
    <div className="my-10 ">
      <h2 className="text-4xl my-10">Welcome {currentUser.displayName}</h2>
      <div className="flex flex-wrap -m-4 text-center justify-center">
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            <CountUp end={sumTotalTime(days)} duration={1} />
          </h2>
          <p className="leading-relaxed">PTO Hours YTD</p>
        </div>

        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            <CountUp end={sumTotalTime(days) / 8} duration={1} />
          </h2>
          <p className="leading-relaxed">PTO days YTD</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardInfo
