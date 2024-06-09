import { notFound } from "next/navigation";
import { getChatrooms, getUsers } from "@/functions";
import { Chatlist } from "@/components";
import { Online, Pending, All } from "@/components/friendTabs";
import { getUser } from "@/helpers";

export default async function ChatPage() {
  const user = await getUser();

  if (!user) return notFound();

  const chatrooms = await getChatrooms(user.uuid);
  const friendsOnline = await getUsers()

  return (
    <div className="flex h-full">
      <Chatlist initialChatrooms={chatrooms} />
      <Pending />
      <Online initialUsers={friendsOnline} />
      <All />
    </div>
  );
}
