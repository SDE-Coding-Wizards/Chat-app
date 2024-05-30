"use client";

import Link from "next/link";
import { Chatroom } from "@/types";

interface ChatlistProps {
  chatrooms: Chatroom[];
}

export default function Chatlist({ chatrooms }: ChatlistProps) {
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
              chatroom.users
                ?.map(({ firstname, email }) => firstname || email)
                .join(", ")}
          </Link>
        ))}
      </div>
    </aside>
  );
}
