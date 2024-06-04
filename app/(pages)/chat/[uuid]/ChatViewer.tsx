import { MessagesEnd } from "@/components";
import { ChatRenderer } from "@/components/chatroom/chatRenderer";

export default function ChatViewer({ messages, chatKey, user }: any) {
  if (!chatKey) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full overflow-y-scroll bg-base-100 border border-base-300 rounded-lg p-4">
      <div className="flex flex-col gap-4">
        <ChatRenderer
          data={messages as TextMessage[]}
          chatKey={chatKey}
          currentUser={user}
        />
      </div>

      <MessagesEnd />
    </div>
  );
}
