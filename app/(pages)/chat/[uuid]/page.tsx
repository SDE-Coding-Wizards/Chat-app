import { getUser } from "@/helpers/getUser";
import { notFound } from "next/navigation";
import {
  getChatrooms,
  getEncryptedChatKey,
  getMessages,
  sendMessage,
} from "@/functions";
import ChatViewer from "./ChatViewer";
import ChatInput from "./ChatInput";
import { Chatlist } from "@/components";
import MembersList from "@/components/MembersList";
import { Trash2 } from 'lucide-react';
import DeleteGroup from "@/components/DeleteGroup";

interface ChatProps {
  params: { uuid: UUID };
}

export default async function Chat({ params: { uuid } }: ChatProps) {
  const user = await getUser();

  if (!user) return notFound();

  const chatrooms = await getChatrooms(user.uuid);
  const messages = await getMessages(uuid);
  const encryptedChatKey = await getEncryptedChatKey(uuid, user.uuid);

  if (!encryptedChatKey) return notFound();

  const chatroom = chatrooms.find(({ uuid: chatUuid }) => chatUuid === uuid);

  if (!chatroom) return notFound();

  const groupName = chatroom.name || "Group Chat";

  return (
    <div className="flex bg-base-100 h-full">
      <Chatlist initialChatrooms={chatrooms} />

      <section className="flex flex-col w-full h-full p-4 gap-4">
        <div className="flex">
          <header className="text-2xl font-bold mb-4 pr-3">{groupName}</header>
          <div className="pt-1">
            <DeleteGroup uuid={uuid} />
          </div>
        </div>


        <ChatViewer
          chatroom_uuid={uuid}
          chatKey={encryptedChatKey}
          initialMessages={messages}
          user={user}
        />

        <ChatInput
          chatroom_uuid={uuid}
          user={user}
          sendMessage={sendMessage}
          initialMessages={messages}
          encryptedChatKey={encryptedChatKey}
        />
      </section>

      <MembersList members={chatroom.chatroom_members} />
    </div>
  );
}
