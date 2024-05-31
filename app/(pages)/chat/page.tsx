import { notFound } from "next/navigation";
import { getChatrooms } from "./[uuid]/functions";
import { Chatlist, Userlist, NavTab } from "@/components";
import { createChat, getUser } from "@/helpers";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const chatrooms = await getChatrooms(user.uuid);
  const users = await getAllUsers();

  return (
    <div>
      <NavTab />
      <Chatlist chatrooms={chatrooms} />
      <Userlist user={user} users={users} createChat={createChat} />
    </div>
  );
}

async function getAllUsers(): Promise<user[]> {
  const users: user[] = await pool.query("SELECT * FROM users");

  return users;
}
