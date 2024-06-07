"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddFriend from "@/components/friendTabs/AddFriend";

export default function NavButtons() {
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
      <button
        onClick={() => handleTabChange("online")}
        className={`btn btn-outline ${tab === "online" && " btn-success"} p-1 sm:p-2 text-sm sm:text-base`}
      >
        Online
      </button>
      <button
        onClick={() => handleTabChange("all")}
        className={`btn btn-outline ${tab === "all" && " btn-success"} p-1 sm:p-2 text-sm sm:text-base`}
      >
        All
      </button>
      <button
        onClick={() => handleTabChange("pending")}
        className={`btn btn-outline ${tab === "pending" && " btn-success"} p-1 sm:p-2 text-sm sm:text-base`}
      >
        Pending
      </button>
      <button
        onClick={openAddFriendModal}
        className="btn btn-outline p-1 sm:p-2 text-sm sm:text-base"
      >
        Add Friend
      </button>

      <AddFriend isOpen={isAddFriendModalOpen} onClose={closeAddfriendModal} />
    </>
  );
}
