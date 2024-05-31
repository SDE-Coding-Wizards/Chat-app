"use client";

import { useState } from "react";
import { decryptMessage, encryptMessage } from "@/utils/symmetric";
import { useChatKey } from "@/hooks/useChatKey";
import { Message, MessageWithLoading, Chatroom, User } from "@/types";
import { Chatlist, MessagesEnd } from "@/components";
import { v4 as uuidv4 } from "uuid";
import { useWebsocket } from "@/hooks/useWebsocket";
import { ChatRenderer } from "@/components/chatroom/chatRenderer";
import { ContentType } from "@/types/content";

interface ClientProps {
  chatroom_uuid: Chatroom["uuid"];
  user: User;
  sendMessage: (
    uuid: string,
    message: Message,
    chatroom_uuid: Chatroom["uuid"],
    author_uuid: User["uuid"]
  ) => Promise<Message>;
  initialMessages: Message[];
  initialChatrooms: Chatroom[];
  encryptedChatKey: string;
}

export default function Client({
  chatroom_uuid,
  user,
  sendMessage,
  initialMessages,
  initialChatrooms,
  encryptedChatKey,
}: ClientProps) {
  const [messages, setMessages] =
    useState<MessageWithLoading[]>(initialMessages);
  const [chatrooms, setChatrooms] = useState<Chatroom[]>(initialChatrooms);
  const [socket, connected] = useWebsocket("/chat", {
    events: { "receive-message": updateList },
    room: chatroom_uuid,
  });

  const chatKey = useChatKey(encryptedChatKey, user);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("message_content") as string;

    const isEmoji = content.match(/:[a-z_]+:/g);
    const contentTypeId: number =
      isEmoji && content.length >= 3 ? ContentType.EMOJI : ContentType.TEXT;

    e.currentTarget.reset();

    if (!content.trim()) return;

    const uuid = uuidv4();

    setMessages([
      ...messages,
      {
        uuid,
        content: { content, content_type_id: contentTypeId },
        isLoading: true,
      } as MessageWithLoading,
    ]);

    const encryptedMessage = encryptMessage(content, chatKey) as Message;

    const newMessage = await sendMessage(
      uuid,
      encryptedMessage,
      chatroom_uuid,
      user.uuid
    );

    socket.emit("send-message", newMessage);
  }

  function updateList(newMessage: Message) {
    setMessages((prev) => {
      let newList = [...prev];

      newList = newList.filter(({ uuid }) => uuid != newMessage.uuid);
      newList.push(newMessage);

      return newList;
    });
  }

  return (
    <div className="flex bg-base-100 h-full">
      <Chatlist chatrooms={chatrooms} />
      <section className="flex flex-col w-full h-full p-4 gap-4">
        <div className="flex flex-col h-full overflow-y-scroll bg-base-100 border border-base-300 rounded-lg p-4">
          {!connected && (
            <div className="mx-auto">Websocket not connected...</div>
          )}
          {chatKey ? (
            <div className="flex flex-col gap-4">
              <ChatRenderer
                data={messages}
                chatKey={chatKey}
                currentUser={user}
              />
            </div>
          ) : (
            <div className="mx-auto">Loading...</div>
          )}

          <MessagesEnd />
        </div>

        <form className="flex flex-col gap-2 mt-auto" onSubmit={handleSubmit}>
          <input
            name="message_content"
            autoComplete="off"
            type="text"
            placeholder="Type a message"
            className="input input-bordered w-full"
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}
