import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full h-full items-center justify-center gap-4">
      <Link href="/login" className="btn btn-neutral text-xl font-bold">
        Login
      </Link>
      <Link href="/signUp" className="btn btn-neutral text-xl font-bold">
        Sign Up
      </Link>
    </div>
  );
}
