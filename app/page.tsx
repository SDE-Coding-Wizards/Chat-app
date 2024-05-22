import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="px-4 py-2 bg-violet-500 text-black text-xl font-bold rounded-lg">
            Login
          </button>
        </Link>
        <button className="px-4 py-2 bg-violet-500 text-black text-xl font-bold rounded-lg">
          Sign Up
        </button>
      </div>
    </main>
  );
}
