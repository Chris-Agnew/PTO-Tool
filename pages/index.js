import {
  signInWithGoogle,
  googleSignOut,
} from "../components/firebase/firebase";
import Image from "next/image";
import GoogleButton from "react-google-button";

export default function Home() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <Image
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="/images/arv-pto.jpg"
          height={600}
          width={600}
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Welcome to the ARV PTO Tool
          </h1>
          <p className="mb-8 leading-relaxed">
            Sign in Below to add your time off
          </p>
          <div className="flex justify-center">
            <GoogleButton onClick={signInWithGoogle} />
          </div>
        </div>
      </div>
    </section>
  );
}
