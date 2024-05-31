interface chatroom_member {
  uuid: UUID;
  user_uuid: user["uuid"];
  chatroom_uuid: chatroom["uuid"];
  nickname?: string;
  chat_key: string;
  created_at: Date;

  user: user;
  chatroom: chatroom;
}
