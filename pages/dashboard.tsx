import DashboardInfo from '../components/dashboard/DashboardInfo'
import Calendar from '../components/Calendar'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  where,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore'
import Table from '../components/dashboard/table/Table'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, colRef, db } from '../components/firebase/firebase'
import { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { selectDays, setDaysOff } from '../features/days/daysSlice'

const Dashboard: NextPage = () => {
  const [days, setDays] = useState<any | null>([])
  const [user] = useAuthState(auth)
  // useEffect(() => {
  // const collectionRef = collection(db, user!.uid)
  // const q = query(collectionRef, where('uid', '==', user!.uid))
  // const qAll = query(collectionRef, orderBy("createdAt", "desc"));

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     setDays(
  //       querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //         timestamp: serverTimestamp(),
  //       }))
  //     )
  //   })
  //   console.log('time off has been added')
  //   return unsubscribe
  // }, [user])

  // getDocs(colRef).then((snapshot) => {
  //   let users: object[] = []
  //   snapshot.docs.forEach((doc) => {
  //     users.push({ ...doc.data(), id: doc.id })
  //   })
  //   console.log(users)
  // })

  const dispatch = useDispatch()

  useEffect(() => {
    getDocs(colRef).then((snapshot: any) => {
      let days = snapshot.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() }
      })
      console.log(days)
      dispatch(setDaysOff(days))
    })
  }, [dispatch])
  console.log()

  const daysRedux = useSelector(selectDays)
  console.log(daysRedux)

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto text-center">
        <DashboardInfo />
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
      </div>
      <Calendar />
      <Table days={daysRedux} />
      {daysRedux &&
        daysRedux.map((day: any) => {
          return <div key={day.id}>{day.name}</div>
        })}
    </section>
  )
}

export default Dashboard
