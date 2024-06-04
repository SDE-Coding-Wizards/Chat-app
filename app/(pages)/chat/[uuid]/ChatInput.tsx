"use client";

import { useState } from "react";
import { encryptMessage } from "@/utils/symmetric";
import { getChatkey } from "@/helpers/getChatkey";
import { v4 as uuidv4 } from "uuid";
import { useWebsocket } from "@/hooks";
import { ContentType } from "@/types/content";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface ClientProps {
  chatroom_uuid: chatroom["uuid"];
  user: user;
  sendMessage: (
    uuid: string,
    message: message,
    chatroom_uuid: chatroom["uuid"],
    author_uuid: user["uuid"]
  ) => Promise<message>;
  initialMessages: message[];
  initialChatrooms: chatroom[];
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
  const chatKey = getChatkey(encryptedChatKey, user);

  const [user2, setUser2] = useState<user | null>(null);
  onAuthStateChanged(auth, setUser2 as any);

  const [messages, setMessages] =
    useState<MessageWithLoading[]>(initialMessages);
  const [chatrooms, setChatrooms] = useState<chatroom[]>(initialChatrooms);
  const [chatSocket, connected] = useWebsocket("/chat", {
    events: { "receive-message": updateList },
    room: chatroom_uuid,
  });

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
        author_uuid: user.uuid,
        content: { content, content_type_id: contentTypeId },
        isLoading: true,
      } as MessageWithLoading,
    ]);

    const encryptedMessage = encryptMessage(content, chatKey) as message;

    const newMessage = await sendMessage(
      uuid,
      encryptedMessage,
      chatroom_uuid,
      user.uuid
    );

    chatSocket.emit("send-message", newMessage);
  }

  function updateList(newMessage: message) {
    setMessages((prev) => {
      let newList = [...prev];

      newList = newList.filter(({ uuid }) => uuid != newMessage.uuid);
      newList.push(newMessage);

      return newList;
    });
  }

  return (
    <form className="flex flex-col gap-2 mt-auto" onSubmit={handleSubmit}>
      <input
        name="message_content"
        autoComplete="off"
        type="text"
        placeholder="Type a message"
        className="input input-bordered w-full"
      />
      <button type="submit" disabled={!connected}>
        Send
      </button>
    </form>
  );
}
