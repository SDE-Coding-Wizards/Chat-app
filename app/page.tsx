import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="px-4 py-2 btn btn-neutral text-xl font-bold rounded-lg">Login</button>
        </Link>
        <Link href="/signUp">
          <button className="px-4 py-2 btn btn-neutral text-xl font-bold rounded-lg">Sign Up</button>
        </Link>
      </div>
    </main>
  );
}
