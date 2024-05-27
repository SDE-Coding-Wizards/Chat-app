"use client";

import { User } from "@/types/user";
import { createChat } from "@/utils/createChat";
import { useRouter } from "next/navigation";

interface UserlistProps {
  user: User;
  users: User[];
}

export default function Userlist({ user, users }: UserlistProps) {
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
