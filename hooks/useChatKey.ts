import { useEffect, useState } from "react";
import { decryptKey } from "@/utils/key";
import { ChatroomMember, User } from "@/types";

export function useChatKey(
  chatroomKey: ChatroomMember["chat_key"],
  user?: User
): string {
  const [chatKey, setChatKey] = useState<string>("");

  async function getChatKey() {
    // let privateKey: string | null = localStorage.getItem("privateKey");
    let privateKey = user?.private_key; //! DONT DO THIS NORMALLY

    if (!privateKey) throw new Error("Private key not found.");

    const decryptedChatKey = decryptKey(chatroomKey, privateKey);

    setChatKey(decryptedChatKey);
  }

  useEffect(() => {
    getChatKey();
  }, []);

  return chatKey;
}
