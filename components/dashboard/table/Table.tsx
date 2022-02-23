import Image from 'next/image'
import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatDuration,
  subHours,
  getUnixTime,
} from 'date-fns'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase/firebase'
import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { getTime } from 'date-fns'

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
    }
  ]
}

const Table = ({ days }: day) => {
  console.log(days)
  const [user] = useAuthState(auth)
  const [newStartDate, setNewStartDate] = useState<string | Date>()
  const [newEndDate, setNewEndDate] = useState<string | Date>()

  const handleDelete = async (id: string) => {
    const docRef = doc(db, 'days', id)
    await deleteDoc(docRef)
  }

  const handleEdit = async (id: string) => {
    const docRef = doc(db, 'days', id)
    const payload = { startDate: newStartDate, endDate: newEndDate }
    setDoc(docRef, payload)
  }

  const formatDate = (date: string | number | Date) => {
    return format(new Date(date), 'MM-dd-yyyy h:mm a')
  }
  const formatTimestamp = (timestamp: Date) => {
    return getTime(timestamp)
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {days.map((day) => (
                  <tr key={day.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={day && day.image}
                            height={50}
                            width={50}
                            alt="employee image"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {day.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {day.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {/* // convert firestore timestamp to time and date */}
                        {`${formatDate(day.startDate.toDate())} -
                        ${formatDate(day.endDate.toDate())}`}
                      </div>
                      <div>
                        {`For ${formatDistance(
                          day.startDate.toDate(),
                          day.endDate.toDate()
                        )}`}
                      </div>
                      <div>
                        {`In ${formatDistanceToNow(day.startDate.toDate())}`}
                      </div>
                      {/* <div>{() => timeOff(distance)}</div> */}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        onClick={() => handleEdit(day.id)}
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer px-3"
                      >
                        Edit
                      </a>
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
