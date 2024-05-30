import { Message } from "@/types";
import { decryptMessage } from "@/utils/symmetric";

export function TextComponent({ message }: { message: Message }) {
  return (
    <div
      className={(message.isCurrentUser ? "chat-end" : "chat-start") + " chat"}
    >
      <p
        className={
          (message.isCurrentUser ? "chat-bubble-info" : "chat-bubble-primary") +
          " chat-bubble"
        }
      >
        {decryptMessage(message.content!.content, message.chatKey!, message.iv)}
      </p>
    </div>
  );
}
