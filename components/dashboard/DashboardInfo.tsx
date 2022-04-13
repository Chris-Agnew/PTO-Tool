import { useAuth } from '../firebase/Auth'
import { day } from './table/Table'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../components/firebase/firebase'
import CountUp from 'react-countup'
import { differenceInHours } from 'date-fns'

export interface MyItem {
  id: string
  name: string
  email: string
  startDate: Date
  endDate: Date
  total: number
  image: string
  uid: string
  businessDatesCount: number
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
  const sumTotalTime = (time: any) => {
    let total: number = 0
    time.forEach((item: any) => {
      console.log(item)
      if (user?.uid == item.uid) {
        total += item.businessDatesCount * 8
      }
    })
    return total
  }
  //sum total days
  const sumTotalDays = (time: any) => {
    let total: number = 0
    time.forEach((item: any) => {
      console.log(item)
      if (user?.uid == item.uid) {
        total += item.businessDatesCount
      }
    })
    return total
  }
  //sum total hours and difference in hours
  const sumTotalHours = (endDate: Date, startDate: Date) => {
    const difference = differenceInHours(endDate, startDate)
    return difference
  }

  console.log(currentUser)
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
            <CountUp end={sumTotalDays(days)} duration={1} />
          </h2>
          <p className="leading-relaxed">PTO days YTD</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardInfo
