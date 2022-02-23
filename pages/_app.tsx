import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../components/firebase/firebase'
import { AuthProvider } from '../components/firebase/Auth'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth)
  return (
    <div className="font-nunito">
      <AuthProvider>
        <Navbar user={user} />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default MyApp
