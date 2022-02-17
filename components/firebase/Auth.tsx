import { createContext, useContext, useEffect, useState } from 'react'
const AuthContext = createContext({})
import { getAuth } from 'firebase/auth'
import GoogleButton from 'react-google-button'
import { signInWithGoogle } from './firebase'
import Loading from './Loading'

interface userData {
  displayName: string
  email: string
  photoURL: string
  uid: string
}

export const AuthProvider: React.FC<userData> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log('no user')
        setCurrentUser(null)
        setLoading(false)
        return
      }
      const token = await user.getIdToken()
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center">
        <GoogleButton onClick={signInWithGoogle} />
      </div>
    )
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    )
  }
}
export const useAuth = () => useContext(AuthContext)
