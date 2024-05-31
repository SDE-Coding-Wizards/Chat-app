type UUID = `${string}-${string}-${string}-${string}-${string}`;

export interface chatroom_members {
  uuid: UUID;
  user_uuid: string;
  chatroom_uuid: string;
  nickname?: string;
  chat_key: string;
  created_at: Date;

  user: users;
  chatroom: chatrooms;
}

export interface chatroom_settings {
  chatroom_uuid: string;

  chatroom: chatrooms;
}

export interface chatrooms {
  uuid: UUID;
  is_group: boolean;
  name?: string;
  image_path?: string;
  created_at?: Date;

  chatroom_members: chatroom_members[];
  chatroom_settings: chatroom_settings[];
  messages: messages[];
}

export interface content_types {
  id: number;
  name: string;

  contents: contents[];
}

export interface contents {
  uuid: UUID;
  content_type_id: number;
  content: string;

  content_type: content_types;

  messages: messages[];
}

export interface friendships {
  uuid: UUID;
  user_uuid_1: string;
  user_uuid_2: string;
  created_at: Date;

  user: users;
}

export interface messages {
  uuid: UUID;
  chatroom_uuid: string;
  content_uuid: string;
  author_uuid: string;
  date_sent: Date;
  date_edited?: Date;
  iv?: string;

  chatroom: chatrooms;
  content: contents;
  user: users;
}

export interface sessions {
  uuid: UUID;
  user_uuid: string;
  symm_key?: string;
  public_key?: string;
}

export interface statuses {
  id: number;
  name: string;

  users: users[];
}

export interface tags {
  id: number;
  name: string;

  user_tags: user_tags[];
}

export interface user_settings {
  uuid: UUID;

  user: users;
}

export interface user_tags {
  uuid: UUID;
  user_uuid: string;
  tag_id: number;

  user: users;
  tag: tags;
}

export interface users {
  uuid: UUID;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  status_id: number;
  bio?: string;
  image_path?: string;
  created_at: Date;
  public_key: string;
  private_key: string;

  status: statuses;

  chatroom_members: chatroom_members[];
  friendships: friendships[];
  messages: messages[];
  user_settings: user_settings[];
  user_tags: user_tags[];
}

