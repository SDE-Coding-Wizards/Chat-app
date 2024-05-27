import { User, ChatroomMember } from "./";

export interface Chatroom {
  uuid: string;
  name: string;
  is_chat: boolean;
  image_path: string;
  
  members?: ChatroomMember[];
  users?: User[];
}
