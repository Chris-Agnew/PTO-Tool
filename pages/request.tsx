import { useState } from 'react'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../components/firebase/firebase'
import { db } from '../components/firebase/firebase'
import { format } from 'date-fns'

const Request = () => {
  const [startDate, setStartDate] = useState(
    format(new Date(), 'MM-dd-yyyy HH[:]mm')
  )
  const [endDate, setEndDate] = useState(
    format(new Date(), 'MM-dd-yyyy HH[:]mm')
  )
  const [user] = useAuthState(auth)
  const [added, setAdded] = useState(false)

  const handleSubmit = async () => {
    const collectionRef = collection(db, 'days')
    const name = user?.displayName
    const image = user?.photoURL
    const email = user?.email
    const uid = user?.uid

    const payload = { name, image, email, startDate, endDate, uid }
    await addDoc(collectionRef, payload)
    setAdded(true)
    console.log(payload)
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="start Date">Start Date</label>
        <input
          type="datetime-local"
          placeholder="start date"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="end Date">End Date</label>

        <input
          type="datetime-local"
          placeholder="end date"
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 my-5 bg-yellow-500 rounded-md"
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
