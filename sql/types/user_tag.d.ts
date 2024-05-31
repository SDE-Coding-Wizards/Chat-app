interface user_tag {
  uuid: UUID;
  user_uuid: user["uuid"];
  tag_id: tag["uuid"];

  user: user;
  tag: tag;
}
