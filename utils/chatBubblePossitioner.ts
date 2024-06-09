export function isCurrentUser(user: user, message: message) {
  return user.uuid === message.author_uuid;
}
