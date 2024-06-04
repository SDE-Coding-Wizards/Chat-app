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
  const [users, setUsers] = useState<user[]>([]);
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
    setUsers([]);
  };

  const handleCreateGroup = async () => {
    const user = await getUser()
    if (!user) return;

    await createChat(user, users, groupName);

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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
                value={users.join(", ")}
                onChange={(e) =>
                  setUsers([...users, e.target.value as unknown as user])
                }
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
