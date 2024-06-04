"use client";

import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { createChatParams } from "@/helpers/createChat";

interface UserlistProps {
  user: user;
  users: user[];
  createChat: createChatParams
}

export default function Userlist({ user, users, createChat }: UserlistProps) {
  const router = useRouter();

  return (
    <div>
      {users.map((usr) => {
        if (user.uuid === usr.uuid) return null;

        const fullName = `${usr.firstname || ""} ${usr.lastname || ""}`.trim();
        return (
          <div key={usr.uuid} className="flex gap-2">
            <p>
              {fullName || usr.email}
            </p>
            <button
              onClick={async () => {
                const newChatroom = await createChat(user, [usr]);

                router.push(`/chat/${newChatroom.uuid}`);
              }}
            >
              +
            </button>
          </div>
        );
      })}
    </div>
  );
}
