"use client";

import Link from "next/link";
import ThemeController from "./ThemeController";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import AddFriend from "@/app/(pages)/friendTabs/AddFriend";
import ProfilePic from "./ProfilePic";
import Online from "@/app/(pages)/friendTabs/Online";

export default function Navbar() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const router = useRouter();

  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  const openAddFriendModal = () => setIsAddFriendModalOpen(true);
  const closeAddfriendModal = () => setIsAddFriendModalOpen(false);

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/chat/?${params.toString()}`);
  };

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
          <button
            onClick={() => handleTabChange("online")}
            className={`btn btn-outline ${tab === "online" && " btn-success"}`}
          >
            Online
          </button>
          <button
            onClick={() => handleTabChange("All")}
            className={`btn btn-outline ${tab === "all" && " btn-success"}`}
          >
            All
          </button>
          <button
            onClick={() => handleTabChange("pending")}
            className={`btn btn-outline  ${
              tab === "pending" && " btn-success"
            }`}
          >
            Pending
          </button>
          <button onClick={openAddFriendModal} className="btn btn-outline">
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
    </>
  );
}
