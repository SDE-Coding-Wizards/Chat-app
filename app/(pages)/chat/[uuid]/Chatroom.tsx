"use client";

import ChatViewer from "./ChatViewer";
import ChatInput from "./ChatInput";

export default function ChatRoom({
  chatKey,
  messages,
  user,
  chatroom_uuid,
  sendMessage,
  initialMessages,
  initialChatrooms,
  encryptedChatKey,
}: any) {
  return (
    <>
      <ChatViewer chatKey={chatKey} messages={messages} user={user} />
      <ChatInput
        chatroom_uuid={chatroom_uuid}
        user={user}
        sendMessage={sendMessage}
        initialMessages={initialMessages}
        initialChatrooms={initialChatrooms}
        encryptedChatKey={encryptedChatKey}
      />
    </>
  );
}
