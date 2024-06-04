import Link from "next/link";
import ThemeController from "./ThemeController";

export default function Navbar() {
  return (
    <nav className="border-b-2">
      <div className="flex items-center justify-center w-full">
        <Link href="/" className="font-bold text-3xl rounded-md">
          Chat Wizards
        </Link>
      </div>
      <div className="flex items-center absolute end-5">
        <ThemeController />
      </div>
    </nav>
  );
}
