import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../components/firebase/firebase'
import Image from 'next/image'

const Profile = () => {
  const [user] = useAuthState(auth)

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <Image
        src={user?.photoURL as string}
        width={200}
        height={200}
        alt="profile Photo"
        className="rounded-full "
      />

      <h2 className="mt-5">Name: {user?.displayName}</h2>
      <h2>Email: {user?.email}</h2>
      <form className="my-10">
        <label htmlFor="craftblocks">Choose a craftblock:</label>
        <select name="craftblocks" id="craftblocks">
          <option value="suspension">Suspension</option>
          <option value="pre-cab">Pre-Cab</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="finishing">Finishing</option>
          <option value="exterior">Exterior</option>
          <option value="welding">Welding & Fabrication</option>
          <option value="cnc">CNC</option>
          <option value="battery">Battery</option>
          <option value="configuration">Configuration</option>
          <option value="engineering">Engineering & Design</option>
          <option value="accounting">
            Accounting, purchasing, and finance
          </option>
          <option value="client">Client Service</option>
          <option value="bbox">B-Box</option>
          <option value="upholstery">Sewing & upholstery</option>
          <option value="leadership">Leadership & Tech Support</option>
          <option value="phones">Front Desk</option>
        </select>
      </form>
    </div>
  )
}

export default Profile
