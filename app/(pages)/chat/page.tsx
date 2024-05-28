import { User } from "@/types/user";
import Chatlist from "../../../components/Chatlist";
import { getChatrooms } from "./[uuid]/page";
// import { getClient } from "@/lib/server/database";
import { getPool } from "@/lib/server/database";
import Userlist from "./Userlist";
import { getUser } from "@/utils/getUser";
import { notFound } from "next/navigation";
import { createChat } from "@/utils/createChat";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const chatrooms = await getChatrooms(user.uuid);
  const users = await getUsers();

  return (
    <div>
      <Chatlist chatrooms={chatrooms} />
      <Userlist user={user} users={users} createChat={createChat} />
    </div>
  );
}

async function getUsers(): Promise<User[]> {
  const conn = await getPool();

  const users = await conn.query("SELECT * FROM users");

  await conn.end();

  return users;
}
