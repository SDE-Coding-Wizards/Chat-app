import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-4 p-6">
      <div className="text-center mb-4">
        {/* <Image
          src="/chatlogo.webp"
          alt="Chat App Logo"
          className="w-24 mx-auto mb-2 rounded-full"
        /> */}
        <h1 className="text-2xl font-bold">Welcome to ChatWizards!</h1>
        <p className="text-base-content">
          Your place to connect with your homies.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Link href="/login" legacyBehavior>
            <a className="btn btn-neutral text-xl font-bold">Login</a>
          </Link>
          <Link href="/signUp" legacyBehavior>
            <a className="btn btn-neutral text-xl font-bold">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
