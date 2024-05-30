"use client";

import { useState } from "react";
import Link from "next/link";

export default function Chat() {
    const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);

    const openCreateGroupModal = () => {
        setCreateGroupModalOpen(true);
    };

    const closeCreateGroupModal = () => {
        setCreateGroupModalOpen(false);
    };

    return (
        <main className="flex flex-col min-h-screen bg-base-100">
            <nav className="bg-base-200 w-full p-4 flex justify-around items-center shadow-lg">
                <a
                    href="#"
                    className="p-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
                >
                    Online
                </a>
                <a
                    href="#"
                    className="p-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
                >
                    All
                </a>
                <a
                    href="#"
                    className="p-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
                >
                    Pending
                </a>
                <a
                    href="#"
                    className="p-2 bg-base-300 rounded-md transition duration-300 ease-in-out transform hover:bg-base-400 active:bg-base-500 hover:scale-105"
                >
                    Add Friend
                </a>
            </nav>

            <div className="flex flex-1">
                <aside className="w-1/4 h-full bg-base-200 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Recent Chats</h2>
                        <button
                            onClick={openCreateGroupModal}
                            className="p-2 bg-base-200  rounded-md transition duration-300 ease-in-out transform"
                        >
                            Create Group
                        </button>
                    </div>
                    <ul className="space-y-2">
                        <li className="p-2 bg-base-300 rounded">
                            <Link href="/">Chat</Link>
                        </li>
                        <li className="p-2 bg-base-300 rounded">
                            <Link href="/">Chat</Link>
                        </li>
                        <li className="p-2 bg-base-300 rounded">
                            <Link href="/">Chat</Link>
                        </li>
                    </ul>
                </aside>
                <section className="flex-1 h-screen p-4">
                    <div className="flex flex-col h-full bg-base-100 border border-base-300 rounded-lg p-4">
                        <div className="flex-1">
                            <div className="mb-4 p-2 bg-base-300 rounded">Message</div>
                            <div className="mb-4 p-2 bg-base-300 rounded">Message</div>
                            <div className="mb-4 p-2 bg-base-300 rounded">Message</div>
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Type a message"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </section>
            </div>

            {isCreateGroupModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Create Group</h3>
                        <input
                            type="text"
                            placeholder="Group Name"
                            className="input input-bordered w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Add Friends (comma separated)"
                            className="input input-bordered w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={closeCreateGroupModal}
                                className="p-2 bg-red-500 text-white rounded-md transition duration-300 ease-in-out transform hover:bg-red-600 active:bg-red-700 hover:scale-105 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={closeCreateGroupModal}
                                className="p-2 bg-green-500 text-white rounded-md transition duration-300 ease-in-out transform hover:bg-green-600 active:bg-green-700 hover:scale-105"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}