import { Chatroom } from "./chatroom";
import { User } from "./user";

export interface ChatroomMember {
  uuid: string;
  user_uuid: string;
  chatroom_uuid: string;
  nickname: string;
  chat_key: string;

  user?: User;
  chatroom?: Chatroom;
}
