import { Chatroom, User } from "@/types";
import axios from "axios";
import { encryptKey, generateKey } from "./key";

export async function createChat(
  creator: User,
  members: User[] = [],
  name?: string
): Promise<Chatroom> {
  const { data }: { data: Chatroom } = await axios.post("/api/chatrooms", {
    name,
  });

  const newChat_key = generateKey();

  let newChatroom: Chatroom;

  newChatroom = await addMember(creator.uuid, data.uuid, newChat_key);

  for (let member of members) {
    newChatroom = await addMember(member.uuid, data.uuid, newChat_key);
  }

  return newChatroom;
}

export async function addMember(
  new_member_uuid: string,
  chatroom_uuid: string,
  chat_key: string
): Promise<Chatroom> {
  const { data: user } = await axios.get(`/api/users/${new_member_uuid}`);

  const new_chat_key = encryptKey(chat_key, user.public_key);

  const { data: updatedChatroom } = await axios.post(
    "/api/chatrooms/add-member",
    {
      chatroom_uuid,
      new_member_uuid,
      new_chat_key,
    }
  );

  return updatedChatroom;
}
