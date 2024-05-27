"use client";

import Link from "next/link";
import { Chatroom } from "@/types/chatroom";
import { createChat } from "@/utils/createChat";
import { User } from "@/types";

interface ChatlistProps {
  chatrooms: Chatroom[];
  user: User;
  updateChatrooms?: (chatrooms: Chatroom[]) => void;
}

export default function Chatlist({
  chatrooms,
  user,
  updateChatrooms = () => {},
}: ChatlistProps) {
  async function newChat() {
    const newChatroom = await createChat(user);

    updateChatrooms([...chatrooms, newChatroom]);
  }

  return (
    <aside className="w-1/4 bg-base-200 p-4">
      <h2 className="text-lg font-bold mb-4">Recent Chats</h2>
      <div className="flex flex-col gap-4">
        {chatrooms.map((chatroom) => (
          <Link
            key={chatroom.uuid}
            href={`/chat/${chatroom.uuid}`}
            className="p-2 bg-base-300 rounded"
            // replace
            prefetch
          >
            {chatroom?.name ||
              chatroom.users?.map(({ firstname }) => firstname).join(", ")}
          </Link>
        ))}
      </div>

      <button onClick={newChat}>Create Chat</button>
    </aside>
  );
}
