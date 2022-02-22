import { useEffect } from 'react'
import { SignInWithGoogle } from '../components/firebase/firebase'
import Image from 'next/image'
import GoogleButton from 'react-google-button'
import { colRef } from '../components/firebase/firebase'
import { getDocs } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setDaysOff } from '../features/days/daysSlice'

export default function Home(): JSX.Element {
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
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
        <Image
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="/images/pto.jpg"
          height={600}
          width={600}
        />
        <div className="text-center lg:w-2/3 w-full">
          <p className="mb-20 leading-relaxed">
            Welcome to the ARV PTO Tool. Please sign in below to add your time
            off. Please refer to the PTO policy for more information. if you
            have an issues with the tool please contact Chris A.
          </p>
          <div className="flex justify-center items-center">
            <GoogleButton onClick={SignInWithGoogle} />
          </div>
        </div>
      </div>
    </section>
  )
}
