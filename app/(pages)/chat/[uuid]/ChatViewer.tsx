import { MessagesEnd } from "@/components";
import { ChatRenderer } from "@/components/chatroom/chatRenderer";
import { getChatkey } from "@/helpers";

export default function ChatViewer({ messages, chatKey, user }: any) {
  if (!chatKey) return <div>Loading...</div>;

  const decryptedChatKey = getChatkey(chatKey, user);

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
