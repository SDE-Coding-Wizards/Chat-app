"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddFriend from "@/app/(pages)/friendTabs/AddFriend";

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
        className={`btn btn-outline  ${tab === "pending" && " btn-success"}`}
      >
        Pending
      </button>
      <button onClick={openAddFriendModal} className="btn btn-outline">
        Add Friend
      </button>

      <AddFriend isOpen={isAddFriendModalOpen} onClose={closeAddfriendModal} />
    </>
  );
}
