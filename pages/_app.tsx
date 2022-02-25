import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../components/firebase/firebase'
import { AuthProvider } from '../components/firebase/Auth'
import { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth)
  return (
    <div className="font-nunito">
      <NextUIProvider>
        <AuthProvider>
          <Navbar user={user} />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </NextUIProvider>
    </div>
  )
}

export default MyApp
