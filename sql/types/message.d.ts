declare namespace message {
  export interface referencing {
    chatroom: chatroom;
    content: content;
    user: user;
  }

  export interface referenced {}
}

interface message extends message.referencing, message.referenced {
  uuid: UUID;
  chatroom_uuid: chatroom["uuid"];
  content_uuid: content["uuid"];
  author_uuid: user["uuid"];
  date_sent: Date;
  date_edited?: Date;
  iv: string;
}
