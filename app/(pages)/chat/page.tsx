import { notFound } from "next/navigation";
import { getChatrooms, getUsers } from "./[uuid]/functions";
import { Chatlist, Userlist, NavTab } from "@/components";
import { createChat, getUser } from "@/helpers";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const chatrooms = await getChatrooms(user.uuid);
  const users = await getUsers();

  return (
    <div>
      <NavTab />
      <Chatlist chatrooms={chatrooms} />
      <Userlist user={user} users={users} createChat={createChat} />
    </div>
  );
}
