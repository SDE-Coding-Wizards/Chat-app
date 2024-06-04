"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "@/components/CreateGroupModal"; // Adjust the import path if necessary
import { getChatrooms } from "../app/(pages)/chat/[uuid]/functions/getChatrooms";
import { createChat, getUser } from "@/helpers";

export default function Chatlist() {
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState("");
  const [chatrooms, setChatrooms] = useState<chatroom[]>([]);

  async function fetchChatrooms() {
    const user = await getUser();
    if (!user) return;

    const chatrooms = await getChatrooms(user.uuid);

    setChatrooms(chatrooms);
  }

  useEffect(() => {
    fetchChatrooms();
  }, []);

  const openCreateGroupModal = () => {
    setCreateGroupModalOpen(true);
  };

  const closeCreateGroupModal = () => {
    setCreateGroupModalOpen(false);
    setGroupName("");
    setUsers("");
  };

  const handleCreateGroup = () => {
    console.log("Group Name:", groupName);
    console.log("Users:", users);

    closeCreateGroupModal();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 bg-base-200 fixed top-0 left-0 z-10"
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
      <aside
        className={`w-64 bg-base-200 p-4 fixed top-0 left-0 h-full z-20 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex justify-between text-lg font-bold">
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
              <h2 className="text-lg font-bold">Create Group</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Group Name (optional)
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Users</label>
                <input
                  type="text"
                  value={users}
                  onChange={(e) => setUsers(e.target.value)}
                  placeholder="Enter users"
                  className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button onClick={closeCreateGroupModal} className="p-2 mr-2">
                  Cancel
                </button>
                <button onClick={handleCreateGroup} className="p-2">
                  Create
                </button>
              </div>
            </div>
          </Modal>
        )}
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
