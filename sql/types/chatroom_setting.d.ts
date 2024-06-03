declare namespace chatroom_setting {
  export interface referencing {
    chatroom: chatroom;
  }

  export interface referenced {}
}

interface chatroom_setting extends chatroom_setting.referencing, chatroom_setting.referenced {
  chatroom_uuid: chatroom["uuid"];
}
