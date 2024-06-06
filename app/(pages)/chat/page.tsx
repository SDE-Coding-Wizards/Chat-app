import { notFound } from "next/navigation";
import { getUsers } from "../../../functions";
import { Chatlist, Userlist } from "@/components";
import { createChat, getUser } from "@/helpers";
import Online from "../friendTabs/Online";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const users = await getUsers();

  return (
    <div className="flex ">
      <Chatlist />
      <Online />
      {/* <Userlist user={user} users={users} createChat={createChat} /> */}
    </div>
  );
}
