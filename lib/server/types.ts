type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface chatroom_members {
  uuid: UUID;
  user_uuid: users["uuid"];
  users?: users;
  chatroom_uuid: chatrooms["uuid"];
  chatrooms?: chatrooms;
  nickname?: string;
  chat_key: string;
}

export interface users {
  chatroom_members?: chatroom_members[];
  messages?: messages[];
  user_settings?: user_settings[];
  user_tags?: user_tags[];
  uuid: UUID;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  status_id: statuses["id"];
  statuses?: statuses;
  bio?: string;
  image_path?: string;
  created_at: Date;
  public_key: string;
  private_key: string;
}

export interface chatrooms {
  chatroom_members?: chatroom_members[];
  chatroom_settings?: chatroom_settings[];
  uuid: UUID;
  is_group: boolean;
  name?: string;
  image_path?: string;
  messages?: messages[];
}

export interface chatroom_settings {
  chatroom_uuid: chatrooms["uuid"];
  chatrooms?: chatrooms;
}

export interface content_types {
  id: number;
  name: string;
  contents?: contents[];
}

export interface contents {
  uuid: UUID;
  content_type_id: content_types["id"];
  content_types?: content_types;
  content: string;
  messages?: messages[];
}

export interface messages {
  uuid: UUID;
  chatroom_uuid: chatrooms["uuid"];
  chatrooms?: chatrooms;
  content_uuid: contents["uuid"];
  contents?: contents;
  author_uuid: users["uuid"];
  users?: users;
  date_sent: Date;
  date_edited?: Date;
  iv?: string;
}

export interface statuses {
  id: number;
  name: string;
  users?: users[];
}

export interface tags {
  id: number;
  name: string;
  user_tags?: user_tags[];
}

export interface user_settings {
  uuid: users["uuid"];
  users?: users;
}

export interface user_tags {
  uuid: UUID;
  user_uuid: users["uuid"];
  users?: users;
  tag_id: tags["id"];
  tags?: tags;
}

