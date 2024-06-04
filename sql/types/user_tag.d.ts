declare namespace user_tag {
  export interface referencing {
    user: user;
    tag: tag;
  }

  export interface referenced {}
}

interface user_tag extends user_tag.referencing, user_tag.referenced {
  uuid: UUID;
  user_uuid: user["uuid"];
  tag_id: tag["uuid"];
}
