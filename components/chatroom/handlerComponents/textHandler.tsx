import { decryptMessage } from "@/utils/symmetric";

export function TextComponent({
  message,
}: {
  message: TextMessage & MessageWithLoading;
}) {
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
        {message.isLoading
          ? message.content.content
          : decryptMessage(
              message.content!.content,
              message.chatKey!,
              message.iv
            )}
      </p>
    </div>
  );
}
