import { Message, User } from "@/types";

export function isCurrentUser(user: User, message: Message) {
  console.log("🚀 ~ getPosition ~ message:", message);
  console.log("🚀 ~ getPosition ~ user:", user);
  if (user.uuid === message.author_uuid) {
    return true;
  } else {
    return false;
  }
}
