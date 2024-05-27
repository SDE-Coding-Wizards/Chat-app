import { useEffect, useState } from "react";
import { decryptKey } from "@/utils/key";
import { ChatroomMember } from "@/types/chatroom_member";

export function useChatKey(chatroomKey: ChatroomMember["chat_key"]): string {
  const [chatKey, setChatKey] = useState<string>("");

  async function getChatKey() {
    let privateKey: string | null = localStorage.getItem("privateKey");

    if (!privateKey) throw new Error("Private key not found.");

    const decryptedChatKey = decryptKey(chatroomKey, privateKey);

    setChatKey(decryptedChatKey);
  }

  useEffect(() => {
    getChatKey();
  }, []);

  return chatKey;
}
