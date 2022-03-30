import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../components/firebase/firebase'
import Image from 'next/image'
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../components/firebase/firebase'
import { FormEvent, useState } from 'react'
import { useEffect } from 'react'

const Profile = () => {
  const [user] = useAuthState(auth)
  let [craftblock, setCraftBlock] = useState<string>('')
  const [craftblockTitle, setCraftblockTitle] = useState<string>('')
  let [dayWorking, setDayWorking] = useState<string>('')
  const [dayWorkingTitle, setDayWorkingTitle] = useState<string>('')

  // useEffect(() => {
  //   const collectionRef = collection(db, 'users')
  //   const docRef = doc(collectionRef, user?.uid)
  //   getDoc(docRef).then((doc) => {
  //     setCraftblockTitle(doc.data()?.craftblock)
  //   })
  // }, [user?.uid, craftblockTitle])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', user!.uid), (doc) => {
      setCraftblockTitle(doc.data()?.craftblock)
      setDayWorkingTitle(doc.data()?.day)
    })
    return unsub
  }, [user])

  const update = async (e: FormEvent<EventTarget>) => {
    e.preventDefault()
    const collectionRef = collection(db, 'users')

    const name = user?.displayName
    const email = user?.email
    const uid = user?.uid
    craftblock ? craftblock : (craftblock = '')
    const day = dayWorking ? dayWorking : (dayWorking = '')
    const payload = { name, email, uid, craftblock, day }
    console.log(payload)

    await setDoc(doc(collectionRef, user!.uid), payload)
  }

  return (
    <div className="flex flex-col justify-center items-center pt-10 mt-10">
      <Image
        src={user?.photoURL as string}
        width={100}
        height={100}
        alt="profile photo"
        className="rounded-full"
      />

      <h2 className="mt-5">Name: {user?.displayName}</h2>
      <h2>Email: {user?.email}</h2>
      <h2>Craftblock: {craftblockTitle}</h2>
      <h2>Day Working: {dayWorkingTitle}</h2>
      <form
        className="my-10 flex flex-col justify-center items-center"
        onChange={(e) => setCraftBlock((e.target as HTMLSelectElement).value)}
      >
        <label htmlFor="craftblocks">Choose a craftblock:</label>
        <select name="craftblocks" id="craftblocks" className="text-center">
          <option value="-">-</option>
          <option value="Suspension">Suspension</option>
          <option value="Pre-Cab">Pre-Cab</option>
          <option value="Electrical">Electrical</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Finishing">Finishing</option>
          <option value="Exterior">Exterior</option>
          <option value="Welding">Welding & Fabrication</option>
          <option value="CNC">CNC</option>
          <option value="Battery">Battery</option>
          <option value="Configuration">Configuration</option>
          <option value="Engineering & Design">Engineering & Design</option>
          <option value="Accounting, Purchasing, and Finance">
            Accounting, Purchasing, and Finance
          </option>
          <option value="Client Service">Client Service</option>
          <option value="B-Box">B-Box</option>
          <option value="Sewing & Upholstery">Sewing & Upholstery</option>
          <option value="Leadership and Tech Support">
            Leadership & Tech Support
          </option>
          <option value="Front Desk">Front Desk</option>
        </select>
      </form>
      <form
        className="my-10 flex flex-col justify-center items-center"
        onChange={(e) => setDayWorking((e.target as HTMLSelectElement).value)}
      >
        <label htmlFor="4dayWorkWeek">
          Choose the day you&apos;re working:
        </label>
        <select name="4dayWorkWeek" id="4dayWorkWeek" className="text-center">
          <option value="-">-</option>
          <option value="Monday">Monday</option>
          <option value="Friday">Friday</option>
        </select>
      </form>
      <div className="flex justify-center items-center">
        <button
          className="p-5 my-5 ml-10 bg-yellow-500 rounded-md text-center"
          onClick={update}
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default Profile
