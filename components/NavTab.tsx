"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddFriend from "@/app/(pages)/friendTabs/AddFriend";
import Pending from "@/app/(pages)/friendTabs/Pending";
import { on } from "events";

const dummyRequests = [
  { id: 1, email: "example1@mail.com" },
  { id: 2, email: "example2@mail.com" },
];

export default function NavTab() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);

  const openAddFriendModal = () => setIsAddFriendModalOpen(true);
  const closeAddfriendModal = () => setIsAddFriendModalOpen(false);

  const openPendingModal = () => setIsPendingModalOpen(true);
  const closePendingModal = () => setIsPendingModalOpen(false);

  const handleAccept = (id: number) => {
    console.log(`Accepted request with id: ${id}`);
    //Accept logic ↓↓
  };

  const handleReject = (id: number) => {
    console.log(`Rejected request with id: ${id}`);
    // Reject logic ↓↓
  };

  return (
    <nav className="bg-base-200 w-full p-4 flex justify-end items-center shadow-lg">
      <Link href={`/?search=online`} passHref>
        <span
          className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${
            search === "online" && "bg-green-400"
          }`}
        >
          Online
        </span>
      </Link>
      <Link href={`/?search=all`} passHref>
        <span
          className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${
            search === "all" && "bg-green-400"
          }`}
        >
          All
        </span>
      </Link>
      <button
        onClick={openPendingModal}
        className="p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
      >
        Pending
      </button>
      <button
        onClick={openAddFriendModal}
        className="p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
      >
        Add Friend
      </button>
      <Link href="/profileSettings" passHref>
        <span>
          <Image
            className="rounded-3xl mx-2"
            src="/default.webp"
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </span>
      </Link>
      <AddFriend isOpen={isAddFriendModalOpen} onClose={closeAddfriendModal} />
      <Pending
        isOpen={isPendingModalOpen}
        onClose={closePendingModal}
        requests={dummyRequests}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </nav>
  );
}
