"use client";

import { MessagesEnd } from "@/components";
import { ChatRenderer } from "@/components/chatroom/chatRenderer";
import { getChatkey } from "@/helpers";
import { useWebsocket } from "@/hooks";
import { useState } from "react";

interface ChatViewerProps {
  chatroom_uuid: chatroom["uuid"];
  initialMessages: MessageWithLoading[];
  chatKey: string;
  user: user;
}

export default function ChatViewer({
  chatroom_uuid,
  initialMessages,
  chatKey,
  user,
}: ChatViewerProps) {
  const decryptedChatKey = getChatkey(chatKey, user);

  const [messages, setMessages] =
    useState<MessageWithLoading[]>(initialMessages);

  useWebsocket("/chat", {
    events: { "receive-message": updateList },
    room: chatroom_uuid,
  });

  function updateList(newMessage: message) {
    setMessages((prev) => {
      let newList = [...prev];

      newList = newList.filter(({ uuid }) => uuid != newMessage.uuid);
      newList.push(newMessage);

      return newList;
    });
  }

  if (!chatKey) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full overflow-y-scroll bg-base-100 border border-base-300 rounded-lg p-4">
      <div className="flex flex-col gap-4">
        <ChatRenderer
          data={messages as TextMessage[]}
          chatKey={decryptedChatKey}
          currentUser={user}
        />
      </div>

      <MessagesEnd />
    </div>
  );
}
