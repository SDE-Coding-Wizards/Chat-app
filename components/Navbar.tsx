"use client";

import Link from "next/link";
import ThemeController from "./ThemeController";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AddFriend from "@/app/(pages)/friendTabs/AddFriend";
import ProfilePic from "./ProfilePic";

export default function Navbar() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  const openAddFriendModal = () => setIsAddFriendModalOpen(true);
  const closeAddfriendModal = () => setIsAddFriendModalOpen(false);

  return (
    <nav className="border-b-2">
      <div className="flex items-center absolute left-6">
        <ThemeController />
      </div>
      <div className="flex items-center justify-center w-full">
        <Link href="/" className="font-bold text-3xl rounded-md">
          Chat Wizards
        </Link>
      </div>
      <div className="flex items-center absolute right-6">
        <Link href={`/chat/?tab=online`} passHref>
          <span
            className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${
              tab === "online" && "bg-green-400"
            }`}
          >
            Online
          </span>
        </Link>
        <Link href={`/chat/?tab=all`} passHref>
          <span
            className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${
              tab === "all" && "bg-green-400"
            }`}
          >
            All
          </span>
        </Link>
        <Link href={`/chat/?tab=pending`} passHref>
          <span
            className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${
              tab === "pending" && "bg-green-400"
            }`}
          >
            Pending
          </span>
        </Link>
        <button
          onClick={openAddFriendModal}
          className="p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
        >
          Add Friend
        </button>
        <Link href="/profileSettings" passHref>
          <span>
            <ProfilePic />
          </span>
        </Link>
        <AddFriend
          isOpen={isAddFriendModalOpen}
          onClose={closeAddfriendModal}
        />
      </div>
    </nav>
  );
}
