import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../components/firebase/firebase'
import { db } from '../components/firebase/firebase'
import { format, getDay, setHours, setMinutes } from 'date-fns'
import { totalTime, timeBetween } from '../components/dashboard/DashboardInfo'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const isWeekday = (date: any) => {
  const day = getDay(date)
  return day !== 0 && day !== 6
}

const Request = () => {
  const [startDate, setStartDate] = useState<any>(new Date())
  const [endDate, setEndDate] = useState<any>(new Date())
  const [craftBlock, setCraftBlock] = useState<any>('')
  const [reason, setReason] = useState<string>('')
  const [user] = useAuthState(auth)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user!.uid), (doc) => {
      setCraftBlock(doc.data()?.craftblock)
    })
    return unsub
  }, [user])

  const handleSubmit = async () => {
    const name = user?.displayName
    const image = user?.photoURL
    const email = user?.email
    const uid = user?.uid
    const time = timeBetween(startDate, endDate)
    const total = totalTime(time)
    craftBlock ? craftBlock : 'none'
    const collectionRef = collection(db, user!.uid)
    const collectionRefAll = collection(db, 'days')
    const collectionRefBackup = collection(db, 'backup')
    const date = Date.now()

    const payload = {
      name,
      image,
      email,
      startDate,
      endDate,
      uid,
      total,
      craftBlock,
      reason,
    }
    await setDoc(doc(collectionRef, `${date}`), payload)
    await setDoc(doc(collectionRefAll, `${date}`), payload)
    await setDoc(doc(collectionRefBackup, `${date}`), payload)
    setAdded(true)
    console.log(payload)
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className=" h-full  justify-center items-center py-10 px-5 text-black flex flex-col  ">
          <div className="flex flex-col p-3 w-[360px] md:w-full">
            <h2 className="text-center">Start Date:</h2>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MM-dd-yy h:mm aa"
              minTime={setHours(setMinutes(new Date(), 0), 7)}
              maxTime={setHours(setMinutes(new Date(), 0), 17)}
              filterDate={isWeekday}
              inline
              excludeTimes={[
                setHours(setMinutes(new Date(), 0), 12),
                setHours(setMinutes(new Date(), 15), 12),
                setHours(setMinutes(new Date(), 30), 12),
                setHours(setMinutes(new Date(), 45), 12),
              ]}
              className="w-3/4"
            />
          </div>
          <div className="flex flex-col p-3 w-[360px] md:w-full ">
            <h2 className="text-center">End Date:</h2>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MM-dd-yy h:mm aa"
              minTime={setHours(setMinutes(new Date(), 0), 7)}
              maxTime={setHours(setMinutes(new Date(), 0), 17)}
              filterDate={isWeekday}
              inline
              excludeTimes={[
                setHours(setMinutes(new Date(), 0), 12),
                setHours(setMinutes(new Date(), 15), 12),
                setHours(setMinutes(new Date(), 30), 12),
                setHours(setMinutes(new Date(), 45), 12),
              ]}
              className="w-screen"
            />
          </div>
          <div>
            <form
              className="flex flex-col justify-center items-center"
              onChange={(e) => setReason((e.target as HTMLSelectElement).value)}
            >
              <label htmlFor="reason">Choose a reason:</label>
              <select name="reasons" id="reason" className="text-center">
                <option value="none">-</option>
                <option value="Vacation/Personal">Vacation/Personal</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Maternity/Paternity">Maternity/Paternity</option>
                <option value="Bereavement">Bereavement</option>
                <option value="Appointment">Appointment</option>
                <option value="Covid">Covid</option>
              </select>
            </form>
          </div>
        </div>

        <button
          type="submit"
          className="p-2 my-5 mt-10 bg-yellow-500 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {added && (
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-10">
          <div className="flex items-center justify-center w-12 bg-emerald-500">
            <svg
              className="w-6 h-6 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
            </svg>
          </div>

          <div className="px-4 py-2 -mx-3 ">
            <div className="mx-3">
              <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                Success
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Your time off has been added!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Request
