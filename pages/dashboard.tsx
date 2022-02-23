import DashboardInfo from '../components/dashboard/DashboardInfo'
import Calendar from '../components/Calendar'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore'
import Table from '../components/dashboard/table/Table'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, colRef, db } from '../components/firebase/firebase'
import { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const [days, setDays] = useState<any>([])
  const [user] = useAuthState(auth)
  useEffect(() => {
    const collectionRef = collection(db, 'days')
    const q = query(collectionRef)
    const qAll = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setDays(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: serverTimestamp(),
        }))
      )
    })
    console.log('time off has been added')
    return unsubscribe
  }, [user])

  // getDocs(colRef).then((snapshot) => {
  //   let users: object[] = []
  //   snapshot.docs.forEach((doc) => {
  //     users.push({ ...doc.data(), id: doc.id })
  //   })
  //   console.log(users)
  // })

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto text-center">
        <DashboardInfo days={days} />
      </div>
      <Calendar />
      <Table days={days} />
    </section>
  )
}

export default Dashboard
