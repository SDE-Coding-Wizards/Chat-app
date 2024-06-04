"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Modal from "@/components/CreateGroupModal"; // Adjust the import path if necessary
import { getChatrooms } from "../app/(pages)/chat/[uuid]/functions/getChatrooms";
import { createChat, getUser } from "@/helpers";
import { X } from "lucide-react";

export default function Chatlist() {
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState("");
  const [chatrooms, setChatrooms] = useState<chatroom[]>([]);
  const [user, setUser] = useState<user | null>(null);

  const createGroupRef = useRef<HTMLDialogElement>(null);

  async function fetchChatrooms() {
    const fetchUser = await getUser();
    if (!fetchUser) return;

    setUser(fetchUser);

    const chatrooms = await getChatrooms(fetchUser.uuid);

    setChatrooms(chatrooms);
  }

  useEffect(() => {
    fetchChatrooms();
  }, []);

  const openCreateGroupModal = () => {
    setCreateGroupModalOpen(true);
    createGroupRef.current!.showModal();
  };

  const closeCreateGroupModal = () => {
    setCreateGroupModalOpen(false);
    setGroupName("");
    setUsers("");
  };

  const handleCreateGroup = () => {
    if (!user) return;

    createChat(user, [], groupName);

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
        <dialog id="my_modal_2" className="modal" ref={createGroupRef}>
          <div className="modal-box bg-base-200">
            <h3 className="font-bold text-lg">Create Group</h3>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateGroup();
              }}
            >
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Group Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Users</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter users"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </form>

            <div className="flex w-full justify-end gap-5 p-5">
              <button
                className="btn btn-primary btn-sm btn-circle absolute top-4 right-4"
                onClick={() => {
                  createGroupRef.current!.close();
                }}
              >
                <X />
              </button>

              <button className="btn btn-primary" onClick={handleCreateGroup}>
                Create
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  createGroupRef.current!.close();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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
