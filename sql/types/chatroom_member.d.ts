declare namespace chatroom_member {
  export interface referencing {
    user: user;
    chatroom: chatroom;
  }

  export interface referenced {}
}

interface chatroom_member extends chatroom_member.referencing, chatroom_member.referenced {
  uuid: UUID;
  user_uuid: user["uuid"];
  chatroom_uuid: chatroom["uuid"];
  nickname?: string;
  chat_key: string;
  created_at: Date;
}
