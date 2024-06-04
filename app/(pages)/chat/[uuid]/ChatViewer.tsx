import { MessagesEnd } from "@/components";
import { ChatRenderer } from "@/components/chatroom/chatRenderer";

export default function ChatViewer({ messages, chatKey, user }: any) {
  return (
    <div className="flex flex-col h-full overflow-y-scroll bg-base-100 border border-base-300 rounded-lg p-4">
      {/* {!connected && (
        <div className="flex w-full justify-center">
          <p className="fixed">Websocket not connected...</p>
        </div>
      )} */}
      {chatKey ? (
        <div className="flex flex-col gap-4">
          <ChatRenderer
            data={messages as TextMessage[]}
            chatKey={chatKey}
            currentUser={user}
          />
        </div>
      ) : (
        <div className="mx-auto">Loading...</div>
      )}

      <MessagesEnd />
    </div>
  );
}
