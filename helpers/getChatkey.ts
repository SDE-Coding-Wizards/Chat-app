import { decryptKey } from "@/utils/key";

export function getChatkey(
  chatroomKey: chatroom_member["chat_key"],
  user?: user
): string {
  // let privateKey: string | null = localStorage.getItem("privateKey");
  let privateKey = user?.private_key; //! DONT DO THIS NORMALLY

  if (!privateKey) throw new Error("Private key not found.");

  const decryptedChatKey = decryptKey(chatroomKey, privateKey);

  return decryptedChatKey;
}
