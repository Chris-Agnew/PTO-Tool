import Image from 'next/image'
import { format, formatDistanceToNow, setHours, setMinutes } from 'date-fns'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase/firebase'
import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  orderBy,
  getDoc,
  collection,
  onSnapshot,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Modal } from '@nextui-org/react'
import { Text, Button } from '@nextui-org/react'
import { timeBetween, totalTime } from '../DashboardInfo'
import { differenceInBusinessDays } from 'date-fns'
import ReactDatePicker from 'react-datepicker'
import { isWeekday } from '../../../pages/request'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export interface day {
  days: [
    {
      email: string
      endDate: any
      id: string
      image: string
      name: string
      startDate: any
      timestamp: any
      uid: string
      total: number
      craftBlock: string
      reason: string
    }
  ]
}

const Table = ({ days }: day) => {
  const [user] = useAuthState(auth)
  const [newStartDate, setNewStartDate] = useState<any>()
  const [newEndDate, setNewEndDate] = useState<any>()
  const [craftBlock, setCraftBlock] = useState<any>('')

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user!.uid), (doc) => {
      setCraftBlock(doc.data()?.craftblock)
    })
    return unsub
  }, [user])

  const handleDelete = async (id: string) => {
    const docRefAll = doc(db, 'days', id)
    console.log(docRefAll, id)
    const docRef = doc(db, user!.uid, id)
    await deleteDoc(docRef)
    await deleteDoc(docRefAll)
  }

  const handleEdit = async (id: string) => {
    const docRefAll = doc(db, 'days', id)
    const docRef = doc(db, user!.uid, id)
    const name = user?.displayName
    const image = user?.photoURL
    const email = user?.email
    const uid = user?.uid
    const time = timeBetween(newStartDate, newEndDate)
    const total = totalTime(time)
    craftBlock ? craftBlock : 'none'

    const payload = {
      startDate: newStartDate,
      endDate: newEndDate,
      name,
      image,
      email,
      uid,
      total,
      craftBlock,
    }
    await setDoc(docRef, payload)
    await setDoc(docRefAll, payload)
  }

  const formatDate = (date: string | number | Date) => {
    return format(new Date(date), 'MM-dd-yyyy h:mm a')
  }

  const [visible, setVisible] = useState<boolean>(false)
  const handler = () => setVisible(true)
  const closeHandler = () => {
    setVisible(false)
  }

  const closeAndUpdate = (id: string) => {
    handleEdit(id)
    closeHandler()
  }
  console.log(days)

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center items-center">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {/* <thead className="bg-gray-50 hidden md:flex">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead> */}
              <tbody className="bg-white divide-y divide-gray-200">
                {days &&
                  days.map((day) => (
                    <tr key={day.id} className="flex flex-col lg:flex-row">
                      <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center items-center">
                        <div className="flex items-center flex-col lg:flex">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={day && day.image}
                              height={50}
                              width={50}
                              alt="employee image"
                            />
                          </div>
                          <div className="ml-4 mt-5">
                            <div className="text-sm font-medium text-gray-900">
                              {day.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {day.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-1 lg:py-4 text-center">
                        <div className="text-sm text-gray-900">
                          {/* // convert firestore timestamp to time and date */}
                          {`${formatDate(day.startDate.toDate()) || null} -
                        ${formatDate(day.endDate.toDate()) || null}`}
                        </div>
                        <div>{day.reason}</div>

                        <div>
                          {`In ${formatDistanceToNow(day.startDate.toDate())}`}
                        </div>
                        {/* <div>
                          {`For ${differenceInBusinessDays(
                            day.endDate.toDate(),
                            day.startDate.toDate()
                          )} days`}
                        </div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center lg:text-right text-sm font-medium">
                        <a
                          onClick={handler}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer px-3"
                        >
                          Edit
                        </a>
                        <Modal
                          closeButton
                          preventClose
                          aria-labelledby="modal-title"
                          open={visible}
                          onClose={closeHandler}
                        >
                          <Modal.Header>
                            <Text id="modal-title" size={18}>
                              Edit your Time
                            </Text>
                          </Modal.Header>
                          <Modal.Body>
                            <label htmlFor="start Date">New Start Date</label>
                            <DatePicker
                              id="startDate"
                              selected={newStartDate}
                              onChange={(date) => setNewStartDate(date)}
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
                            />
                            <label htmlFor="end date">New End Date</label>
                            <DatePicker
                              id="endDate"
                              selected={newEndDate}
                              onChange={(date) => setNewEndDate(date)}
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
                            />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              auto
                              flat
                              color="error"
                              onClick={closeHandler}
                            >
                              Close
                            </Button>
                            <Button auto onClick={() => closeAndUpdate(day.id)}>
                              Submit
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <a
                          onClick={() => handleDelete(day.id)}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
