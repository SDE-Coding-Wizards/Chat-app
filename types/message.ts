import { Chatroom, Content, User } from "./";

export interface Message {
  uuid: string;
  chatroom_uuid: string;
  content_uuid: string;
  author_uuid: string;
  date_sent: string;
  date_edited: string;
  iv: string;

  chatroom?: Chatroom;
  content?: Content;
  author?: User;

  chatKey?: string;
  isCurrentUser?: boolean;
}

export interface MessageWithLoading extends Message {
  isLoading?: boolean;
}
