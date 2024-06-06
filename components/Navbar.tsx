import Link from "next/link";
import ThemeController from "./ThemeController";
import ProfilePic from "./ProfilePic";
import NavButtons from "./NavButtons";
import { getUser } from "@/helpers";

export default async function Navbar() {
  const user = await getUser();

  return (
    <>
      <nav className="border-b-2">
        <div className="flex items-center absolute left-6">
          <ThemeController />
        </div>
        <div className="flex items-center justify-center w-full">
          <Link href="/" className="font-bold text-3xl rounded-md">
            Chat Wizards
          </Link>
        </div>
        <div className="flex items-center absolute gap-3 right-6">
          <NavButtons />
          <Link href="/profileSettings" passHref>
            <ProfilePic initialUser={user} />
          </Link>
        </div>
      </nav>
    </>
  );
}
