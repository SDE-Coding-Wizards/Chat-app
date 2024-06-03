"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddFriend from "@/app/(pages)/friendTabs/AddFriend";

export default function NavTab() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <Link href={`/?search=pending`} passHref>
        <span
          className={`p-2 mx-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105 ${
            search === "pending" && "bg-green-400"
          }`}
        >
          Pending
        </span>
      </Link>
      <button
        onClick={openModal}
        className="p-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
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
      <AddFriend isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
}
