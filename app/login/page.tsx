import Link from "next/link";

export default function Login() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-500">
          Login
        </h2>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <Link href="/chat">
            <button className="px-4 py-2 bg-violet-500 text-black text-xl font-bold rounded-lg text-center">
              Login
            </button>
          </Link>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <Link href="/signup">
            <button className="text-violet-500 hover:underline">Sign Up</button>
          </Link>
        </p>
      </div>
    </main>
  );
}
