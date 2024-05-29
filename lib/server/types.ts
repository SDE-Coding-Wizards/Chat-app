export interface chatroom_settings {
  chatroom_uuid: chatrooms["uuid"];
}

export interface messages {
  uuid: string;
  chatroom_uuid: chatrooms["uuid"];
  content_uuid: contents["uuid"];
  author_uuid: users["uuid"];
  date_sent: Date;
  date_edited?: Date;
  iv?: string;
}

export interface chatrooms {
  uuid: string;
  is_group: boolean;
  name?: string;
  image_path?: string;
}

export interface content_types {
  id: number;
  name: string;
}

export interface chatroom_members {
  uuid: string;
  user_uuid: users["uuid"];
  chatroom_uuid: chatrooms["uuid"];
  nickname?: string;
  chat_key: string;
  created_at: Date;
}

export interface tags {
  id: number;
  name: string;
}

export interface users {
  uuid: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  status_id: statuses["id"];
  bio?: string;
  image_path?: string;
  created_at: Date;
  public_key?: string;
  private_key?: string;
}

export interface user_settings {
  uuid: users["uuid"];
}

export interface friendships {
  uuid: string;
  user_uuid_1: users["uuid"];
  user_uuid_2: users["uuid"];
  created_at: Date;
}

export interface sessions {
  uuid: string;
  user_uuid: string;
  symm_key?: string;
  public_key?: string;
}

export interface statuses {
  id: number;
  name: string;
}

export interface contents {
  uuid: string;
  content_type_id: content_types["id"];
  content: string;
}

export interface user_tags {
  uuid: string;
  user_uuid: users["uuid"];
  tag_id: tags["id"];
}

