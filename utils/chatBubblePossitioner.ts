import { Message, User } from "@/types";

export function isCurrentUser(user: User, message: Message) {
  if (user.uuid === message.author_uuid) {
    return true;
  } else {
    return false;
  }
}
