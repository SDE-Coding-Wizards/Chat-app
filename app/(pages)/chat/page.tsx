import { notFound } from "next/navigation";
import { getUsers } from "./[uuid]/functions";
import { Chatlist, Userlist, NavTab } from "@/components";
import { createChat, getUser } from "@/helpers";

const user = {
  uuid: "3542f069-1c4e-11ef-bed0-d8bbc19f5f53"
} as unknown as user

export default async function ChatPage() {
  // const user = await getUser();

  // if (!user) return notFound();



  const users = await getUsers();

  return (
    <div>
      <NavTab />
      <Chatlist />
      <Userlist user={user} users={users} createChat={createChat} />
    </div>
  );
}
