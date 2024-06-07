type Tables =
  | "chatroom_members"
  | "chatroom_settings"
  | "chatrooms"
  | "content_types"
  | "contents"
  | "friend_requests"
  | "friendships"
  | "messages"
  | "statuses"
  | "tags"
  | "user_settings"
  | "user_tags"
  | "users";

type Singular<T extends string> = T extends "statuses"
  ? "status"
  : T extends `${infer U}s`
  ? U
  : T;

type SingularTables = {
  [K in Tables]: Singular<K>;
}[Tables];
