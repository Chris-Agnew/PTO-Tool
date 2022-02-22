import { useState } from 'react'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './firebase/firebase'

const Edit = () => {
  const [newStartDate, setNewStartDate] = useState<string | Date>(new Date())
  const [newEndDate, setNewEndDate] = useState<string | Date>(new Date())
  const [user] = useAuthState(auth)

  const handleEdit = async (id: string) => {
    const docRef = doc(db, user!.uid, id)
    const payload = { startDate: newStartDate, endDate: newEndDate }
    setDoc(docRef, payload)
  }

  return (
    <div>
      <div>
        <label htmlFor="newDate"></label>
        <input
          type="datetime"
          name="newStartDate"
          id="newStartDate"
          onChange={(e) => setNewStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newEndDate"></label>
        <input
          type="datetime"
          name="newEndDate"
          id="newEndDate"
          onChange={(e) => setNewEndDate(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Edit
