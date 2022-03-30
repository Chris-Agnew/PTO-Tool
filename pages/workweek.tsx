import {
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../components/firebase/firebase'

const Workweek = () => {
  const [user] = useAuthState(auth)
  const [users, setUsers] = useState<any>([])
  useEffect(() => {
    const collectionRefAll = collection(db, 'users')

    // const qAll = query(collectionRefAll, orderBy('startDate', 'asc'))

    const unsubscribeAll = onSnapshot(collectionRefAll, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: serverTimestamp(),
        }))
      )
    })
    return unsubscribeAll
  }, [])
  console.log(users)
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Craftblock
              </th>
              <th scope="col" className="px-6 py-3">
                Day working
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user: any) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={user.uid}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.craftblock}</td>
                  <td className="px-6 py-4">{user.day}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Workweek
