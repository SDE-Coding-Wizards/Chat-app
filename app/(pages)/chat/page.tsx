import { notFound } from "next/navigation";
import { getUsers } from "../../../functions";
import { Chatlist, Userlist } from "@/components";
import { createChat, getUser } from "@/helpers";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const users = await getUsers();

  return (
    <div>
      <Chatlist />
      {/* <Userlist user={user} users={users} createChat={createChat} /> */}
    </div>
  );
}
