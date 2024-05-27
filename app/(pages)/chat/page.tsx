import { User } from "@/types/user";
import Chatlist from "./[uuid]/Chatlist";
import { getChatrooms } from "./[uuid]/page";
import { getClient } from "@/lib/server/database";
import Userlist from "./Userlist";
import { getUser } from "@/utils/getUser";
import { notFound } from "next/navigation";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();
  
  const chatrooms = await getChatrooms(user.uuid);
  const users = await getUsers();

  return (
    <div>
      <h1>Chat Page</h1>
      <Chatlist user={user} chatrooms={chatrooms} />
      <Userlist user={user} users={users} />
    </div>
  );
}

async function getUsers(): Promise<User[]> {
  const conn = await getClient();

  const users = await conn.query("SELECT * FROM users");

  await conn.end();

  return users;
}
