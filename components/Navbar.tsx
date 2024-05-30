import Link from "next/link";
import ThemeController from "./ThemeController";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-20 bg-base-200 border-b-2 border-base-300">
      <div className="flex items-center justify-center w-full">
        <Link href="/" className="font-bold text-3xl rounded-md">
          Chat Wizards
        </Link>
      </div>
      <div className="flex items-center">
        <ThemeController />
      </div>
    </nav>
  );
}
