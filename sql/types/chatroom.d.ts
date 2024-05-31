interface chatroom {
  uuid: UUID;
  is_group: boolean;
  name?: string;
  image_path?: string;
  created_at?: Date;

  chatroom_members: chatroom_member[];
  chatroom_settings: chatroom_setting[];
  messages: message[];
}
