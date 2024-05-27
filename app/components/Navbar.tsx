import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-16 px-6 bg-base-200 shadow-md flex items-center justify-center border-b-2">
      <div className="items-center justify-between">
        <Link href="/" className="font-bold text-3xl rounded-md px-3 py-2">
          Chat App
        </Link>
      </div>
    </nav>
  );
}
