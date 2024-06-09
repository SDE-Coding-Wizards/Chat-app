import { notFound } from "next/navigation";
import { getUsers } from "@/functions";
import { Chatlist, Userlist } from "@/components";
import { createChat, getUser } from "@/helpers";
import { Online, Pending, All } from "@/components/friendTabs";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const users = await getUsers();

  return (
    <div className="flex ">
      <Chatlist />
      <Pending />
      <Online />
      <All />
      {/* <Userlist user={user} users={users} createChat={createChat} /> */}
    </div>
  );
}
