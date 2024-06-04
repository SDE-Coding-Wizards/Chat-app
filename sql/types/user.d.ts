declare namespace user {
  export interface referencing {
    status: status;
  }

  export interface referenced {
    chatroom_members: chatroom_member[];
    friendships: friendship[];
    messages: message[];
    user_settings: user_setting[];
    user_tags: user_tag[];
  }
}

interface user extends user.referencing, user.referenced {
  uuid: UUID;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  status_id: status["uuid"];
  bio?: string;
  image_path?: string;
  created_at: Date;
  public_key: string;
  private_key: string;
}
