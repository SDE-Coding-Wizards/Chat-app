declare namespace chatroom {
  export interface referencing {}

  export interface referenced {
    chatroom_members: chatroom_member[];
    chatroom_settings: chatroom_setting[];
    messages: message[];
  }
}

interface chatroom extends chatroom.referencing, chatroom.referenced {
  uuid: UUID;
  is_group: boolean;
  name?: string;
  image_path?: string;
  created_at: Date;
}
