"use client";

import { useState } from "react";
import { decryptMessage, encryptMessage } from "@/utils/symmetric";
import { useChatKey } from "@/hooks/useChatKey";
import { Message, Chatroom, User } from "@/types";
import { Chatlist, MessagesEnd } from "@/components";
import { v4 as uuidv4 } from "uuid";
import { useWebsocket } from "@/hooks/useWebsocket";

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

interface MessageWithLoading extends Message {
  isLoading?: boolean;
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
  const socket = useWebsocket("/chat", {
    events: { "receive-message": updateList },
    room: chatroom_uuid,
  });

  const chatKey = useChatKey(encryptedChatKey, user);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const content = formData.get("message_content") as string;

    e.preventDefault();
    e.currentTarget.reset();

    if (!content.trim()) return;

    const uuid = uuidv4();

    setMessages([
      ...messages,
      {
        uuid,
        content: { content },
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
      <Chatlist
        chatrooms={chatrooms}
        user={user}
        updateChatrooms={setChatrooms}
      />
      <section className="flex flex-col w-full h-full p-4 gap-4">
        <div className="flex flex-col h-full overflow-y-scroll bg-base-100 border border-base-300 rounded-lg p-4">
          {chatKey ? (
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.uuid}
                  className={`py-2 px-3 w-fit bg-base-300 rounded ${
                    msg?.isLoading ? "opacity-70" : ""
                  }`}
                >
                  {msg?.isLoading
                    ? msg.content!.content
                    : decryptMessage(msg.content!.content, chatKey, msg.iv!)}
                </div>
              ))}
            </div>
          ) : (
            <div>Loading...</div>
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
