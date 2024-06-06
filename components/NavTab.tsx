"use client";
import { useState } from "react";
import Image from "next/image";
import AddFriend from "@/app/(pages)/friendTabs/AddFriend";
import OnlineUsers from "@/app/(pages)/friendTabs/Online";
import AllUsers from "@/app/(pages)/friendTabs/All";
import PendingUsers from "@/app/(pages)/friendTabs/Pending";

export default function NavTab() {
  const [activeTab, setActiveTab] = useState(null);
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);

  const openAddFriendModal = () => setIsAddFriendModalOpen(true);
  const closeAddFriendModal = () => setIsAddFriendModalOpen(false);

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null); // Toggle active tab if clicked again
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <nav className="bg-base-200 w-full p-4 flex justify-end items-center shadow-lg">
        <span
          className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${activeTab === "Online" && "bg-green-400"
            }`}
          onClick={() => handleTabClick("Online")}
        >
          Online
        </span>
        <span
          className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${activeTab === "All" && "bg-green-400"
            }`}
          onClick={() => handleTabClick("All")}
        >
          All
        </span>
        <span
          className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${activeTab === "Pending" && "bg-green-400"
            }`}
          onClick={() => handleTabClick("Pending")}
        >
          Pending
        </span>
        <button
          onClick={openAddFriendModal}
          className="p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
        >
          Add Friend
        </button>
        <span>
          <Image
            className="rounded-3xl mx-2"
            src="/default.webp"
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </span>
        <AddFriend isOpen={isAddFriendModalOpen} onClose={closeAddFriendModal} />
      </nav>
      <div className="p-4">
        {activeTab === "Online" && <OnlineUsers />}
        {activeTab === "All" && <AllUsers />}
        {activeTab === "Pending" && <PendingUsers />}
      </div>
    </>
  );
}
