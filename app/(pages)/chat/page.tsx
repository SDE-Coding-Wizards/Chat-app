import { notFound } from "next/navigation";
import { getUsers } from "../../../functions";
import { Chatlist, Userlist } from "@/components";
import { createChat, getUser } from "@/helpers";
import Online from "../../../components/friendTabs/Online";
import Pending from "@/components/friendTabs/Pending";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const users = await getUsers();

  return (
    <div className="flex ">
      <Chatlist />
      <Pending />
      <Online />
      {/* <Userlist user={user} users={users} createChat={createChat} /> */}
    </div>
  );
}
