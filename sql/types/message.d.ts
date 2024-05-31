interface message {
  uuid: UUID;
  chatroom_uuid: chatroom["uuid"];
  content_uuid: content["uuid"];
  author_uuid: user["uuid"];
  date_sent: Date;
  date_edited?: Date;
  iv?: string;

  chatroom: chatroom;
  content: content;
  user: user;
}
