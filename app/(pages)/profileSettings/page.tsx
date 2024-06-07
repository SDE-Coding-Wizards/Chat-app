"use client";

import ProfilePic from "@/components/ProfilePic";
import { getUser } from "@/helpers";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setCookie } from "@/helpers/setCookie";
import { useRouter } from "next/navigation";

export default function ProfileSettings() {
  const router = useRouter();

  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  async function handleSignOut() {
    await signOut(auth);
    await setCookie("token", "");

    router.push("/login");
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <ProfilePic />
        <button className="btn btn-neutral mt-3">Change Picture</button>
      </div>
      <form className="flex flex-col items-start ml-5 mt-5">
        <label className="text-lg mt-5">First Name</label>
        <input
          type="text"
          id="firstName"
          className="input input-primary w-64"
          placeholder={user?.firstname || "First Name"}
        />
        <label className="text-lg mt-5">Last Name</label>
        <input
          type="text"
          id="lastName"
          className="input input-primary w-64"
          placeholder={user?.lastname || "Last Name"}
        />
        <label className="text-lg mt-5">Email</label>
        <input
          type="email"
          id="email"
          className="input input-primary w-64"
          placeholder={user?.email || "Email"}
        />
        <label className="text-lg mt-5">Password</label>
        <input
          type="password"
          id="password"
          className="input input-primary w-64"
          placeholder="Password"
        />
        <label className="text-lg mt-5">Bio</label>
        <div className="flex items-center">
          <textarea
            id="bio"
            className="textarea textarea-primary resize-none w-64 py-auto"
            placeholder="Tell us about yourself"
          />
        </div>
        <button className="btn mt-7 w-64">Save & Update</button>
        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-neutral mt-3 w-64"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
}
