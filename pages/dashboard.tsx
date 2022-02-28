import DashboardInfo from '../components/dashboard/DashboardInfo'
import Calendar from '../components/Calendar'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  orderBy,
  where,
} from 'firebase/firestore'
import Table from '../components/dashboard/table/Table'
import TableAll from '../components/dashboard/table/TableAll'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, colRef, db } from '../components/firebase/firebase'
import { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const [allDays, setAllDays] = useState<any>([])
  const [days, setDays] = useState<any>([])
  const [user] = useAuthState(auth)
  useEffect(() => {
    const collectionRefAll = collection(db, 'days')

    const qAll = query(
      collectionRefAll,
      where('startDate', '>', new Date()),
      orderBy('startDate', 'asc')
    )

    const unsubscribeAll = onSnapshot(qAll, (querySnapshot) => {
      setAllDays(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: serverTimestamp(),
        }))
      )
    })
    console.log('time off has been added')
    return unsubscribeAll
  }, [])

  useEffect(() => {
    const collectionRef = collection(db, user!.uid)
    const q = query(collectionRef, orderBy('startDate', 'asc'))

    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      setDays(
        querySnapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: serverTimestamp(),
        }))
      )
    })
    return unsubscribe
  }, [user])

  console.log(days)
  console.log(allDays)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto text-center">
        <DashboardInfo days={days} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl my-5">Upcoming Days Off:</h2>
        <TableAll days={allDays} />
      </div>

      <div className="mt-28">
        <h2 className="text-4xl my-5 text-center">Your Days Off:</h2>
        <Table days={days} />
      </div>
    </section>
  )
}

export default Dashboard
