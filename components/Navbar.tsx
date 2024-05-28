import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center h-16 bg-base-200 border-b-2 border-base-300">
      <Link href="/" className="font-bold text-3xl rounded-md px-3 py-2">
        Chat App
      </Link>
    </nav>
  );
}
