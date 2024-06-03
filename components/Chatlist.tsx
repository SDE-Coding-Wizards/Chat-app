"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/CreateGroupModal"; // Adjust the import path if necessary
import { getChatrooms } from "../app/(pages)/chat/[uuid]/functions/getChatrooms";
import { auth } from "@/firebase";

export default function Chatlist() {
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState("");
  const [chatrooms, setChatrooms] = useState<chatroom[]>([]);
  const [user, setUser] = useState<user | null | any>(null);

  auth.onAuthStateChanged(setUser as any);

  useEffect(() => {
    if (!user) return;

    getChatrooms(user.uid).then(setChatrooms);
  }, [user]);

  const openCreateGroupModal = () => {
    setCreateGroupModalOpen(true);
  };

  const closeCreateGroupModal = () => {
    setCreateGroupModalOpen(false);
    setGroupName("");
    setUsers("");
  };

  const handleCreateGroup = () => {
    // Handle the creation of the group here (e.g., call an API)
    console.log("Group Name:", groupName);
    console.log("Users:", users);

    // Close the modal after creation
    closeCreateGroupModal();
  };

  return (
    <aside className="w-1/4 bg-base-200 p-4">
      <div className="flex justify-between text-lg font-bold">
        <h2 className="mb-4">Recent Chats</h2>
        <button onClick={openCreateGroupModal} className="mb-5">
          Create Group
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {chatrooms.map((chatroom) => (
          <Link
            key={chatroom.uuid}
            href={`/chat/${chatroom.uuid}`}
            className="p-2 bg-base-300 rounded"
            prefetch
          >
            {chatroom?.name ||
              chatroom.chatroom_members
                ?.map(({ user: { firstname, email } }) => firstname || email)
                .join(", ")}
          </Link>
        ))}
      </div>
      {isCreateGroupModalOpen && (
        <Modal onClose={closeCreateGroupModal}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Create Group</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Group Name (optional)
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none  sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Users</label>
              <input
                type="text"
                value={users}
                onChange={(e) => setUsers(e.target.value)}
                placeholder="Enter users"
                className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={closeCreateGroupModal} className="p-2  mr-2">
                Cancel
              </button>
              <button onClick={handleCreateGroup} className="p-2 ">
                Create
              </button>
            </div>
          </div>
        </Modal>
      )}
    </aside>
  );
}
