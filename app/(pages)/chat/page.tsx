import { notFound } from "next/navigation";
import { getChatrooms } from "./[uuid]/functions";
import { Chatlist, Userlist, NavTab } from "@/components";
import { User } from "@/types/user";
import { getPool } from "@/lib/server/database";
import { getUser } from "@/utils/getUser";
import { createChat } from "@/helpers/createChat";


export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const chatrooms = await getChatrooms(user.uuid);
  const users = await getAllUsers();

  return (
    <div>
      <NavTab />
      <Chatlist chatrooms={chatrooms} />
      {/* <Userlist user={user} users={users} createChat={createChat} /> */}
    </div>
  );
}

async function getAllUsers(): Promise<User[]> {
  const conn = await getPool();

  const users = await conn.query("SELECT * FROM users");

  await conn.release();

  return users;
}
